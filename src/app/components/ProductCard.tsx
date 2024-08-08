'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const router = useRouter();

  const handleViewDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    router.push(`/products/${product.product_id}`);
  };

  return (
    <div className="p-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <div className="border rounded-lg p-4 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-96">
        <Image src={product.image} alt={product.name} width={320} height={240} className="w-full h-40 object-cover mb-4 rounded" />
        <h2 className="text-xl font-semibold mb-2 text-center">{product.name}</h2>
        <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mb-2"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleViewDetails}
        >
          Check Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
