import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";

type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
};

const PostPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const postRef = doc(db, "posts", slug as string);
        const docSnap = await getDoc(postRef);

        if (docSnap.exists()) {
          setPost(docSnap.data() as Post);
        } else {
          setError("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("An error occurred while fetching the post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!post) {
    return <p className="text-gray-500">No post data available.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Head>
        <title>{post.title} | Blog</title>
        <meta name="description" content={post.content.slice(0, 150)} />
      </Head>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div
  className="prose prose-lg max-w-none text-gray-700 mb-8"
  dangerouslySetInnerHTML={{ __html: post.content }}
/>
    </div>
  );
};

export default PostPage;
