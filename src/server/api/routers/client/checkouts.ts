import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const client_CheckoutRouter = createTRPCRouter({
  getAllCheckoutItems: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;
    return ctx.db.checkout.findMany({
      where: {
        userId,
        status: {
            in: ['APPROVED', 'DELIVERY', 'PENDING'],
        },
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
        orderDetails: z.array(
          z.object({
            id: z.number(),
            quantity: z.number(),
          }),
        ),
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
        input.orderDetails.map(async (data) => {
          const { id, quantity } = data;
          await ctx.db.order.update({
            where: { id },
            data: {
              quantity,
              status: "ORDERED",
              checkoutId: checkout.id,
            },
          });
        }),
      );

      return checkout;
    }),

  cancelCheckout: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.checkout.update({
        where: {
            id: input.id
        },
        data: {
            status: 'CANCELED'
        },
      });
    }),

  backToCart: publicProcedure
    .input(
        z.object({
            id: z.number(),
            orderId: z.number()
        }),
    )
    .mutation(async ({ ctx, input }) => {
        await ctx.db.order.update({
            where: {
                id: input.orderId
            },
            data: {
                status: 'CARTED'
            }
        })
        return await ctx.db.checkout.delete({
            where: {
                id: input.id
            },
        });
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
