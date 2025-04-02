"use client";

import { useState, useEffect } from "react";

// Function to fetch meal ideas from TheMealDB API
const fetchMealIdeas = async (ingredient) => {
  if (!ingredient) return [];
  
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
};

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  // Clean the ingredient name by removing emojis and quantity info
  const cleanIngredientName = (name) => {
    if (!name) return "";
    
    // Remove emojis
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
    
    // Remove quantity and unit information (e.g., "1 kg")
    return name
      .replace(emojiRegex, "")
      .split(",")[0]
      .trim();
  };

  const loadMealIdeas = async () => {
    setLoading(true);
    const cleanedIngredient = cleanIngredientName(ingredient);
    if (cleanedIngredient) {
      const mealIdeas = await fetchMealIdeas(cleanedIngredient);
      setMeals(mealIdeas);
    } else {
      setMeals([]);
    }
    setLoading(false);
  };

  // Load meal ideas when the ingredient changes
  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="bg-indigo-950/60 p-6 rounded-lg backdrop-blur-sm shadow-lg border border-indigo-900/50">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Meal Ideas {ingredient && `for ${cleanIngredientName(ingredient)}`}
      </h2>
      
      {loading ? (
        <p className="text-indigo-300">Loading meal ideas...</p>
      ) : meals && meals.length > 0 ? (
        <ul className="space-y-2">
          {meals.map((meal) => (
            <li 
              key={meal.idMeal}
              className="bg-indigo-950/80 p-3 rounded-md border border-indigo-800/50 transition-all hover:bg-indigo-900/80 hover:translate-x-1"
            >
              <div className="flex items-center gap-3">
                <img 
                  src={meal.strMealThumb} 
                  alt={meal.strMeal} 
                  className="w-12 h-12 rounded-md object-cover" 
                />
                <span className="text-white">{meal.strMeal}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-indigo-300">
          {ingredient ? "No meal ideas found for this ingredient" : "Select an item to see meal ideas"}
        </div>
      )}
    </div>
  );
}