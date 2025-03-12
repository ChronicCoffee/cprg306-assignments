"use client";

import { useState } from "react";
import Item from "./item";

export default function ItemList({ items, onItemSelect }) {
  const [sortBy, setSortBy] = useState("name");
  const [groupByCategory, setGroupByCategory] = useState(false);

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  const groupedItems = sortedItems.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});

  const groupedItemsArray = Object.keys(groupedItems)
    .sort()
    .map((category) => ({
      category,
      items: groupedItems[category].sort((a, b) => a.name.localeCompare(b.name)),
    }));

  return (
    <div className="space-y-6">
      {/* Sort Options Section */}
      <div className="flex flex-wrap gap-3 bg-indigo-950/50 p-4 rounded-lg backdrop-blur-sm shadow-lg mb-6 border border-indigo-900/50">
        <h2 className="text-2xl font-bold text-white w-full mb-2">Sort Options</h2>
        <button
          onClick={() => {
            setSortBy("name");
            setGroupByCategory(false);
          }}
          className={`px-4 py-2 transition-all duration-200 ${
            sortBy === "name" && !groupByCategory
              ? "bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700" 
              : "bg-indigo-950/80 text-indigo-300 rounded-md border border-indigo-800/50 hover:bg-indigo-900/80 hover:text-white"
          }`}
        >
          By Name
        </button>
        <button
          onClick={() => {
            setSortBy("category");
            setGroupByCategory(false);
          }}
          className={`px-4 py-2 transition-all duration-200 ${
            sortBy === "category" && !groupByCategory
              ? "bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700" 
              : "bg-indigo-950/80 text-indigo-300 rounded-md border border-indigo-800/50 hover:bg-indigo-900/80 hover:text-white"
          }`}
        >
          By Category
        </button>
        <button
          onClick={() => setGroupByCategory(true)}
          className={`px-4 py-2 transition-all duration-200 ${
            groupByCategory
              ? "bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700" 
              : "bg-indigo-950/80 text-indigo-300 rounded-md border border-indigo-800/50 hover:bg-indigo-900/80 hover:text-white"
          }`}
        >
          Group by Category
        </button>
      </div>

      {/* Item List Section */}
      {groupByCategory ? (
        <div className="space-y-8">
          {groupedItemsArray.map((group) => (
            <div key={group.category} className="bg-indigo-950/30 rounded-lg p-4 backdrop-blur-sm shadow-lg border-l-4 border-l-indigo-600 border-t border-r border-b border-indigo-900/40">
              <h2 className="text-lg font-bold capitalize mb-4 text-white flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-indigo-400"></div>
                {group.category}
                <span className="text-indigo-400 text-xs font-normal ml-2">
                  ({group.items.length} {group.items.length === 1 ? "item" : "items"})
                </span>
              </h2>
              <div className="space-y-2 pl-2">
                {group.items.map((item) => (
                  <Item
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                    onSelect={() => onItemSelect && onItemSelect(item)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
              onSelect={() => onItemSelect && onItemSelect(item)}
            />
          ))}
        </div>
      )}
      
      {/* Footer */}
      <div className="text-xs text-indigo-400/60 mt-8 pt-2 border-t border-indigo-900/40">
        Displaying {sortedItems.length} items • {groupByCategory ? "Grouped by category" : `Sorted by ${sortBy}`}
      </div>
    </div>
  );
}