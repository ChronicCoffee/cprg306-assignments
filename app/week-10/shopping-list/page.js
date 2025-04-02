"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem, deleteItem } from "./_services/shopping-list-service";
import NewItem from './new-item';
import ItemList from './item-list';
import MealIdeas from './meal-ideas';

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (!user) {
        router.push('/week-10');
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [user, router]);

  // Load items from Firestore when user changes
  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  const loadItems = async () => {
    try {
      const fetchedItems = await getItems(user.uid);
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error loading items:", error);
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      const itemId = await addItem(user.uid, newItem);
      if (itemId) {
        setItems([...items, { ...newItem, id: itemId }]);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  
  const handleItemSelect = (item) => {
    const cleanName = item.name.split(',')[0].trim();
    setSelectedItemName(cleanName);
  };

  // Optional Challenge: Handle item deletion
  const handleDeleteItem = async (itemId) => {
    try {
      const success = await deleteItem(user.uid, itemId);
      if (success) {
        setItems(items.filter(item => item.id !== itemId));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      router.push('/week-10');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black p-4 flex items-center justify-center">
        <div className="text-indigo-300">Loading...</div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black p-4">
      <header className="mb-6 max-w-6xl mx-auto flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold text-white mb-2">
              Shopping List
            </h1>
            <span className="text-indigo-400 text-lg">📝</span>
          </div>
          <p className="text-indigo-300 text-sm">What you need to buy</p>
          <div className="h-0.5 w-16 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <p className="text-indigo-300 text-sm">
              Signed in as <span className="text-white font-bold">{user.displayName || user.email}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Link 
              href="/week-10" 
              className="px-3 py-1 text-sm bg-indigo-950/80 text-indigo-300 rounded-md border border-indigo-800/50 hover:bg-indigo-900/80 hover:text-white"
            >
              Back to Home
            </Link>
            <button 
              onClick={handleSignOut}
              className="px-3 py-1 text-sm bg-indigo-950/80 text-indigo-300 rounded-md border border-indigo-800/50 hover:bg-indigo-900/80 hover:text-white"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <NewItem onAddItem={handleAddItem} />
          <ItemList 
            items={items} 
            onItemSelect={handleItemSelect} 
            onDeleteItem={handleDeleteItem} // Optional Challenge
          />
        </div>
        
        <div>
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}