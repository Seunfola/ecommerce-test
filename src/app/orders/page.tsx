'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
  order_id: number;
  status: string;
  total: number | null;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://fake-store-api.mock.beeceptor.com/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center">You have no orders.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <div key={order.order_id} className="p-4 border rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Order #{order.order_id}</h2>
              <p className="text-gray-600 mb-4">Status: {order.status}</p>
              <p className="text-gray-800 mb-4">
                Total: ${order.total !== null && order.total !== undefined ? order.total.toFixed(2) : 'N/A'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
