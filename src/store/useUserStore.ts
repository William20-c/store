import {create} from 'zustand';
import { persist } from 'zustand/middleware';

// Definimos la interfaz para los datos del usuario
interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

interface UserState {
  user: User | null; // Almacenamos el usuario o null si no está logueado
  setUser: (user: User) => void; // Función para establecer los datos del usuario
  clearUser: () => void; // Función para limpiar los datos del usuario (logout)
}

// Creamos el store utilizando Zustand y la persistencia
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null, // Inicialmente el usuario no está logueado
      setUser: (user: User) => set({ user }), // Establecer los datos del usuario
      clearUser: () => set({ user: null }), // Limpiar los datos (logout)
    }),
    {
      name: 'user', // Nombre clave para almacenar en localStorage
      storage: localStorage as any, // Especificamos que se debe usar localStorage
    }
  )
);
