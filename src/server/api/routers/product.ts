import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const Size = z.enum([
  "DOUBLE_EXTRA_SMALL",
  "EXTRA_SMALL",
  "SMALL",
  "MEDIUM",
  "LARGE",
  "EXTRALARGE",
  "DOUBLELARGE",
  "TRIPELARGE",
]);

export const productRouter = createTRPCRouter({
  getAllProducts: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        category: z.number().optional(),
        size: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search, category, size } = input;
      const where: any = {};

      if (category) {
        where.categoryId = category;
      }

      if (size) {
        where.size = size;
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
            category: true
        }
      });
    }),

  upsertProduct: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        name: z.string(),
        image: z.string().nullable(),
        size: Size,
        brand: z.string().nullable(),
        color: z.string().nullable(),
        stocks: z.string(),
        price: z.number(),
        categoryId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.product.upsert({
        where: {
            id: input.id || 0
        },
        create: {
            ...input
        },
        update: {
            ...input
        }
      });
    }),

  deleteProduct: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.product.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
