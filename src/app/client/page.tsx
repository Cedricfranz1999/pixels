"use client";
import HeaderClient from "../_components/layout/header-client";
import Product from "../_components/client/product/product";
import { api } from "~/trpc/react";

const Client = () => {
  const { data: checkoutItems, refetch: refetchCheckout } =
    api.client_checkouts.getAllCheckoutItems.useQuery();
  const { data: cartedItems, refetch: refetchCart } =
    api.client_carts.getAllCartedItems.useQuery();
  return (
    <div>
      <HeaderClient
        cartItemsLength={cartedItems?.length}
        orderedItemsLength={checkoutItems?.length}
      />
      <Product
        refetchCartItems={refetchCart}
        refetchOrderedItems={refetchCheckout}
      />
    </div>
  );
};

export default Client;
