'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

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

const ProductDetails: React.FC = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (product_id) {
      axios.get(`https://fake-store-api.mock.beeceptor.com/api/products/${product_id}`)
        .then(response => {
          setProduct(response.data);
        })
        .catch(error => console.error(error));
    }
  }, [product_id]);

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
      window.dispatchEvent(new Event('storage')); // Trigger the storage event to update the cart count
      return updatedCart;
    });
    toast.success(`${product.name} has been added to the cart!`);
    router.push('/cart');
  };

  if (!product) return <div className="container mx-auto py-8">Loading...</div>;

  return (
    <div className="container mx-auto py-8 w-full">
      <h1 className="text-4xl font-bold mb-8 text-center">{product.name}</h1>
      <div className="flex flex-col items-center w-full">
        <Image src={product.image} alt={product.name} width={600} height={400} className="w-full h-64 object-cover mb-4" />
        <p className="text-gray-600 mb-4"><strong>Price:</strong> ${product.price ? product.price.toFixed(2) : 'N/A'}</p>
        <p className="text-gray-600 mb-4"><strong>Description:</strong> {product.description}</p>
        <p className="text-gray-600 mb-4"><strong>Category:</strong> {product.category}</p>
        <p className="text-gray-600 mb-4"><strong>Brand:</strong> {product.brand}</p>
        <p className="text-gray-600 mb-4"><strong>Availability:</strong> {product.availability ? 'In Stock' : 'Out of Stock'}</p>
        <p className="text-gray-600 mb-4"><strong>Rating:</strong> {product.rating}</p>
        <p className="text-gray-600 mb-4"><strong>Discount:</strong> {product.discount}%</p>
        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={() => addToCart(product)}>Add to Cart</button>
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {product.reviews && product.reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          <ul className="w-full">
            {product.reviews?.map((review) => (
              <li key={review.user_id} className="border-b border-gray-300 py-4">
                <p className="text-gray-800"><strong>Rating:</strong> {review.rating}</p>
                <p className="text-gray-800"><strong>Comment:</strong> {review.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default ProductDetails;
