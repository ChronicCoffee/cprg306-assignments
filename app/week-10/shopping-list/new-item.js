"use client";

import { useState } from 'react';

export default function NewItem({ onAddItem }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      id: Math.random().toString(36).substr(2, 9),
      name: searchQuery,
      quantity,
      category,
    };
    onAddItem(item);
    setSearchQuery("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <div className="bg-indigo-950/60 p-6 rounded-lg backdrop-blur-sm shadow-lg border border-indigo-900/50 mb-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Item Finder</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search Bar */}
        <div>
          <input
            type="text"
            placeholder="Item Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
            className="w-full px-3 py-2 bg-indigo-950/80 text-white rounded-md border border-indigo-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
          />
        </div>

        {/* Quantity Field */}
        <div className="flex items-center justify-center space-x-4">
          <button
            type="button"
            onClick={decrement}
            disabled={quantity === 1}
            className="px-4 py-2 bg-indigo-900 text-white rounded-md hover:bg-indigo-800 disabled:bg-indigo-900/50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <span className="text-xl text-white">{quantity}</span>
          <button
            type="button"
            onClick={increment}
            disabled={quantity === 20}
            className="px-4 py-2 bg-indigo-900 text-white rounded-md hover:bg-indigo-800 disabled:bg-indigo-900/50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>

        {/* Category Field */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-indigo-300 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-indigo-950/80 text-white rounded-md border border-indigo-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
          >
            <option value="produce">🥦 Produce</option>
            <option value="dairy">🥛 Dairy</option>
            <option value="bakery">🍞 Bakery</option>
            <option value="meat">🍗 Meat</option>
            <option value="frozen foods">🧊 Frozen Foods</option>
            <option value="canned goods">🥫 Canned Goods</option>
            <option value="dry goods">🍚 Dry Goods</option>
            <option value="beverages">🥤 Beverages</option>
            <option value="snacks">🍿 Snacks</option>
            <option value="household">🏠 Household</option>
            <option value="other">❓ Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-900 text-white rounded-md hover:bg-indigo-800"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}