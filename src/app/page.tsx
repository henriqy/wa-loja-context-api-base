"use client";

import ProductList from "./components/ProductList/ProductList";
import { FavoritesProvider } from "./context/Favorites/FavoritesProvider";
import { mockProducts } from "./mocks/products";

export default function HomePage() {
  const products = mockProducts;

  return (
    <main>
      <div className="container p-5">
        <FavoritesProvider>
          <ProductList products={products} />
        </FavoritesProvider>
      </div>
    </main>
  );
}
