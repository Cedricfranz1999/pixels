
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    getCurrentUser: publicProcedure
        .input(
            z.object({
                userId: z.string().optional()
            }),
        ) 
        .query(async({ctx, input}) => {
            const {userId} = input
            return await ctx.db.user.findUnique({
                where: {
                    id: userId
                }
            })
        })
});
