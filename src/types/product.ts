export type Product = {
  id: number;
  name: string;
  image: string | null;
  size: string;
  brand: string | null;
  color: string | null;
  stocks: string;
  price: number;
  category: {
    id: number
    name: string
  }
  orders?: any;
};
