"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FaBars, FaUserCircle, FaTimes } from 'react-icons/fa';

import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';
import Image from 'next/image';  // Import react-image for optimized loading

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function Dashboard() {
  const [content, setContent] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [url, setUrl] = useState(''); 

  useEffect(() => {
    // Set the current URL once the component is mounted (client-side only)
    setUrl(window.location.href);
  }, []);

  const handleContentChange = (value: string) => {
    setContent(value);
  };
  
  

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Use optional chaining to handle potential null/undefined
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  

  if (!url) {
    // You can render a loading state or return null until the URL is set
    return null;
  }

  return (
    <div className="bg-white text-black min-h-screen flex">
      {/* Sidebar for Table of Contents */}
      <aside className="w-1/4 bg-[#f5f5f5] p-8">
        <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
        <ul className="space-y-4">
          <li className="text-sm hover:underline cursor-pointer">Introduction</li>
          <li className="text-sm hover:underline cursor-pointer">Blog Formatting Tips</li>
          <li className="text-sm hover:underline cursor-pointer">How to Add Media</li>
          <li className="text-sm hover:underline cursor-pointer">Finalizing Your Blog</li>
        </ul>

        {/* Social Media Share Buttons with Emoji */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Share this article:</h3>
          <div className="flex space-x-4 mt-4">
            <FacebookShareButton url={url}>
              <div className="flex items-center space-x-2">
                <span>📘</span>
                <Image src="/Images/facebook.png" alt="Facebook" width={32} height={32} />
              </div>
            </FacebookShareButton>
            <TwitterShareButton url={url}>
              <div className="flex items-center space-x-2">
                <span>🐦</span>
                <Image src="/Images/twitter.png" alt="Twitter" width={32} height={32} />
              </div>
            </TwitterShareButton>
            <LinkedinShareButton url={url}>
              <div className="flex items-center space-x-2">
                <span>💼</span>
                <Image src="/Images/linkedin.png" alt="LinkedIn" width={32} height={32} />
              </div>
            </LinkedinShareButton>
          </div>
        </div>

        {/* Older Blog Posts Section */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Older Blog Posts</h3>
          <ul className="space-y-6">
            <li className="flex items-center space-x-4">
              <Image
                src="https://plus.unsplash.com/premium_photo-1663835910909-bb85129b654f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d3JpdGluZyUyMGlzJTIwdGhlcmFweXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Blog 1"
                width={100}
                height={100}
                className="rounded-lg"
              />
              <div>
                <h4 className="font-bold">My First Blog</h4>
                <p className="text-sm text-gray-500">Posted on Sep 1, 2024</p>
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <Image
                src="https://images.unsplash.com/photo-1638866408990-1b5e583394d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG93ZXIlMjBvZiUyMHdvcmRzfGVufDB8fDB8fHww"
                alt="Blog 2"
                width={100}
                height={100}
                className="rounded-lg"
              />
              <div>
                <h4 className="font-bold">Adventures in Coding</h4>
                <p className="text-sm text-gray-500">Posted on Aug 24, 2024</p>
              </div>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Writing Area */}
      <main className="w-3/4 p-8 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Create New Blog</h1>
          <button
            className="p-2 bg-black text-white rounded-lg"
            onClick={() => setShowProfile(!showProfile)}
          >
            <FaBars size={20} />
          </button>
        </div>

        {/* Profile Sidebar */}
        {showProfile && (
          <div className="absolute top-0 right-0 w-1/4 bg-white shadow-lg p-6 z-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <FaUserCircle size={60} className="text-gray-600" />
                <div>
                  <h3 className="text-xl font-semibold">John Doe</h3>
                  <p className="text-gray-500">johndoe@example.com</p>
                </div>
              </div>
              <button
                onClick={() => setShowProfile(false)}
                className="text-black p-1 hover:text-red-500"
                aria-label="Toggle Profile Sidebar"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <ul className="mt-4 space-y-2">
              <li className="hover:bg-gray-200 p-2 rounded-lg cursor-pointer">My Profile</li>
              <li className="hover:bg-gray-200 p-2 rounded-lg cursor-pointer">Settings</li>
              <li className="hover:bg-gray-200 p-2 rounded-lg cursor-pointer">Log Out</li>
            </ul>
          </div>
        )}

        {/* Blog Image Upload */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Add a cover image (Optional)</label>
          <div className="flex items-center space-x-4">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Selected Cover"
                width={150}
                height={150}
                className="rounded-lg"
              />
            )}
            
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              aria-label="Upload a cover image"
              className="p-2 bg-gray-100 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Writing Area */}
        <div className="flex-grow">
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            className="h-full border rounded-lg bg-[#f5f5f5] p-4"
            placeholder="Start writing your blog here..."
          />
        </div>

        {/* Publish Button */}
        <div className="mt-6 flex justify-end">
          <button className="bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition duration-300 transform hover:scale-105">
            Publish Blog
          </button>
        </div>
      </main>
    </div>
  );
}
