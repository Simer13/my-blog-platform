"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
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
  Bell,
  Menu,
} from "lucide-react";
import Link from "next/link";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [totalPosts, setTotalPosts] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [recentPosts, setRecentPosts] = useState<
    { id: string; title: string; views: number; comments?: number }[]
  >([]);
  const [, setLatestComments] = useState<DocumentData[]>([]);

  // 🔐 Check Authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoadingAuth(false);
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // 🔄 Firestore Subscriptions (only run if authenticated)
  useEffect(() => {
    if (!user) return;

    const userUID = user.uid;

    const postsQuery = query(collection(db, "posts"), where("uid", "==", userUID));
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

    const unsubscribeViews = onSnapshot(collection(db, "views"), (snapshot) => {
      let total = 0;
      snapshot.docs.forEach((doc) => {
        total += doc.data().count;
      });
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
  }, [user]);

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

  if (loadingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p className="text-lg">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-5 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul>
          <li className="mb-3">
            <Link href="/" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <Home size={18} /> Home
            </Link>
          </li>
          <li className="mb-3">
            <Link href="/blogPosts" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <Edit size={18} /> Create Post
            </Link>
          </li>
          <li className="mb-3">
            <Link href="/chat" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <BookOpen size={18} /> Chat
            </Link>
          </li>
          <li className="mb-3">
            <Link href="/subscriptions" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <MessageSquare size={18} /> Subscriptions
            </Link>
          </li>
        </ul>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex gap-4">
            <Bell size={24} />
            <Menu size={24} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard label="Total Posts" value={totalPosts} />
          <StatCard label="Total Views" value={totalViews} />
          <StatCard label="Total Comments" value={totalComments} />
          <StatCard label="Active Users" value={activeUsers} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Post Views" data={viewsChartData} />
          <ChartCard title="Comments per Post" data={commentsChartData} />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
    <h3 className="text-lg">{label}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

import type { ChartData } from "chart.js";

const ChartCard = ({ title, data }: { title: string; data: ChartData<"bar"> }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
    <h3 className="text-lg mb-3">{title}</h3>
    <Bar data={data} />
  </div>
);

export default Dashboard;
