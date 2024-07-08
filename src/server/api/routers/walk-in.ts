import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const walk_inRouter = createTRPCRouter({
  getAllWalk_Ins: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search } = input;
      const where: any = {};

      if (search) {
        where.customer = {
          contains: search,
          mode: "insensitive",
        };
      }

      return await ctx.db.walkIn.findMany({
        where,
      });
    }),

  createWalk_In: publicProcedure
    .input(
      z.object({
        customer: z.string(),
        description: z.string(),
        quantity: z.number(),
        price: z.number(),
        image: z.string().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.walkIn.create({
        data: {
          ...input,
        },
      });
    }),

  editWalk_In: publicProcedure
    .input(
      z.object({
        id: z.number(),
        customer: z.string(),
        description: z.string(),
        quantity: z.number(),
        price: z.number(),
        image: z.string().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.walkIn.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
    }),
});
