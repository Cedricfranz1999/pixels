import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import dayjs from "dayjs";
import { z } from "zod";
import { startOfDay } from "date-fns";

export const dashboardRouter = createTRPCRouter({
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.count({
      where: {
        userType: "CUSTOMER",
      },
    });
  }),

  getAllProducts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.count();
  }),

  getTodaysOrders: publicProcedure.query(async ({ ctx }) => {
    const startOfDay = dayjs().startOf("day").toDate();
    const endOfDay = dayjs().endOf("day").toDate();
    return await ctx.db.order.count({
      where: {
        status: "ORDERED",
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
  }),

  getMonthlyIncome: publicProcedure.query(async ({ ctx }) => {
    const startOfMonth = dayjs().startOf("month").toDate();
    const endOfMonth = dayjs().endOf("month").toDate();

    const totalIncome = await ctx.db.checkout.aggregate({
      _sum: {
        totalPrice: true,
      },
      where: {
        status: "DONE",
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    return totalIncome._sum.totalPrice || 0;
  }),

  reportTable: publicProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const order = await ctx.db.checkout.findMany({
        where: {
          status: "DONE",
          createdAt: {
            gte: dayjs(input.startDate).startOf("day").toDate(),
            lte: dayjs(input.endDate).startOf("day").toDate(),
          },
        },
        include: {
          user: true,
          order: {
            include: { product: true },
          },
        },
      });

      const totalOrders = await ctx.db.checkout.count({
        where: {
          status: "DONE",
          createdAt: {
            gte: dayjs(input.startDate).startOf("day").toDate(),
            lte: dayjs(input.endDate).startOf("day").toDate(),
          },
        },
      });

      const data = order.map((data) => {
        const totalAmount = data.order
          .map((order) => order.product.price * order.quantity)
          .reduce((acc, curr) => acc + curr, 0);

        return {
          id: data.id,
          name: data.order.map((order) => order.product.name),
          price: data.order.map((price) => price.product.price),
          quantity: data.order.map((order) => order.quantity),
          totalAmount,
          customer: `${data.user.firstname} ${data.user.lastname}`,
          totalOrders,
          orderDate: dayjs(data.createdAt),
        };
      });
      return data;
    }),
});
