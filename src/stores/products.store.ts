import { create } from 'zustand';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  thumbnail: string;
}

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) throw new Error('ERROR :(');
      
      const data = await response.json();
      set({ products: data.products, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },
}));