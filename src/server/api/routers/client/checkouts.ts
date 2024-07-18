import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const client_CheckoutRouter = createTRPCRouter({
  getAllCheckoutItems: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;
    return ctx.db.checkout.findMany({
      where: {
        userId,
      },
      include: {
        order: {
          include: { product: true },
        },
      },
    });
  }),

  addToCheckout: publicProcedure
    .input(
      z.object({
        orderId: z.array(z.number()),
        totalPrice: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;

      const checkout = await ctx.db.checkout.create({
        data: {
          userId,
          totalPrice: input.totalPrice,
        },
      });

      await Promise.all(
        input.orderId.map(async (id) => {
          await ctx.db.order.update({
            where: { id },
            data: {
              status: "ORDERED",
              checkoutId: checkout.id,
            },
          });
        }),
      );

      return checkout;
    }),

  directOrder: publicProcedure
    .input(
      z.object({
        productId: z.number(),
        quantity: z.number(),
        totalPrice: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;
      const order = await ctx.db.order.create({
        data: {
          ...input,
          userId,
          status: "ORDERED",
        },
      });

      const checkout = await ctx.db.checkout
        .create({
          data: {
            userId,
            totalPrice: input.totalPrice,
          },
        })
        .then(async (data) => {
          await ctx.db.order.update({
            where: {
              id: order.id,
            },
            data: {
              checkoutId: data.id,
            },
          });
        });

      return checkout;
    }),
});
