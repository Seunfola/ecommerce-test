'use client';

import React from 'react';
import Link from 'next/link';

const OrderConfirmation: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg text-center w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8">Order Confirmation</h1>
        <p className="text-lg mb-8">Thank you for your purchase! Your order has been successfully processed.</p>
        <Link href="/" passHref legacyBehavior>
          <a className="bg-green-500 text-white px-4 py-2 rounded">Return to Home</a>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
