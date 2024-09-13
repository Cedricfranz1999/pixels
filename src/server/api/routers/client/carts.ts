import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const client_CartsRouter = createTRPCRouter({
  getAllCartedItems: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;
    return ctx.db.order.findMany({
      where: {
        userId,
        status: "CARTED",
      },
      include: {
        product: true,
      },
    });
  }),

  addToCart: publicProcedure
    .input(
      z.object({
        productId: z.number(),
        quantity: z.number(),
        totalPrice: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;
      return await ctx.db.order.create({
        data: {
          ...input,
          userId,
        },
      });
    }),

  deleteCartedItems: publicProcedure
    .input(
      z.object({
        orderIds: z.array(z.number()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await Promise.all(
        input.orderIds.map(async (id) => {
          await ctx.db.order.delete({
            where: { id },
          });
        }),
      );
    }),
});
