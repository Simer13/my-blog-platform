"use client";
import { collection, addDoc, doc, getDoc, onSnapshot } from 'firebase/firestore'; // Import getDoc and onSnapshot
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { db } from '../../../firebase/firebase';
import { uploadToCloudinary } from '../../utils/cloudinary';
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from "react-share";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function Dashboard() {
  const [content, setContent] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // New states for subscription and achievement
  const [userPaidSubscription, setUserPaidSubscription] = useState<string | null>(null); // e.g., "gold", "none"
  const [currentTierAchievement, setCurrentTierAchievement] = useState("basic"); // e.g., "silver", "basic"

  interface TocItem {
    level: string;
    text: string;
    id: string;
  }

  const [toc, setToc] = useState<TocItem[]>([]);
  const router = useRouter();

  // Helper function to get the index of a tier name
  const getTierIndex = (tierName: string) => {
    const tiersOrder = ["basic", "silver", "gold", "platinum", "diamond"];
    const index = tiersOrder.indexOf(tierName.toLowerCase());
    return index !== -1 ? index : -1; // Return -1 if not found (e.g., "none")
  };

  // Determine if the user is allowed to blog
  const canBlog = (
    currentTierAchievement === "basic" || // Always allow if they are only basic by content
    getTierIndex(userPaidSubscription || "none") >= getTierIndex(currentTierAchievement) // Or if they are paying for their achieved tier or higher
  );

  useEffect(() => {
    setIsClient(true);
    setUrl(window.location.href);

    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Listener for user's subscription status from their user document
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeUserDoc = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                // Assuming 'currentSubscriptionPlan' and 'achievedContentTier' fields exist
                setUserPaidSubscription(userData.currentSubscriptionPlan || "none");
                setCurrentTierAchievement(userData.achievedContentTier || "basic");
            } else {
                setUserPaidSubscription("none");
                setCurrentTierAchievement("basic");
            }
        });

        return () => unsubscribeUserDoc(); // Clean up user doc listener
      } else {
        setUserPaidSubscription("none");
        setCurrentTierAchievement("basic");
      }
    });

    return () => unsubscribeAuth(); // Cleanup auth listener
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    const newSlug = newTitle
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
    setSlug(newSlug);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    updateTableOfContents(value);
  };

  const updateTableOfContents = (content: string) => {
    const regex = /<h([1-6])[^>]*>(.*?)<\/h\1>/g;
    const tocItems: TocItem[] = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      const level = match[1];
      const text = match[2];
      const id = `toc-${tocItems.length + 1}`;
      tocItems.push({ level, text, id });
    }

    setToc(tocItems);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadToCloudinary(file);
        setSelectedImage(imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    }
  };

  const handlePublish = async () => {
    if (!currentUser) {
      alert("You must be logged in to publish a blog. Redirecting to login page...");
      router.push("/login");
      return;
    }

    // --- NEW PAYMENT GATE CHECK ---
    if (!canBlog) {
      alert(
        `You've achieved ${currentTierAchievement.charAt(0).toUpperCase() + currentTierAchievement.slice(1)} Tier by content! Please upgrade your subscription to ${currentTierAchievement.charAt(0).toUpperCase() + currentTierAchievement.slice(1)} or higher to publish blogs. You can manage your subscription in the 'Subscription' section.`
      );
      router.push("/subscription"); // Redirect to the subscription page
      return;
    }
    // --- END NEW PAYMENT GATE CHECK ---

    try {
      const blogData = {
        title,
        slug,
        content,
        coverImage: selectedImage,
        url,
        uid: currentUser.uid,
        createdAt: new Date(),
        // Add default views, likes, comments for new blogs (important for statistics)
        views: 0,
        likes: 0,
        comments: 0,
      };

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
    return null;
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
            <div className="py-1">
              <a
                href="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </a>
            </div>
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
        <div className="mt-6 flex flex-col justify-end items-end">
          {!canBlog && (
            <p className="text-red-600 text-sm mb-2 text-right">
              You've achieved **{currentTierAchievement.charAt(0).toUpperCase() + currentTierAchievement.slice(1)} Tier** by content!
              Please **upgrade your subscription** to publish blogs.
            </p>
          )}
          <button
            className={`py-3 px-8 rounded-lg transition duration-300 transform ${
              canBlog
                ? "bg-black text-white hover:bg-gray-800 hover:scale-105"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            onClick={handlePublish}
            disabled={!canBlog} // Disable the button if the user cannot blog
          >
            Publish Blog
          </button>
        </div>
      </main>
    </div>
  );
}