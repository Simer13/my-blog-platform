// src/app/blogposts/[slug].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query; // Slug from URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (slug) {
      // Fetch the post using the slug (replace with your API call)
      fetch(`/api/posts/${slug}`)
        .then(response => response.json())
        .then(data => setPost(data))
        .catch(error => console.error(error));
    }
  }, [slug]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
