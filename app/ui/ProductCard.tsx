import React from 'react';
import { Star, Heart } from 'lucide-react';

const ProductCard = ({ product }: any) => {
  return (
    <div className="w-64 bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md">
          <Heart size={20} className="text-pink-500" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-1">
          <Star size={16} className="text-yellow-400 fill-current" />
          <span className="text-sm ml-1">{product.rating}</span>
        </div>
        <h3 className="text-sm text-gray-500 mb-1">{product.brand}</h3>
        <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-lg font-bold">₹{product.discountedPrice}</span>
            <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
          </div>
          <span className="text-sm font-semibold text-green-600">{product.discount}% OFF</span>
        </div>
        <button className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

// Usage example:
const App = () => {
  const product = {
    image: "/path/to/product-image.jpg",
    rating: 4.8,
    brand: "Liz Earlef",
    name: "Cleanse & Polish™ Hot Cloth Cleanser 200ml",
    discountedPrice: 1490,
    originalPrice: 1863,
    discount: 20
  };

  return (
    <div className="p-4 bg-purple-100">
      <ProductCard product={product} />
    </div>
  );
};