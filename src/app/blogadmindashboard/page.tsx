/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Home,
  Edit,
  BookOpen,
  MessageSquare,
  Users,
  PieChart,
  Settings,
  Menu,
  Bell,
} from "lucide-react";
import { BrowserRouter as Router, Link } from "react-router-dom"; // Import Link and Router

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [recentPosts, setRecentPosts] = useState<
    { id: string; title: string; views: number; comments?: number }[]
  >([]);
  const [latestComments, setLatestComments] = useState<DocumentData[]>([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      const userUID = user.uid;

      // Filter posts only for the current user
      const postsQuery = query(
        collection(db, "posts"),
        where("uid", "==", userUID)
      );

      const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
        setTotalPosts(snapshot.size);
        setRecentPosts(
          snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title,
              views: data.views,
              comments: data.comments,
            };
          })
        );
      });

      // Optional: Filter views if needed, otherwise keep global
      const unsubscribeViews = onSnapshot(collection(db, "views"), (snapshot) => {
        let total = 0;
        snapshot.docs.forEach((doc) => {
          total += doc.data().count;
        });
        setTotalViews(total);
      });

      // Optional: Filter comments for user if needed
      const unsubscribeComments = onSnapshot(
        collection(db, "comments"),
        (snapshot) => {
          setTotalComments(snapshot.size);
          setLatestComments(snapshot.docs.map((doc) => doc.data()));
        }
      );

      const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
        setActiveUsers(snapshot.size);
      });

      return () => {
        unsubscribePosts();
        unsubscribeViews();
        unsubscribeComments();
        unsubscribeUsers();
      };
    });

    return () => unsubscribeAuth();
  }, []);

  const viewsChartData = {
    labels: recentPosts.map((post) => post.title),
    datasets: [
      {
        label: "Views",
        data: recentPosts.map((post) => post.views),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const commentsChartData = {
    labels: recentPosts.map((post) => post.title),
    datasets: [
      {
        label: "Comments",
        data: recentPosts.map((post) => post.comments || 0),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Router> {/* Wrap your component with Router */}
      <div className="flex min-h-screen bg-gray-900 text-white">
        <div className="w-64 bg-gray-800 p-5">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <ul>
            {/* Use Link component for navigation */}
            <li className="mb-3">
              <Link to="/" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Home size={18} /> Home
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/blogPosts" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Edit size={18} /> Create Post
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/delete" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <BookOpen size={18} /> Categories
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/subscriptions" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <MessageSquare size={18} /> Subscriptions
              </Link>
            </li>
    
          </ul>
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex gap-4">
              <Bell size={24} />
              <Menu size={24} />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg">Total Posts</h3>
              <p className="text-2xl font-bold">{totalPosts}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg">Total Views</h3>
              <p className="text-2xl font-bold">{totalViews}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg">Total Comments</h3>
              <p className="text-2xl font-bold">{totalComments}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg">Active Users</h3>
              <p className="text-2xl font-bold">{activeUsers}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg mb-3">Post Views</h3>
              <Bar data={viewsChartData} />
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg mb-3">Comments per Post</h3>
            <Bar data={commentsChartData} />
          </div>
        </div>
      </div>
    </div>
    </Router>
  );
};

export default Dashboard;