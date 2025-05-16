/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Home, LayoutDashboard, Edit, BookOpen, MessageSquare, Users, PieChart, Settings, Menu, Bell, LogOut } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [recentPosts, setRecentPosts] = useState<{ id: string; title: string; views: number; comments?: number }[]>([]);
  const [latestComments, setLatestComments] = useState<DocumentData[]>([]);

  // Fetch data from Firebase Firestore in real-time
  useEffect(() => {
    const unsubscribePosts = onSnapshot(collection(db, "posts"), (snapshot) => {
      setTotalPosts(snapshot.size);
      setRecentPosts(snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, title: data.title, views: data.views, comments: data.comments };
      }));
    });

    const unsubscribeViews = onSnapshot(collection(db, "views"), (snapshot) => {
      let total = 0;
      snapshot.docs.forEach((doc) => (total += doc.data().count));
      setTotalViews(total);
    });

    const unsubscribeComments = onSnapshot(collection(db, "comments"), (snapshot) => {
      setTotalComments(snapshot.size);
      setLatestComments(snapshot.docs.map((doc) => doc.data()));
    });

    const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      setActiveUsers(snapshot.size);
    });

    return () => {
      unsubscribePosts();
      unsubscribeViews();
      unsubscribeComments();
      unsubscribeUsers();
    };
  }, []);

  // Chart Data
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
    <div className="flex min-h-screen bg-gray-900 text-white">
      
      <div className="w-64 bg-gray-800 p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul>
          <li className="mb-3 flex items-center gap-2"><Home size={18} /> Dashboard</li>
          <li className="mb-3 flex items-center gap-2"><Edit size={18} /> Manage Posts</li>
          <li className="mb-3 flex items-center gap-2"><BookOpen size={18} /> Categories</li>
          <li className="mb-3 flex items-center gap-2"><MessageSquare size={18} /> Comments</li>
          <li className="mb-3 flex items-center gap-2"><Users size={18} /> Users</li>
          <li className="mb-3 flex items-center gap-2"><PieChart size={18} /> Analytics</li>
          <li className="mb-3 flex items-center gap-2"><Settings size={18} /> Settings</li>
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
  );
};

export default Dashboard;
