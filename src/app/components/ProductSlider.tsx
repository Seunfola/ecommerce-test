'use client';

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from './ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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

interface ProductSliderProps {
  addToCart: (product: Product) => void;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ addToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('https://fake-store-api.mock.beeceptor.com/api/products');
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, display: 'block', right: 10, color: 'black' }} onClick={onClick}>
        <FontAwesomeIcon icon={faChevronRight} size="2x" />
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, display: 'block', left: 10, zIndex: 1, color: 'black' }} onClick={onClick}>
        <FontAwesomeIcon icon={faChevronLeft} size="2x" />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {products.map((product) => (
          <ProductCard key={product.product_id} product={product} addToCart={addToCart} />
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
