'use client';

import React, { useState } from 'react';
import Products from './products/page';
import ProductSlider from './components/ProductSlider';
import CustomModal from './components/Modal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    setShowProducts(true);
    closeModal();
  };

  return (
    <main className="flex flex-col min-h-screen">
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to CBS Ecommerce Store</h1>
        <p className="text-lg mb-8">Your one-stop shop for the best products</p>
        <button onClick={openModal} className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">
          Shop Now
        </button>
      </section>
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <ProductSlider addToCart={(product) => {}} />
      </section>
      {showProducts && (
        <section id="products" className="container mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">All Products</h2>
          <Products />
        </section>
      )}
      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal} onConfirm={handleConfirm} />
    </main>
  );
}
