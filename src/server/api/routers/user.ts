
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    getCurrentUser: publicProcedure
        .query(async({ctx}) => {
            const userId = ctx.auth.userId

            return await ctx.db.user.findUnique({
                where: {
                    id: userId
                }
            })
        })
});
