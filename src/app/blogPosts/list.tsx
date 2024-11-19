// src/app/blogposts/list.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch blog posts (replace with your API call)
    fetch('/api/posts') // Example API endpoint
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>All Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        <ul>
          {posts.map((post: { title: string, slug: string }) => (
            <li key={post.slug}>
              <Link href={`/blogposts/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
