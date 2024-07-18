import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { productRouter } from "./routers/product";
import { offersRouter } from "./routers/offers";
import { ordersRouter } from "./routers/orders";
import { walk_inRouter } from "./routers/walk-in";
import { client_ProductRouter } from "./routers/client/products";
import { client_CartsRouter } from "./routers/client/carts";
import { client_CheckoutRouter } from "./routers/client/checkouts";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  product: productRouter,
  offers: offersRouter,
  orders: ordersRouter,
  walk_in: walk_inRouter,
  client_products: client_ProductRouter,
  client_carts: client_CartsRouter,
  client_checkouts: client_CheckoutRouter,
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
