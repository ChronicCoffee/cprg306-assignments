"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [greetingEmoji, setGreetingEmoji] = useState("");

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    let timeGreeting = "";
    let emoji = "";
    
    if (hour >= 5 && hour < 12) {
      timeGreeting = "Good morning";
      emoji = "☀️";
    } else if (hour >= 12 && hour < 17) {
      timeGreeting = "Good afternoon";
      emoji = "🌤️";
    } else if (hour >= 17 && hour < 22) {
      timeGreeting = "Good evening";
      emoji = "🌙";
    } else {
      timeGreeting = "Good night";
      emoji = "✨";
    }
    
    setGreeting(timeGreeting);
    setGreetingEmoji(emoji);
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await gitHubSignIn();
      // Optional: Redirect to shopping list page after successful login
      window.location.href = '/week-9/shopping-list';
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black p-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-indigo-950/60 rounded-xl backdrop-blur-sm shadow-xl border border-indigo-900/50 p-8 transform transition-all hover:shadow-indigo-700/20 hover:shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Shopping List
            </h1>
            <div className="h-1 w-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full mt-2"></div>
          </div>
          <div className="text-4xl">{greetingEmoji}</div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-800/30 to-purple-800/30 p-4 rounded-lg border border-indigo-700/30 mb-6">
          <p className="text-indigo-200 font-medium">
            {greeting}! <span className="text-white">Welcome to your personal shopping assistant.</span>
          </p>
        </div>

        {user ? (
          <div className="space-y-6">
            <div className="bg-indigo-900/40 p-4 rounded-lg border border-indigo-800/50 transform transition-all hover:scale-[1.01]">
              <p className="text-indigo-100 mb-1 flex items-center">
                <span className="mr-2">👤</span>
                Signed in as:
              </p>
              <p className="text-white font-medium">
                <span className="font-bold">{user.displayName || "User"}</span>
                <span className="text-indigo-300 text-sm ml-2">
                  ({user.email})
                </span>
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/week-9/shopping-list"
                className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-md hover:from-indigo-500 hover:to-indigo-600 flex items-center justify-center font-medium transition-all shadow-md hover:shadow-lg"
              >
                <span className="mr-2">📝</span>
                Go to Shopping List
              </Link>

              <button
                onClick={handleSignOut}
                disabled={loading}
                className="w-full px-4 py-3 bg-indigo-950/80 text-indigo-300 rounded-md border border-indigo-800/50 hover:bg-indigo-900/80 hover:text-white disabled:opacity-50 transition-colors"
              >
                {loading ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-indigo-300 text-center">
              Please sign in with your GitHub account to access the shopping
              list app.
            </p>

            <button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-md hover:from-indigo-500 hover:to-indigo-600 flex items-center justify-center font-medium transition-all shadow-md hover:shadow-lg"
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              {loading ? "Signing in..." : "Sign in with GitHub"}
            </button>

            {error && (
              <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-md border border-red-900/50">
                <div className="flex items-center mb-1">
                  <span className="mr-2">⚠️</span>
                  <span className="font-medium">Sign-in Error</span>
                </div>
                <p>{error}</p>
              </div>
            )}
            
            <div className="pt-4">
              <div className="h-px w-full bg-indigo-800/30"></div>
              <p className="text-indigo-400 text-sm text-center mt-4">Organize your shopping with ease</p>
              <div className="flex justify-center gap-3 mt-3">
                <span className="text-indigo-300">🛒</span>
                <span className="text-indigo-300">📋</span>
                <span className="text-indigo-300">🔍</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}