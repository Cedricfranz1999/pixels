import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const Status = z.enum(["PENDING", "APPROVED", "DELIVERY", "DONE"]);

export const ordersRouter = createTRPCRouter({
  getAllOrders: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        status: z.any(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search, status } = input;
      const order = await ctx.db.checkout.findMany({
        where: {
          status: {
            not: "DONE",
          },
          AND: [
            {
              status: status ? status : undefined,
              OR: [
                {
                  order: {
                    some: {
                      product: {
                        name: {
                          contains: search,
                          mode: "insensitive",
                        },
                      },
                    },
                  },
                },
                {
                  user: {
                    OR: [
                      {
                        firstname: {
                          contains: search,
                          mode: "insensitive",
                        },
                      },
                      {
                        lastname: {
                          contains: search,
                          mode: "insensitive",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
        include: {
          user: true,
          order: {
            include: { product: true },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const data = order.map((data) => {
        const totalAmount = data.order
          .map((order) => order.product.price * order.quantity)
          .reduce((acc, curr) => acc + curr, 0);

        return {
          id: data.id,
          name: data.order.map((order) => order.product.name),
          price: data.order.map((price) => price.product.price),
          quantity: data.order.map((order) => order.quantity),
          totalAmount,
          proofOfPayment: data.proofOfPayment,
          deliveryDate: data.deliveryDate,
          status: data.status,
          customer: `${data.user.firstname} ${data.user.lastname}`,
          email: `${data.user.email}`,
        };
      });
      return data;
    }),

  getAllArchives: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search } = input;
      const order = await ctx.db.checkout.findMany({
        where: {
          status: {
            equals: "DONE",
          },
          AND: [
            {
              OR: [
                {
                  order: {
                    some: {
                      product: {
                        name: {
                          contains: search,
                          mode: "insensitive",
                        },
                      },
                    },
                  },
                },
                {
                  user: {
                    OR: [
                      {
                        firstname: {
                          contains: search,
                          mode: "insensitive",
                        },
                      },
                      {
                        lastname: {
                          contains: search,
                          mode: "insensitive",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
        include: {
          user: true,
          order: {
            include: { product: true },
          },
        },
      });

      const data = order.map((data) => {
        const totalAmount = data.order
          .map((order) => order.product.price * order.quantity)
          .reduce((acc, curr) => acc + curr, 0);

        return {
          id: data.id,
          name: data.order.map((order) => order.product.name),
          price: data.order.map((price) => price.product.price),
          quantity: data.order.map((order) => order.quantity),
          totalAmount,
          proofOfPayment: data.proofOfPayment,
          deliveryDate: data.deliveryDate,
          status: data.status,
          customer: `${data.user.firstname} ${data.user.lastname}`,
        };
      });
      return data;
    }),

  changeStatus: publicProcedure
    .input(
      z.object({
        id: z.number(),
        status: Status,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.checkout.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
        },
      });
    }),
});
