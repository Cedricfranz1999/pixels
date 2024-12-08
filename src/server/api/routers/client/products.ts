import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const client_ProductRouter = createTRPCRouter({
  getAllProducts: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        category: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search } = input;
      const where: any = {};

      if (input.category) {
        where.categoryId = input.category;
      }

      if (search) {
        where.AND = [
          {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          },
        ];
      }
      return await ctx.db.product.findMany({
        where,
        include: {
          category: true,
          orders: {
            where: {
              status: "ORDERED",
            },
            select: {
              quantity: true,
            },
          },
        },
      });
    }),

  getAllOrderedProduct: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        status: z.any(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search, status } = input;
      const userId = ctx.auth.userId;
      const order = await ctx.db.checkout.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId,
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
              ],
            },
          ],
        },
        include: {
          order: {
            include: {
              product: true,
            },
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
          productImage: data.order.map((order) => order.product.image),
          productId: data.order.map((order) => order.product.id),
        };
      });

      return data;
    }),

  getArchiveOrder: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        status: z.any(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search, status } = input;
      const userId = ctx.auth.userId;
      const order = await ctx.db.checkout.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId,
          AND: [
            {
              status: "DONE",
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
              ],
            },
          ],
        },
        include: {
          order: {
            include: {
              product: true,
            },
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
          productImage: data.order.map((order) => order.product.image),
          productId: data.order.map((order) => order.product.id),
        };
      });

      return data;
    }),
});
