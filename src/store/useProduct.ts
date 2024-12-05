import { create } from "zustand";

export interface Category {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;

}

export interface Product {
    id: number;
    title: string;
    price: number;
    description:string;
    images: string[];
    creationAt: string;
    updatedAt: string;
    category: Category
}

export interface ProductWishList {
  id: number,
  title: string,
  price: number
}

export interface ProductState {
    product: Product | null;
    addProduct: (nProduct: Product) => void;
  }
  
  const useProduct = create<ProductState>((set) => ({
    product: null,
    addProduct: (nProduct: Product) => set(() => ({ product: nProduct })),
  }));
  
  export default useProduct;

