'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleProfileClick = () => setDropdownOpen((prev) => !prev);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await signOut({
      redirect: false,
      callbackUrl: '/about'
    });
    router.push('/about');
  };

  const closeDropdown = () => setDropdownOpen(false);

  const defaultImage = session?.user?.isAdmin ? "/default-admin.png" : "/Default-Profile.jpg";

  return (
    <nav className="bg-gradient-to-r from-[#F9B4AB] to-[#F28179] shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="/Planista-Pro.jpg"
            alt="Planista-Pro Logo"
            className="w-16 h-16 rounded-full" 
          />
          <span className="text-xl font-bold text-white">Planista-Pro</span> 
        </Link>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 rounded-full px-4 py-2"
            asChild
          >
            <Link href="/">Home</Link>
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 rounded-full px-4 py-2"
            asChild
          >
            <Link href="/event-booking">Events</Link>
          </Button>
         
          {session?.user ? (
            <>
              {session.user.isAdmin && (
                <Button
                  variant="default"
                  className="bg-white text-[#F28179] hover:bg-[#F9B4AB] hover:text-white px-4 py-2"
                  asChild
                >
                  <Link href="/admin">Admin Dashboard</Link>
                </Button>
              )}
              <div className="relative inline-block">
                <button
                  onClick={handleProfileClick}
                  className="text-white hover:bg-white/10 rounded-full p-2"
                >
                  <img
                    src={session.user.image || defaultImage}
                    alt="Profile"
                    className="w-8 h-8 object-cover rounded-full"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-40 z-50">
                    <Link
                      href="/profile"
                      onClick={closeDropdown}
                      className="block px-4 py-2 text-[#F28179] hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Button
              variant="default"
              className="bg-white text-[#F28179] hover:bg-[#F9B4AB] hover:text-white px-4 py-2"
              asChild
            >
              <Link href="/auth">Log in</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
