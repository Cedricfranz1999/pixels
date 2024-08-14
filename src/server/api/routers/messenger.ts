import { log } from "console";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const messengerRoute = createTRPCRouter({
  //   getMessage: publicProcedure.query(async ({ ctx }) => {
  //     const userId = ctx.auth.userId;
  //     return ctx.db.message.findMany({
  //       where: {
  //         sender: {
  //           firstname: {
  //             not: "admin",
  //           },
  //           lastname: {
  //             not: "admin",
  //           },
  //         },
  //         recipient: {
  //           firstname: {
  //             not: "admin",
  //           },
  //           lastname: {
  //             not: "admin",
  //           },
  //         },
  //       },
  //       //   select: {
  //       //     sender: {
  //       //       select: {
  //       //         id: true,
  //       //         firstname: true,
  //       //         lastname: true,
  //       //       },
  //       //     },
  //       //     recipient: {
  //       //       select: {
  //       //         id: true,
  //       //         firstname: true,
  //       //         lastname: true,
  //       //       },
  //       //     },
  //       //   },
  //     });
  //   }),
  getUser: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;
    return ctx.db.user.findMany({
      where: {
        firstname: {
          not: "admin",
        },
        lastname: {
          not: "admin",
        },
      },
    });
  }),

  getMessage: publicProcedure
    .input(
      z.object({
        customerId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;
      return ctx.db.user.findFirst({
        where: {
          id: input.customerId,
          firstname: {
            not: "admin",
          },
          lastname: {
            not: "admin",
          },
        },

        include: {
          messagesReceived: {
            include: {
              sender: {
                select: {
                  firstname: true,
                },
              },
              recipient: {
                select: {
                  firstname: true,
                },
              },
            },
          },
          messagesSent: {
            include: {
              sender: {
                select: {
                  firstname: true,
                },
              },
              recipient: {
                select: {
                  firstname: true,
                },
              },
            },
          },
        },
      });
    }),

  sendMessage: publicProcedure
    .input(
      z.object({
        content: z.string(),
        recipientId: z.string(),
        isAdmin: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const findAdmin = await ctx.db.user.findFirst({
        where: {
          firstname: "admin",
          lastname: "admin",
        },
      });

      console.log("find", findAdmin);
      const userId = ctx.auth.userId;
      return await ctx.db.message.create({
        data: {
          content: input.content,
          recipientId: input.recipientId ? input.recipientId : findAdmin?.id,
          senderId: userId,
        },
      });
    }),
});
