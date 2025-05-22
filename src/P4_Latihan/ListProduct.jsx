import React, { useState } from 'react';
import products from './products.json';

const ListProduct = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Product List</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="font-semibold text-lg text-gray-800">{product.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
              <div className="mt-4">
                <p className="text-base font-bold text-indigo-600">
                  ${product.price.toFixed(2)}{" "}
                  <span className="line-through text-gray-400 text-sm">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                </p>
                <p className="text-sm text-yellow-500">⭐ {product.rating}</p>
                <p className="text-sm text-green-600">{product.stock} in stock</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListProduct;