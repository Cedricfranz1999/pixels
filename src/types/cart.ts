export type Cart = {
  id: number;
  quantity: number;
  createdAt: Date
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
