'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

interface Order {
  order_id: number;
  status: string;
  total: number | null;
  products: {
    product_id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
}

const OrderStatus: React.FC = () => {
  const searchParams = useSearchParams();
  const order_id = searchParams.get('order_id');
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      if (order_id) {
        try {
          const response = await axios.get(`https://fake-store-api.mock.beeceptor.com/api/orders/status?order_id=${order_id}`);
          setOrder(response.data);
        } catch (error) {
          console.error('Failed to fetch order status', error);
        }
      }
    };

    fetchOrderStatus();
  }, [order_id]);

  if (!order) return <div className="container mx-auto py-8">Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Order #{order.order_id}</h1>
      <div className="p-4 border rounded-lg">
        <p className="text-gray-600 mb-4">Status: {order.status}</p>
        <p className="text-gray-800 mb-4">
          Total: ${order.total !== null && order.total !== undefined ? order.total.toFixed(2) : 'N/A'}
        </p>
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <ul>
          {order.products.map((product) => (
            <li key={product.product_id} className="mb-2">
              <span>{product.name}</span> - ${product.price.toFixed(2)} x {product.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderStatus;
