import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { productRouter } from "./routers/product";
import { offersRouter } from "./routers/offers";
import { ordersRouter } from "./routers/orders";
import { walk_inRouter } from "./routers/walk-in";
import { client_ProductRouter } from "./routers/client/products";
import { client_CartsRouter } from "./routers/client/carts";
import { client_CheckoutRouter } from "./routers/client/checkouts";
import { client_myDesignRouter } from "./routers/client/myDesign";
import { dashboardRouter } from "./routers/dashboard";
import { cartsRouter } from "./routers/cart";
import { messengerRoute } from "./routers/messenger";
import { userRouter } from "./routers/user";
import { categoryRouter } from "./routers/category";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    user: userRouter,
    dashboard: dashboardRouter,
    post: postRouter,
    product: productRouter,
    category: categoryRouter,
    offers: offersRouter,
    carts: cartsRouter,
    orders: ordersRouter,
    walk_in: walk_inRouter,
    client_products: client_ProductRouter,
    client_carts: client_CartsRouter,
    client_checkouts: client_CheckoutRouter,
    client_design: client_myDesignRouter,
    messenger: messengerRoute,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
