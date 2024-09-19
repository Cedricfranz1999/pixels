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
});
