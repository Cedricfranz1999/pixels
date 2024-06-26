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

const Category = z.enum([
  "JERSEY",
  "V_NECK",
  "POLO",
  "TANK_TOP",
  "ROUND_NECK",
  "CREW_NECK",
  "LONG_SLEEVE",
  "RAGLAN",
  "HENLEY",
  "SLIM_FIT",
  "OVERSIZED",
  "BASKETBALL_SHORTS",
  "RUNNING_SHORTS",
  "CARGO_SHORTS",
  "DENIM_SHORTS",
  "BOARD_SHORTS",
  "GYM_SHORTS",
  "CHINO_SHORTS",
  "SWEAT_SHORTS",
  "SWIM_TRUNKS",
  "SKATE_SHORTS",
]);

export const productRouter = createTRPCRouter({
  getAllProducts: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        category: z.string().optional(),
        size: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search, category, size } = input;
      const where: any = {};

      if (category) {
        where.category = category;
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
      });
    }),

  createProduct: publicProcedure
    .input(
      z.object({
        name: z.string(),
        image: z.string().nullable(),
        size: Size,
        brand: z.string().nullable(),
        color: z.string().nullable(),
        stocks: z.string(),
        price: z.number(),
        category: Category,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.product.create({
        data: {
          ...input,
        },
      });
    }),

  updateProduct: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        image: z.string().nullable(),
        size: Size,
        brand: z.string().nullable(),
        color: z.string().nullable(),
        stocks: z.string(),
        price: z.number(),
        category: Category,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.product.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
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
