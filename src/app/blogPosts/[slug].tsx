"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { db } from "../../../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

interface BlogPost {
  title: string;
  content: string;
  imageUrl?: string | null;
}

interface Comment {
  id: string;
  message: string;
  createdAt: import("firebase/firestore").Timestamp | Date;
  userName: string;
  userProfileImage: string;
}

interface TableOfContentsItem {
  level: string;
  text: string;
  id: string;
}

const BlogPostPage = () => {
  const pathname = usePathname();
  const slug = pathname?.split("/").pop();

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        // Query posts collection where slug matches
        const postsQuery = query(collection(db, "posts"), where("slug", "==", slug));
        const querySnapshot = await getDocs(postsQuery);

        if (querySnapshot.empty) {
          console.error("Post not found!");
          setPost(null);
          setLoading(false);
          return;
        }

        const postDoc = querySnapshot.docs[0];
        const postData = postDoc.data() as DocumentData;

        setPost({
          title: postData.title,
          content: postData.content,
          imageUrl: postData.imageUrl || null,
        });

        // Extract Table of Contents from post content
        const headingRegex = /<(h[2-3])[^>]*>(.*?)<\/\1>/g;
        const headings: TableOfContentsItem[] = [];
        let match;
        while ((match = headingRegex.exec(postData.content))) {
          const level = match[1];
          const text = match[2];
          const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
          headings.push({ level, text, id });
        }
        setTableOfContents(headings);

        // Fetch comments for this post
        const commentsQuery = query(collection(db, `posts/${postDoc.id}/comments`));
        const commentsSnapshot = await getDocs(commentsQuery);
        const commentsList = commentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Comment[];
        setComments(commentsList);
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
      const postsQuery = query(collection(db, "posts"), where("slug", "==", slug));
      const postSnapshot = await getDocs(postsQuery);

      if (postSnapshot.empty) return;

      const postId = postSnapshot.docs[0].id;

      const userName = currentUser?.displayName || "Anonymous";
      const userProfileImage = currentUser?.photoURL || "/default-profile.png";

      const commentRef = collection(db, `posts/${postId}/comments`);
      await addDoc(commentRef, {
        message: newComment,
        createdAt: serverTimestamp(),
        userName,
        userProfileImage,
      });

      setComments((prev) => [
        ...prev,
        {
          id: `${Date.now()}`, // Temporary ID, server will generate a real one
          message: newComment,
          createdAt: new Date(),
          userName,
          userProfileImage,
        },
      ]);

      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (!post) return <p className="text-center text-red-500">Blog post not found!</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row">
        {/* Table of Contents */}
        <aside className="md:w-1/4 mb-6 md:mb-0 md:pr-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Table of Contents</h2>
          <ul className="space-y-2">
            {tableOfContents.map((item, index) => (
              <li key={index}>
                <a href={`#${item.id}`} className="text-gray-600 hover:underline">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="md:w-3/4">
          {post.imageUrl && (
            <Image
              src={post.imageUrl}
              alt={post.title || "Blog Image"}
              width={800}
              height={500}
              className="rounded-lg mb-6 object-cover"
            />
          )}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <div
            className="prose prose-lg max-w-none text-gray-700 mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Buttons */}
          <div className="flex space-x-4 mb-8">
            <a
              href={`https://twitter.com/intent/tweet?url=${typeof window !== "undefined" ? window.location.href : ""}&text=${post.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== "undefined" ? window.location.href : ""}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-white bg-blue-700 rounded hover:bg-blue-800"
            >
              Facebook
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${typeof window !== "undefined" ? window.location.href : ""}&title=${post.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-white bg-blue-900 rounded hover:bg-blue-950"
            >
              LinkedIn
            </a>
          </div>

          {/* Comments Section */}
          <section className="border-t pt-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <ChatBubbleLeftRightIcon className="w-6 h-6 mr-2" />
              Comments
            </h2>

            {/* Add Comment */}
            <div className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your thoughts here..."
                className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleAddComment}
                className="mt-2 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
              >
                Post Comment
              </button>
            </div>

            {/* List of Comments */}
            {comments.length > 0 ? (
              <ul className="space-y-4">
                {comments.map((comment) => (
                  <li key={comment.id} className="p-4 bg-gray-100 rounded flex space-x-4">
                    <Image
                      src={comment.userProfileImage}
                      alt={comment.userName}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-gray-700">{comment.message}</p>
                      <small className="text-sm text-gray-500">
                        {new Date(
                          comment.createdAt instanceof Date
                            ? comment.createdAt
                            : comment.createdAt.toDate()
                        ).toLocaleString()}
                      </small>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default BlogPostPage;
