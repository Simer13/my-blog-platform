import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

// Define a type for the blog post
type Post = {
  id: string;
  slug: string;
  title: string;
};

const BlogList = () => {
  const [posts, setPosts] = useState<Post[]>([]); // Use the Post type here

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
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogList;
