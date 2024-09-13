import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import dayjs from "dayjs";

export const cartsRouter = createTRPCRouter({
  getAllOrderedItems: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search } = input;
      const startOfDay = dayjs().startOf("day").toDate();
      const endOfDay = dayjs().endOf("day").toDate();
      const carts = await ctx.db.order.findMany({
        where: {
          status: "ORDERED",
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
          OR: [
            {
              product: {
                name: {
                  contains: search,
                  mode: "insensitive",
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
        include: {
          product: true,
          user: true,
        },
      });

      const data = carts.map((data) => {
        const totalAmount = data.quantity * data.product.price;
        return {
          id: data.id,
          name: data.product.name,
          price: data.product.price,
          quantity: data.quantity,
          totalAmount,
          status: data.status,
          customer: `${data.user.firstname} ${data.user.lastname}`,
        };
      });
      return data;
    }),
});
