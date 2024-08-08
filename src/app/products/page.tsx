'use client';

import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ProductCard from '../components/ProductCard';

interface Review {
  user_id: number;
  rating: number;
  comment: string;
}

interface Product {
  product_id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  discount: number;
  availability: boolean;
  brand: string;
  rating: number;
  reviews: Review[];
  quantity?: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('https://fake-store-api.mock.beeceptor.com/api/products');
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();

    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.product_id === product.product_id);
      let updatedCart;
      if (existingProduct) {
        updatedCart = prevCart.map((p) =>
          p.product_id === product.product_id ? { ...p, quantity: (p.quantity || 0) + 1 } : p
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
    toast.success(`${product.name} has been added to the cart!`);
  };

  return (
    <div className="container mx-auto py-8 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.product_id} product={product} addToCart={addToCart} />
        ))}
      </div>
      <Toaster />
    </div>
  );
};

export default Products;
