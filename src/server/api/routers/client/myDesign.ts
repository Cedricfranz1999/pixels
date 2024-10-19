import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const client_myDesignRouter = createTRPCRouter({
  getAllDeisgn: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;
    return ctx.db.design.findMany({
      where: {
        userId,
      },
    });
  }),

  AddDesign: publicProcedure
    .input(
      z.object({
        image: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;
      return await ctx.db.design.create({
        data: {
          ...input,
          userId,
        },
      });
    }),

    deleteDesign: publicProcedure
    .input(
      z.object({
        id: z.number()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.design.delete({
        where: {
            id: input.id
        }
      });
    }),
});
