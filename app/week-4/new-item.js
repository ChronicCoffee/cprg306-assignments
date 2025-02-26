"use client";

import { useState } from 'react';

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-3 text-black">Counter</h1>
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={decrement}
          disabled={quantity === 1}
          className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-indigo-950 disabled:bg-gray-300"
        >
          -
        </button>
        <span className="text-xl text-black">{quantity}</span>
        <button
          onClick={increment}
          disabled={quantity === 20}
          className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-indigo-950 disabled:bg-gray-300"
        >
          +
        </button>
      </div>
    </div>
  );
}