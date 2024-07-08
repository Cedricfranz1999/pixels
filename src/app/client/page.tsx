import { SignedIn, UserButton } from "@clerk/nextjs";
import HeaderClient from "./headerCient";
import Product from "./product";

const Client = () => {
  return (
    <div>
      <HeaderClient />
      <Product />
    </div>
  );
};

export default Client;
