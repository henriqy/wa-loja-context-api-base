"use client";

import { calculateDiscountedPrice } from "@/app/helpers";
import type { Product } from "@/app/types/product";
import { createContext, useContext, useState } from "react";

interface FavoritesContextType {
  favorites: Product[];
  totalFavoritesValue: number;
  addFavorite: (product: Product) => void;
  removeFavorite: (id: string) => void;
  checkIsFavorite: (id: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  totalFavoritesValue: 0,
  addFavorite: () => {},
  removeFavorite: () => {},
  checkIsFavorite: () => false,
});

export function useFavoritesContext() {
  return useContext(FavoritesContext);
}

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const checkIsFavorite = (id: string) => {
    return favorites.some((item) => item.id === id);
  };

  const addFavorite = (product: Product) => {
    setFavorites((currentFavorites) => [...currentFavorites, product]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((item) => item.id !== id),
    );
  };

  const totalFavoritesValue = favorites.reduce((acc, product) => {
    return (
      acc + calculateDiscountedPrice(Number(product.preco), product.desconto)
    );
  }, 0);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        totalFavoritesValue,
        addFavorite,
        removeFavorite,
        checkIsFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
