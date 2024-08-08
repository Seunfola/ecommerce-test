'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

interface Product {
  product_id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const removeFromCart = (product_id: number) => {
    const updatedCart = cart.filter((product) => product.product_id !== product_id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success('Product removed from cart!');
  };

  const incrementQuantity = (product_id: number) => {
    const updatedCart = cart.map((product) =>
      product.product_id === product_id ? { ...product, quantity: product.quantity + 1 } : product
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const decrementQuantity = (product_id: number) => {
    const updatedCart = cart.map((product) =>
      product.product_id === product_id && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Cart</h1>
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
                <div className="flex space-x-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => incrementQuantity(product.product_id)}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => decrementQuantity(product.product_id)}
                  >
                    -
                  </button>
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                  onClick={() => removeFromCart(product.product_id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold mb-4">Total: ${totalPrice.toFixed(2)}</h2>
            <Link href="/checkout" passHref legacyBehavior>
              <a className="bg-green-500 text-white px-4 py-2 rounded">Proceed to Checkout</a>
            </Link>
          </div>
        </>
      )}
      <Toaster />
    </div>
  );
};

export default Cart;
