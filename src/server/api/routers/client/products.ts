import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const client_ProductRouter = createTRPCRouter({
  getAllProducts: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        category: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search, category } = input;
      const where: any = {};

      if (category) {
        where.category = category;
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
});
