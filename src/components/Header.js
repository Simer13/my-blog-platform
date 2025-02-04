'use client';
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);  // For mobile view
  const dropdownRef = useRef(null);

  // Toggle the dropdown for the desktop and mobile
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-800 fixed top-0 left-0 w-full z-20 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo or Home */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-white text-lg font-bold">
              Magica
            </Link>
          </div>

          {/* Links for larger screens */}
          <div className="hidden md:flex flex-grow items-center justify-center space-x-4">
            <Link
              href="/"
              className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
            >
              Home
            </Link>
            <Link
              href="/blogPosts"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Blogs
            </Link>
            <Link
              href="/about"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Contact
            </Link>

            {/* Dropdown */}
            <div className="relative inline-block text-left" ref={dropdownRef}>
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
              {dropdownOpen && (
                <div className="absolute right-0 z-30 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Link
                      href="/blogadmindashboard"
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Author Dashboard
                    </Link>
                    <Link
                      href="/blogPosts"
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Create New Posts
                    </Link>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/manage-posts"
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Manage Posts
                    </Link>
                    <Link
                      href="/delete-posts"
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Delete Posts
                    </Link>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Profile Settings
                    </Link>
                    <Link
                      href="/subscriptions"
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Subscriptions
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleMobileMenu}
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-20 bg-gray-800 bg-opacity-75">
                <div className="flex justify-end p-4">
                  <button
                    type="button"
                    onClick={toggleMobileMenu}
                    className="text-white"
                  >
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <Link
                    href="/"
                    className="text-white py-2 px-4 text-xl"
                  >
                    Home
                  </Link>
                  <Link
                    href="/blogPosts"
                    className="text-white py-2 px-4 text-xl"
                  >
                    Blogs
                  </Link>
                  <Link
                    href="/about"
                    className="text-white py-2 px-4 text-xl"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="text-white py-2 px-4 text-xl"
                  >
                    Contact
                  </Link>
                  {/* Mobile Dropdown */}
                  <div className="relative inline-block text-left">
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
                    {dropdownOpen && (
                      <div className="absolute right-0 z-30 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Link
                            href="/blogadmindashboard"
                            className="block px-4 py-2 text-sm text-gray-700"
                          >
                            Author Dashboard
                          </Link>
                          <Link
                            href="/create-post"
                            className="block px-4 py-2 text-sm text-gray-700"
                          >
                            Create New Posts
                          </Link>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/manage-posts"
                            className="block px-4 py-2 text-sm text-gray-700"
                          >
                            Manage Posts
                          </Link>
                          <Link
                            href="/delete-posts"
                            className="block px-4 py-2 text-sm text-gray-700"
                          >
                            Delete Posts
                          </Link>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700"
                          >
                            Profile Settings
                          </Link>
                          <Link
                            href="/subscriptions"
                            className="block px-4 py-2 text-sm text-gray-700"
                          >
                            Subscriptions
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
