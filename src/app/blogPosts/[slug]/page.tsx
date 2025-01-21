"use client";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { db } from "../../../../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore";
import {  ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

interface BlogPost {
  title: string;
  content: string;
  imageUrl?: string;
}

interface Comment {
  id: string;
  message: string;
  createdAt: Date;
  userName: string;
  userProfileImage: string;
}

const BlogPostPage = () => {
  const pathname = usePathname();
  const slug = pathname?.split("/").pop();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const q = query(collection(db, "posts"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.error("Post not found in Firestore!");
          return;
        }

        const postDoc = querySnapshot.docs[0];
        const postData = postDoc.data() as DocumentData;

        if (postData?.title && postData?.content) {
          setPost({
            title: postData.title,
            content: postData.content,
            imageUrl: postData.imageUrl || null,
          });

          const commentsQuery = query(collection(db, `posts/${postDoc.id}/comments`));
          const commentsSnapshot = await getDocs(commentsQuery);

          const commentsList = commentsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date(), 
          })) as Comment[]; 
        
          setComments(commentsList);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !slug) return;

    try {
      const postQuery = query(collection(db, "posts"), where("slug", "==", slug));
      const postSnapshot = await getDocs(postQuery);

      if (postSnapshot.empty) return;

      const postId = postSnapshot.docs[0].id;
      const userName = "User Name"; 
      const userProfileImage = "userProfileImageUrl"; 

      const commentRef = collection(db, `posts/${postId}/comments`);
      await addDoc(commentRef, {
        message: newComment,
        createdAt: serverTimestamp(),
        userName,
        userProfileImage,
      });

      setComments((prev) => [
        ...prev,
        { id: `${Date.now()}`, message: newComment, createdAt: new Date(), userName, userProfileImage },
      ]);

      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!post) {
    return <p className="text-center text-red-500">Blog post not found!</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
      {post.imageUrl && (
  <Image
    src={post.imageUrl.startsWith('http') ? post.imageUrl : `/${post.imageUrl}`}
    alt={post.title || 'Blog Post Image'}
    width={800} // Set a width that fits your layout
    height={600} // Set a height that fits your layout
    className="rounded-lg mb-6"
  />
)}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <div
  className="prose prose-lg max-w-none text-gray-700 mb-8"
  dangerouslySetInnerHTML={{ __html: post.content }}
/>

        <div className="flex space-x-4 mb-8">
          {/* Social Media Share Buttons */}
          <a
            href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800"
          >
            Facebook
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 text-white bg-blue-900 rounded-lg hover:bg-blue-950"
          >
            LinkedIn
          </a>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <ChatBubbleLeftRightIcon className="w-6 h-6 mr-2" />
            Comments
          </h2>
          <div className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your thoughts here..."
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleAddComment}
              className="mt-2 px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
            >
              Post Comment
            </button>
          </div>

          {comments.length > 0 ? (
            <ul className="space-y-4">
              {comments.map((comment) => (
                <li key={comment.id} className="p-4 bg-gray-100 rounded-lg flex space-x-4">
                  <Image
    src={comment.userProfileImage.startsWith('http') ? comment.userProfileImage : `/${comment.userProfileImage}`}
    alt={comment.userName}
    width={800} // Set a width that fits your layout
    height={600} // Set a height that fits your layout
    className="w-10 h-10 rounded-full"
  />
                  
                  <div>
                    <p className="text-gray-700">{comment.message}</p>
                    <small className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
