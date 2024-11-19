import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Post = {
  title: string;
  content: string;
};

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query; 
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (slug) {
    
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
