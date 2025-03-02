"use client";

import { useState } from 'react';
import NewItem from './new-item';
import ItemList from './item-list';
import itemsData from './items.json';

export default function Page() {
  const [items, setItems] = useState(itemsData);

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black p-4">
      <div className="max-w-xl ml-6">
        <header className="mb-6 space-y-0.5">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold text-white mb-2">
              Shopping List
            </h1>
            <span className="text-indigo-400 text-lg">📝</span>
          </div>
          <p className="text-indigo-300 text-sm">What you need to buy</p>
          <div className="h-0.5 w-16 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
        </header>
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} />
      </div>
    </main>
  );
}