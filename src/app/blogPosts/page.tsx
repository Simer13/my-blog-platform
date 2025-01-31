"use client";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { uploadToCloudinary } from '../../utils/cloudinary';
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from "react-share";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function Dashboard() {
  const [content, setContent] = useState(""); // Blog content
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [url, setUrl] = useState(""); // Current URL
  const [title, setTitle] = useState(""); // Blog title
  const [slug, setSlug] = useState(""); // Slug generated from title
  const [isClient, setIsClient] = useState(false); // To check if it's client-side
  const [toc, setToc] = useState<any[]>([]); // Table of contents state

  useEffect(() => {
    setIsClient(true);
    setUrl(window.location.href); // Set URL for social sharing
  }, []);

  // Handle title input change and generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    // Generate a simple slug from the title
    const newSlug = newTitle
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters except hyphens
      .replace(/\-\-+/g, "-") // Replace multiple hyphens with a single one
      .replace(/^-+/, "") // Remove leading hyphens
      .replace(/-+$/, ""); // Remove trailing hyphens
    setSlug(newSlug);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    updateTableOfContents(value); // Update the ToC whenever content changes
  };

  // Function to generate Table of Contents from content
  const updateTableOfContents = (content: string) => {
    const regex = /<h([1-6])[^>]*>(.*?)<\/h\1>/g; // Regex to find all headings
    const tocItems: unknown[] = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      const level = match[1]; // Heading level (h1, h2, etc.)
      const text = match[2]; // Heading text
      const id = `toc-${tocItems.length + 1}`; // Unique ID for each heading
      tocItems.push({ level, text, id });
    }

    setToc(tocItems);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadToCloudinary(file); // Upload to Cloudinary
        setSelectedImage(imageUrl); // Save the returned URL
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    }
  };

  const handlePublish = async () => {
    try {
      const blogData = {
        title,
        slug,
        content,
        coverImage: selectedImage, // Use Cloudinary URL
        url,
        createdAt: new Date(),
      };

      // Save the blog data to Firestore
      const docRef = await addDoc(collection(db, "posts"), blogData);
      console.log("Blog written and saved with ID: ", docRef.id);

      alert("Blog published successfully!");
      setTitle("");
      setSlug("");
      setContent("");
      setSelectedImage(null);

    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to publish the blog. Please try again.");
    }
  };

  if (!isClient) {
    return null; // Don't render anything if not on the client side
  }

  return (
    <div className="bg-white text-black min-h-screen flex flex-col md:flex-row">
      {/* Sidebar for Real-Time Table of Contents */}
      <aside className="w-full md:w-1/4 bg-[#f5f5f5] p-8 md:p-4 sticky top-0">
        <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
        <ul className="space-y-4">
          {toc.map((item, index) => (
            <li key={index}>
              <a
                href={`#${item.id}`}
                className={`text-sm cursor-pointer ${
                  item.level === "1" ? "font-semibold" : "font-normal"
                } hover:underline`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>

        {/* Social Media Share Buttons */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Share this article:</h3>
          <div className="flex space-x-4 mt-4">
            <FacebookShareButton url={url}>
              <Image src="/Images/facebook.png" alt="Facebook" width={32} height={32} />
            </FacebookShareButton>
            <TwitterShareButton url={url}>
              <Image src="/Images/twitter.png" alt="Twitter" width={32} height={32} />
            </TwitterShareButton>
            <LinkedinShareButton url={url}>
              <Image src="/Images/linkedin.png" alt="LinkedIn" width={32} height={32} />
            </LinkedinShareButton>
          </div>
        </div>
      </aside>

      {/* Main Writing Area */}
      <main className="w-full md:w-3/4 p-8 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Create New Blog</h1>

          {/* Avatar with Dropdown */}
          <div className="relative">
            <Image
              id="avatarButton"
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 rounded-full cursor-pointer"
              src="https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdyaXRlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="User dropdown"
              width={40}
              height={40}
            />
            {showDropdown && (
              <div
                id="userDropdown"
                className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>Bonnie Green</div>
                  <div className="font-medium truncate">name@flowbite.com</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <a
                      href="/blogadmindashboard"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Earnings
                    </a>
                  </li>
                </ul>
                <div className="py-1">
                  <a
                    href="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Title Input */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Blog Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="p-2 bg-gray-100 border border-gray-300 rounded-lg w-full"
            placeholder="Enter your blog title here"
          />
        </div>

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
          <button
            className="bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition duration-300 transform hover:scale-105"
            onClick={handlePublish}
          >
            Publish Blog
          </button>
        </div>
      </main>
    </div>
  );
}
