'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBoxOpen, faShoppingCart, faClipboardList } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((acc: number, product: { quantity: number }) => acc + product.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();

    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">CBS Store</div>
        <div className="space-x-4 flex items-center">
          <Link href="/" passHref legacyBehavior>
            <a className="hover:underline"><FontAwesomeIcon icon={faHome} /> Home</a>
          </Link>
          <Link href="/products" passHref legacyBehavior>
            <a className="hover:underline"><FontAwesomeIcon icon={faBoxOpen} /> Products</a>
          </Link>
          <Link href="/cart" passHref legacyBehavior>
            <a className="hover:underline relative">
              <FontAwesomeIcon icon={faShoppingCart} /> Cart
              {cartCount > 0 && (
                <span className="absolute bottom-4 left-12 inline-block w-4 h-4 text-center text-xs text-white bg-red-600 rounded-full">{cartCount}</span>
              )}
            </a>
          </Link>
          <Link href="/orders" passHref legacyBehavior>
            <a className="hover:underline"><FontAwesomeIcon icon={faClipboardList} /> Orders</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
