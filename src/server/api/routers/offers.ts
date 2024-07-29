import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const offersRouter = createTRPCRouter({
  getAllOffers: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search } = input;
      return await ctx.db.offers.findMany({
        where: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      });
    }),

  createOffer: publicProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        description: z.string().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.offers.create({
        data: {
          ...input,
        },
      });
    }),

  updateOffer: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        description: z.string().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.offers.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
    }),

  deleteOffer: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.offers.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
