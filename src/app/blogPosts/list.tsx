import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import Head from "next/head";

// Define a type for the blog post
type Post = {
  id: string;
  slug: string;
  title: string;
};

const BlogList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[]; // Type the data as Post[]
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Head>
        <title>Blog Posts | My Blog</title>
        <meta name="description" content="Explore a list of insightful blog posts." />
      </Head>

      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>

      {loading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : posts.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`}>
                <a className="text-lg text-blue-600 hover:underline">{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogList;
