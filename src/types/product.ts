import { Category } from "./category";

export interface Product {
  _id?: string;
  name: string;
  price: number;
  category: string | Category;  // can be string ID or populated object
  createdAt?: string;
  updatedAt?: string;
}
