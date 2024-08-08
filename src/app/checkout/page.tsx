'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  product_id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}

const Checkout: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const totalPrice = cart.reduce((total, product) => total + (product.price || 0) * product.quantity, 0);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cart.map((product) => (
              <div key={product.product_id} className="p-4 border rounded-lg shadow-md">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">${product.price ? product.price.toFixed(2) : 'N/A'}</p>
                <p className="text-gray-800 mb-4">Quantity: {product.quantity}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold mb-4">Total: ${totalPrice.toFixed(2)}</h2>
            <Link href="/payment" passHref legacyBehavior>
              <a className="bg-green-500 text-white px-4 py-2 rounded">Confirm Order</a>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
