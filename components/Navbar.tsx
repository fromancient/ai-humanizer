"use client";
import { useAuth } from "../lib/authContext";
import Link from 'next/link';

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 border-b border-gray-200 mb-8">
      <Link href="/" className="text-xl font-bold text-gray-900">
        AI Humanizer
      </Link>
      <div className="flex gap-6 items-center">
        {user && (
          <a href="/dashboard" className="hover:underline">Dashboard</a>
        )}
        <a href="/pricing" className="hover:underline">Pricing</a>
        <a href="/contact" className="hover:underline">Contact</a>
        {!loading && !user && (
          <>
            <a href="/login" className="hover:underline">Login</a>
            <a href="/signup" className="hover:underline">Sign Up</a>
          </>
        )}
        {!loading && user && (
          <button onClick={logout} className="ml-4 px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">Logout</button>
        )}
      </div>
    </nav>
  );
} 