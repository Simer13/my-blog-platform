import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

type Post = {
  id: string;
  slug: string;
  title: string;
  content: string; // Adding content to match the post data
};

const PostPage = () => {
  const router = useRouter();
  const { slug } = router.query; // Getting slug from URL
  const [post, setPost] = useState<Post | null>(null); // State to hold post data

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const postRef = doc(db, "posts", slug as string); // Using slug to fetch the post
        const docSnap = await getDoc(postRef);
        if (docSnap.exists()) {
          setPost(docSnap.data() as Post); // Set post data
        } else {
          console.log("No such post!");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [slug]);

  if (!post) {
    return <p>Loading...</p>; // Show loading while data is being fetched
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p> {/* Display the content of the post */}
    </div>
  );
};

export default PostPage;
