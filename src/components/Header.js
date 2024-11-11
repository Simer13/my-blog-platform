"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';


const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-800 fixed top-0 left-0 w-full z-20 shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-grow flex items-center justify-center space-x-4">
            
            <Link href="/" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
              Home
            </Link>

            
            <Link href="/blogPosts" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Blogs
            </Link>

            
            <Link href="/about" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              About
            </Link>

            
            <Link href="/contact" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Contact
            </Link>

            <div className="relative inline-block text-left" ref={dropdownRef}>
              <div>
                <button
                  type="button"
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-700"
                  id="menu-button"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                >
                  Dashboard
                  <svg
                    className="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 z-30 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1" role="none">
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700">
                      Author Dashboard
                    </Link>
                    <Link href="/create-post" className="block px-4 py-2 text-sm text-gray-700">
                      Create New Posts
                    </Link>
                  </div>
                  <div className="py-1" role="none">
                    <Link href="/manage-posts" className="block px-4 py-2 text-sm text-gray-700">
                      Manage Posts
                    </Link>
                    <Link href="/delete-posts" className="block px-4 py-2 text-sm text-gray-700">
                      Delete Posts
                    </Link>
                  </div>
                  <div className="py-1">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700">
                      Profile Settings
                    </Link>
                    <Link href="/subscriptions" className="block px-4 py-2 text-sm text-gray-700">
                      Subscriptions
                    </Link>
                  </div>
                  <div className="py-1">
                    <Link href="/comments" className="block px-4 py-2 text-sm text-gray-700">
                      Manage Comments
                    </Link>
                    <Link href="/favorites" className="block px-4 py-2 text-sm text-gray-700">
                      Favorites
                    </Link>
                  </div>
                  <div className="py-1">
                    <Link href="/help" className="block px-4 py-2 text-sm text-gray-700">
                      FAQ
                    </Link>
                    <Link href="/contact" className="block px-4 py-2 text-sm text-gray-700">
                      Contact Us
                    </Link>
                  </div>
                  <div className="py-1">
                    <Link href="/logout" className="block px-4 py-2 text-sm text-gray-700">
                      Sign Out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
