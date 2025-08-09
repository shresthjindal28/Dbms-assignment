import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, Check } from 'lucide-react';
import { PLACEHOLDER_IMAGES } from '../utils/placeholderImage';

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  stock: number;
  views?: number;
};

const ProductCard: React.FC<{ product: Product; viewMode?: 'grid' | 'list' }> = ({ product, viewMode = 'grid' }) => {
  const { addItem, state } = useCart();
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock <= 5 && product.stock > 0;
  const cartItem = state.items.find(item => item._id === product._id);
  const isInCart = !!cartItem;

  if (viewMode === 'list') {
    return (
      <motion.div
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
        whileHover={{ y: -2 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex">
          <div className="w-32 h-32 flex-shrink-0">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = PLACEHOLDER_IMAGES.medium;
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">No Image</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                <div className="flex items-center space-x-2">
                  {isOutOfStock && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      SOLD OUT
                    </span>
                  )}
                  {isLowStock && !isOutOfStock && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      LOW STOCK
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="font-bold text-xl text-blue-600">₹{product.price.toFixed(2)}</div>
                <div className="text-sm text-gray-500">
                  {product.views || 0} views • {product.stock} in stock
                </div>
              </div>
              <button
                onClick={() => !isOutOfStock && addItem(product)}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 ${
                  isOutOfStock 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : isInCart
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                disabled={isOutOfStock}
              >
                {isOutOfStock ? (
                  'Sold Out'
                ) : isInCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.src = PLACEHOLDER_IMAGES.medium;
            }}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        
        {isOutOfStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            SOLD OUT
          </div>
        )}
        
        {isLowStock && !isOutOfStock && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-semibold">
            LOW STOCK
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{product.description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <div className="font-bold text-xl text-blue-600">₹{product.price.toFixed(2)}</div>
          <div className="text-sm text-gray-500">
            {product.views || 0} views
          </div>
        </div>
        
        <div className={`text-sm mb-3 ${isOutOfStock ? 'text-red-500' : isLowStock ? 'text-yellow-600' : 'text-green-600'}`}>
          {isOutOfStock ? 'Out of Stock' : isLowStock ? `Only ${product.stock} left` : `${product.stock} in stock`}
        </div>
        
        <button
          onClick={() => !isOutOfStock && addItem(product)}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 ${
            isOutOfStock 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : isInCart
                ? 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
          }`}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? (
            'Sold Out'
          ) : isInCart ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
