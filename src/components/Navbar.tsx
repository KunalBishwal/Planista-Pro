'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { data: session } = useSession(); // Access the session
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleProfileClick = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => signOut();

  return (
    <nav className="bg-gradient-to-r from-[#F9B4AB] to-[#F28179] shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/Planista-Pro.jpg"
            alt="Planista-Pro Logo"
            className="w-10 h-10 object-cover rounded-full"
          />
          <span className="text-2xl font-bold text-white">Planista-Pro</span>
        </Link>
        <div className="space-x-1 sm:space-x-2">
          <Button variant="ghost" className="text-white hover:bg-white/10 rounded-full px-4 py-2" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/10 rounded-full px-4 py-2" asChild>
            <Link href="/event-booking">Events</Link>
          </Button>
          
          {/* If user is admin, show the admin dashboard */}
          {session?.user?.isAdmin && (
            <Button variant="default" className="bg-white text-[#F28179] hover:bg-[#F9B4AB] hover:text-white px-4 py-2" asChild>
              <Link href="/admin">Admin Dashboard</Link>
            </Button>
          )}

          {/* Profile Pic and Dropdown for regular users */}
          {session?.user && (
            <div className="relative inline-block">
              <button onClick={handleProfileClick} className="text-white hover:bg-white/10 rounded-full p-2">
                <img
                  src={session.user.image || "/default-profile.jpg"}
                  alt="Profile"
                  className="w-8 h-8 object-cover rounded-full"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-40">
                  <Link href="/profile" className="block px-4 py-2 text-[#F28179]">Profile</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600">Log out</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
