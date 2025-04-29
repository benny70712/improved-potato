import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const featuredPosts = [
    { id: 1, user: "ChillSpud", content: "Just mashed through another series 🍿" },
    { id: 2, user: "CouchKing", content: "Life’s better with snacks and streams." },
    { id: 3, user: "LazyLatte", content: "Sundays are for doing absolutely nothing 🥔" },
  ];

  return (
    <div className="min-h-screen bg-yellow-50 text-gray-800">
      <header className="bg-orange-100 shadow-md p-6">
        <h1 className="text-5xl font-extrabold text-center text-orange-500 drop-shadow-sm">Connect Potato 🥔</h1>
        <p className="text-center text-sm text-orange-700 mt-2 font-medium">Where chill vibes and good times meet.</p>
        <div className="flex justify-center gap-6 mt-4">
          <Link
            to="/login"
            className="bg-orange-400 text-white px-6 py-2 rounded-full shadow hover:bg-orange-500 transition"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="bg-white border border-orange-300 text-orange-500 px-6 py-2 rounded-full shadow hover:bg-orange-100 transition"
          >
            Sign Up
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto mt-10 px-4">
        <h2 className="text-3xl font-semibold text-center mb-6 text-orange-600">🥔 Trending Potatoes</h2>
        <div className="space-y-5">
          {featuredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-orange-200 p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <p className="font-bold text-orange-700">@{post.user}</p>
              <p className="text-gray-700 mt-1">{post.content}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-20 p-4 text-center text-sm text-orange-400">
        © 2025 Connect Potato. Stay cozy!
      </footer>
    </div>
  );
};

export default HomePage;
