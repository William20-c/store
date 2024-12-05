import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;

}

interface Product {
  id: number;
  title: string;
  price: number;
  description:string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: Category
}

interface WishlistState {
  userId: string | null;
  favorites: { [userId: string]: Product[] }; // Usamos un objeto donde la clave es el userId
  setUserId: (id: string) => void;
  toggleFavorite: (args: { userId: string, product: Product }) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      userId: null,
      favorites: {}, // Inicializamos un objeto vacío para los favoritos
      setUserId: (id: string) => set({ userId: id }),
      toggleFavorite: ({ userId, product }) => {
        const { favorites } = get();
        const userFavorites = favorites[userId] || [];
        const isFavorite = userFavorites.some((fav) => fav.id === product.id);

        set({
          favorites: {
            ...favorites,
            [userId]: isFavorite
              ? userFavorites.filter((fav) => fav.id !== product.id)
              : [...userFavorites, product], // Agregamos o eliminamos el producto con solo id, title y price
          },
        });
      },
    }),
    {
      name: 'wishlist',
      storage: localStorage as any,
    }
  )
);
