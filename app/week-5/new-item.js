// /app/week-5/new-item.js
"use client";

import { useState } from 'react';

export default function NewItem() {
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
    const item = { searchQuery, quantity, category };
    console.log(item); // Log the item object to the console
    alert(`Added Item: ${searchQuery}, Quantity: ${quantity}, Category: ${category}`);
    setSearchQuery("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-3 text-black">Item Finder</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search Bar (Replaces Name Field) */}
        <div>
          <input
            type="text"
            placeholder="Item Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          />
        </div>

        {/* Quantity Field */}
        <div className="flex items-center justify-center space-x-4">
          <button
            type="button"
            onClick={decrement}
            disabled={quantity === 1}
            className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-indigo-950 disabled:bg-gray-300"
          >
            -
          </button>
          <span className="text-xl text-black">{quantity}</span>
          <button
            type="button"
            onClick={increment}
            disabled={quantity === 20}
            className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-indigo-950 disabled:bg-gray-300"
          >
            +
          </button>
        </div>

        {/* Category Field */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
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
          className="w-full px-4 py-2 bg-slate-900 text-white rounded hover:bg-indigo-950"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}