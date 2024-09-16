
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
    getAllCategories: publicProcedure
        .query(async ({ ctx }) => {
            return await ctx.db.productCategory.findMany({
                select: {
                    id: true,
                    key: true,
                    name: true
                }
            })
        }),
    
    upsertCategory: publicProcedure
        .input(
            z.object({
                id: z.number().optional(),
                name: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const key = input.name.replace(/\s+/g, '_').toUpperCase();
            return await ctx.db.productCategory.upsert({
                where: {
                    id: input.id || 0,
                },
                create: {
                    ...input,
                    key
                },
                update: {
                    ...input,
                    key
                }
            });
        }),

    deleteCategory: publicProcedure
        .input(
          z.object({
            id: z.number(),
          }),
        )
        .mutation(async ({ ctx, input }) => {
          return await ctx.db.productCategory.delete({
            where: {
              id: input.id,
            },
          });
        })
});
