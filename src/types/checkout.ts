export type Checkout = {
  id: number;
  proofOfPayment: string | null;
  deliveryDate: Date;
  status: string;
  order: {
    quantity: number;
    product: {
      id: number;
      name: string;
      image: string | null;
      brand: string | null;
      size: string;
      color: string | null;
      category: string | null;
      price: number;
    };
  };
  user: {
    firstname: string;
    lastname: string;
    email: string;
    contactNumber: string | null;
    address: string | null;
  };
};
