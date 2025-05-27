// Import necessary Firebase modules
"use client"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { db } from '../../../firebase/firebase'; // Assuming your firebase.js is here

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Lock, Trophy, Crown, Diamond, Star, Users, ThumbsUp, MessageSquare } from "lucide-react";

export default function SubscriptionPage() {
  // State for real user data
  // Removed unused currentUid state
  const [blogsWritten, setBlogsWritten] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [currentTierAchievement, setCurrentTierAchievement] = useState("basic"); // Tier achieved by content
  const [userPaidSubscription, setUserPaidSubscription] = useState<string | null>(null); // Tier user is currently paying for (e.g., "gold", "none")

  // Define tier requirements for content achievement
  const tierRequirements = {
    basic: { blogs: 0, views: 0, likes: 0, comments: 0 },
    silver: { blogs: 10, views: 1000, likes: 50, comments: 50 }, // Silver requirements corrected: just blogs OR views
    gold: { blogs: 25, views: 5000, likes: 300, comments: 0 },
    platinum: { blogs: 50, views: 15000, likes: 1000, comments: 250 },
    diamond: { blogs: 100, views: 50000, likes: 5000, comments: 1000 },
  };

  // Helper function to get the index of a tier name in the tiersOrder array
  const getTierIndex = (tierName: string) => {
    const tiersOrder = ["basic", "silver", "gold", "platinum", "diamond"];
    const index = tiersOrder.indexOf(tierName.toLowerCase());
    return index !== -1 ? index : -1; // Return -1 if not found (e.g., "none" for userPaidSubscription)
  };

  // Helper function to determine the highest tier achieved by content stats
  const determineContentAchievementTier = (
    numBlogs: number,
    numViews: number,
    numLikes: number,
    numComments: number
  ) => {
    let tier = "basic";

    if (
      (numBlogs >= tierRequirements.diamond.blogs) ||
      (numViews >= tierRequirements.diamond.views &&
        numLikes >= tierRequirements.diamond.likes &&
        numComments >= tierRequirements.diamond.comments)
    ) {
      tier = "diamond";
    } else if (
      (numBlogs >= tierRequirements.platinum.blogs) ||
      (numViews >= tierRequirements.platinum.views &&
        numLikes >= tierRequirements.platinum.likes &&
        numComments >= tierRequirements.platinum.comments)
    ) {
      tier = "platinum";
    } else if (
      (numBlogs >= tierRequirements.gold.blogs) ||
      (numViews >= tierRequirements.gold.views &&
        numLikes >= tierRequirements.gold.likes &&
        numComments >= tierRequirements.gold.comments)
    ) {
      tier = "gold";
    } else if (
      (numBlogs >= tierRequirements.silver.blogs) ||
      (numViews >= tierRequirements.silver.views)
    ) {
      tier = "silver";
    }

    return tier;
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // setCurrentUid(user.uid); // Removed unused currentUid

        // Listener for user's posts data (for content achievement)
        const postsQuery = query(
          collection(db, "posts"),
          where("uid", "==", user.uid)
        );

        const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
          const currentBlogs = snapshot.size;
          let currentViews = 0;
          let currentLikes = 0;
          let currentComments = 0;

          snapshot.docs.forEach((postDoc) => {
            const data = postDoc.data();
            currentViews += data.views || 0;
            currentLikes += data.likes || 0; // Assuming 'likes' field exists on post document
            currentComments += data.comments || 0; // Assuming 'comments' field exists on post document
          });

          setBlogsWritten(currentBlogs);
          setTotalViews(currentViews);
          setTotalLikes(currentLikes);
          setTotalComments(currentComments);

          // Update the current tier based on fetched data
          setCurrentTierAchievement(determineContentAchievementTier(currentBlogs, currentViews, currentLikes, currentComments));
        });

        // Listener for user's subscription status from their user document
        // Assuming you have a 'users' collection and each user has a doc with their UID
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeUserDoc = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                // Assuming 'currentSubscriptionPlan' field holds the tier they are paying for
                // e.g., "basic", "silver", "gold", "platinum", "diamond", or "none"
                setUserPaidSubscription(userData.currentSubscriptionPlan || "none");
            } else {
                setUserPaidSubscription("none"); // User document not found, treat as no paid subscription
            }
        });


        // Clean up listeners when component unmounts or user changes
        return () => {
            unsubscribePosts();
            unsubscribeUserDoc();
        };
      } else {
        // setCurrentUid(null); // Removed unused currentUid
        setBlogsWritten(0);
        setTotalViews(0);
        setTotalLikes(0);
        setTotalComments(0);
        setCurrentTierAchievement("basic");
        setUserPaidSubscription("none"); // Reset if no user is logged in
      }
    });

    // Clean up auth listener
    return () => unsubscribeAuth();
  }, ); // Empty dependency array means this runs once on mount

  // Determine if the user is restricted from blogging based on the new logic
  const isBloggingRestricted = !(
    (currentTierAchievement === "basic") || // Always allow if they are only basic by content
    (getTierIndex(userPaidSubscription || "none") >= getTierIndex(currentTierAchievement)) // Or if they are paying for their achieved tier or higher
  );

  // Determine the current effective tier the user is "on" for display purposes
  // This considers both achievement and payment.
  // It's the highest tier that is currently UNLOCKED for them, either by achievement or by payment.
  let effectiveCurrentTier = "basic";
  const tiersOrder = ["basic", "silver", "gold", "platinum", "diamond"];

  for (let i = tiersOrder.length - 1; i >= 0; i--) {
      const tierName = tiersOrder[i];
      if (getTierIndex(tierName) <= getTierIndex(currentTierAchievement) || getTierIndex(tierName) <= getTierIndex(userPaidSubscription || "none")) {
          effectiveCurrentTier = tierName;
          break;
      }
  }


  // This `userData` object combines actual states for UI rendering
  const userData = {
    currentTier: effectiveCurrentTier, // This is the tier displayed as "Current"
    blogsWritten: blogsWritten,
    totalViews: totalViews,
    totalLikes: totalLikes,
    totalComments: totalComments,
    // Progress is based on the *next* tier from the *content achievement* perspective
    progress: {
      blogs: {
        current: blogsWritten,
        next: tierRequirements[getNextTier(currentTierAchievement) as keyof typeof tierRequirements]?.blogs || 0
      },
      views: {
        current: totalViews,
        next: tierRequirements[getNextTier(currentTierAchievement) as keyof typeof tierRequirements]?.views || 0
      },
      likes: {
        current: totalLikes,
        next: tierRequirements[getNextTier(currentTierAchievement) as keyof typeof tierRequirements]?.likes || 0
      },
      comments: {
        current: totalComments,
        next: tierRequirements[getNextTier(currentTierAchievement) as keyof typeof tierRequirements]?.comments || 0
      },
    },
  };

  // Define tiers data including 'unlocked' logic considering both achievement and payment
  const tiers = [
    {
      name: "Basic",
      icon: <Star className="h-6 w-6" />,
      color: "bg-slate-200",
      textColor: "text-slate-700",
      requirements: "Start your blogging journey",
      benefits: ["Access to basic blogging tools", "Standard analytics", "Community support"],
      price: "Free",
      unlocked: true, // Basic is always unlocked
    },
    {
      name: "Silver",
      icon: <Trophy className="h-6 w-6" />,
      color: "bg-gradient-to-r from-slate-300 to-slate-400",
      textColor: "text-slate-700",
      requirements: "Write 10 blogs OR 1,000 views",
      benefits: ["Custom blog themes", "Enhanced analytics", "Comment moderation tools", "Monthly webinar access"],
      price: "$2.99/month",
      unlocked:
        getTierIndex("silver") <= getTierIndex(currentTierAchievement) || // Achieved by content
        getTierIndex("silver") <= getTierIndex(userPaidSubscription || "none"), // Unlocked by payment
    },
    {
      name: "Gold",
      icon: <Crown className="h-6 w-6" />,
      color: "bg-gradient-to-r from-yellow-300 to-amber-400",
      textColor: "text-amber-900",
      requirements: "Write 25 blogs OR 5,000 views AND 300 likes",
      benefits: [
        "Priority support",
        "Monetization tools",
        "Featured on homepage",
        "Access to exclusive events",
        "Ad-free experience",
      ],
      price: "$5.99/month",
      unlocked:
        getTierIndex("gold") <= getTierIndex(currentTierAchievement) ||
        getTierIndex("gold") <= getTierIndex(userPaidSubscription || "none"),
    },
    {
      name: "Platinum",
      icon: <Diamond className="h-6 w-6 text-slate-100" />,
      color: "bg-gradient-to-r from-slate-500 to-slate-700",
      textColor: "text-white",
      requirements: "Write 50 blogs OR 15,000 views AND 1,000 likes AND 250 comments",
      benefits: [
        "Personalized coaching",
        "Early access to new features",
        "Custom domain",
        "Analytics API access",
        "Co-marketing opportunities",
      ],
      price: "$12.99/month",
      unlocked:
        getTierIndex("platinum") <= getTierIndex(currentTierAchievement) ||
        getTierIndex("platinum") <= getTierIndex(userPaidSubscription || "none"),
    },
    {
      name: "Diamond",
      icon: <Diamond className="h-6 w-6" />,
      color: "bg-gradient-to-r from-cyan-300 to-blue-500",
      textColor: "text-white",
      requirements: "Write 100 blogs OR 50,000 views AND 5,000 likes AND 1,000 comments",
      benefits: [
        "Revenue sharing",
        "Dedicated account manager",
        "Collaboration opportunities",
        "Speaking engagements",
        "Exclusive networking events",
        "Custom feature development",
      ],
      price: "$24.99/month",
      unlocked:
        getTierIndex("diamond") <= getTierIndex(currentTierAchievement) ||
        getTierIndex("diamond") <= getTierIndex(userPaidSubscription || "none"),
    },
  ];

  // Helper function to determine the next tier for progress (based on content achievement)
  function getNextTier(currentTierName: string): string {
    const tiersOrder = ["basic", "silver", "gold", "platinum", "diamond"];
    const currentIndex = tiersOrder.findIndex((t) => t === currentTierName);

    if (currentIndex === -1 || currentIndex === tiersOrder.length - 1) {
      return ""; // No next tier
    }
    return tiersOrder[currentIndex + 1];
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Unlock Your Blogging Potential</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Level up your blogging journey with our tiered subscription system. Write more, engage more, and unlock
            exclusive perks.
          </p>
        </div>

        {/* Current Status */}
        <div className="mb-12 bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">Your Current Level</h2>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <Badge
                  className={`${tiers.find((t) => t.name.toLowerCase() === userData.currentTier)?.color} ${tiers.find((t) => t.name.toLowerCase() === userData.currentTier)?.textColor} px-3 py-1 text-sm font-medium rounded-full`}
                >
                  {tiers.find((t) => t.name.toLowerCase() === userData.currentTier)?.icon}
                  <span className="ml-1">
                    {userData.currentTier.charAt(0).toUpperCase() + userData.currentTier.slice(1)}
                  </span>
                </Badge>
                <span className="text-slate-500">Blogger</span>
              </div>
              <p className="text-slate-600">
                {isBloggingRestricted
                    ? `You've achieved ${currentTierAchievement.charAt(0).toUpperCase() + currentTierAchievement.slice(1)} Tier! Please subscribe to the ${currentTierAchievement.charAt(0).toUpperCase() + currentTierAchievement.slice(1)} plan or higher to continue blogging.`
                    : "Keep writing and engaging to unlock more benefits!"}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-slate-800">{userData.blogsWritten}</div>
                <div className="text-sm text-slate-500">Blogs</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-slate-800">{userData.totalViews.toLocaleString()}</div>
                <div className="text-sm text-slate-500">Views</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-slate-800">{userData.totalLikes}</div>
                <div className="text-sm text-slate-500">Likes</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-slate-800">{userData.totalComments}</div>
                <div className="text-sm text-slate-500">Comments</div>
              </div>
            </div>
          </div>

          {/* Progress to next level */}
          {!isBloggingRestricted && userData.currentTier !== "diamond" && ( // Hide if restricted or already Diamond
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">
                Progress to{" "}
                {getNextTier(currentTierAchievement).charAt(0).toUpperCase() + getNextTier(currentTierAchievement).slice(1)}
              </h3>
              <div className="space-y-4">
                {userData.progress.blogs.next > 0 && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium flex items-center">
                        <span className="mr-2">Blogs Written</span>
                      </span>
                      <span className="text-sm font-medium">
                        {userData.progress.blogs.current}/{userData.progress.blogs.next}
                      </span>
                    </div>
                    <Progress
                      value={(userData.progress.blogs.current / userData.progress.blogs.next) * 100}
                      className="h-2"
                    />
                  </div>
                )}

                {userData.progress.views.next > 0 && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium flex items-center">
                        <Users className="h-4 w-4 mr-1" /> <span>Views</span>
                      </span>
                      <span className="text-sm font-medium">
                        {userData.progress.views.current.toLocaleString()}/{userData.progress.views.next.toLocaleString()}
                      </span>
                    </div>
                    <Progress
                      value={(userData.progress.views.current / userData.progress.views.next) * 100}
                      className="h-2"
                    />
                  </div>
                )}

                {userData.progress.likes.next > 0 && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" /> <span>Likes</span>
                      </span>
                      <span className="text-sm font-medium">
                        {userData.progress.likes.current}/{userData.progress.likes.next}
                      </span>
                    </div>
                    <Progress
                      value={(userData.progress.likes.current / userData.progress.likes.next) * 100}
                      className="h-2"
                    />
                  </div>
                )}

                {userData.progress.comments.next > 0 && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" /> <span>Comments</span>
                      </span>
                      <span className="text-sm font-medium">
                        {userData.progress.comments.current}/{userData.progress.comments.next}
                      </span>
                    </div>
                    <Progress
                      value={(userData.progress.comments.current / userData.progress.comments.next) * 100}
                      className="h-2"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Subscription Tiers */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Subscription Tiers</h2>
          <Tabs defaultValue="cards" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="cards">Card View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>

            <TabsContent value="cards" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tiers.slice(0, 3).map((tier) => (
                  <Card
                    key={tier.name}
                    className={`overflow-hidden border-2 ${tier.name.toLowerCase() === userData.currentTier ? "border-primary" : "border-transparent"} transition-all hover:shadow-lg`}
                  >
                    <CardHeader className={`${tier.color} ${tier.textColor}`}>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center text-xl font-bold">
                          {tier.icon}
                          <span className="ml-2">{tier.name}</span>
                        </CardTitle>
                        {tier.name.toLowerCase() === userData.currentTier && (
                          <Badge variant="outline" className="bg-white/20 text-white">
                            Current
                          </Badge>
                        )}
                      </div>
                      <CardDescription className={`${tier.textColor} opacity-90`}>{tier.requirements}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold mb-4">{tier.price}</div>
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={
                            tier.name.toLowerCase() === userData.currentTier && !isBloggingRestricted
                            ? "default" // Highlight current effective tier if not restricted
                            : "outline"
                        }
                        disabled={
                            tier.name.toLowerCase() === userData.currentTier || // Is the CURRENT effective tier
                            getTierIndex(tier.name) > getTierIndex(currentTierAchievement) || // Cannot unlock future tiers by content
                            (isBloggingRestricted && getTierIndex(tier.name) < getTierIndex(currentTierAchievement)) // Restricted & this is an already achieved tier
                        }
                      >
                        {isBloggingRestricted && getTierIndex(tier.name) === getTierIndex(currentTierAchievement) ? (
                            // This is the tier they achieved and are restricted from
                            "Subscribe to Continue"
                        ) : isBloggingRestricted && getTierIndex(tier.name) < getTierIndex(currentTierAchievement) ? (
                            // This is a tier below their achievement but they are restricted
                            "Achieved (Blocked)"
                        ) : tier.name.toLowerCase() === userData.currentTier ? (
                            "Current Tier"
                        ) : tier.unlocked ? (
                            "Switch to This Tier" // Or "Subscribe"
                        ) : (
                            <span className="flex items-center">
                            <Lock className="h-4 w-4 mr-2" />
                            {getTierIndex(tier.name) > getTierIndex(currentTierAchievement) ? "Locked" : "Unlock Tier"}
                            </span>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {tiers.slice(3).map((tier) => (
                  <Card
                    key={tier.name}
                    className={`overflow-hidden border-2 ${tier.name.toLowerCase() === userData.currentTier ? "border-primary" : "border-transparent"} transition-all hover:shadow-lg`}
                  >
                    <CardHeader className={`${tier.color} ${tier.textColor}`}>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center text-xl font-bold">
                          {tier.icon}
                          <span className="ml-2">{tier.name}</span>
                        </CardTitle>
                        {tier.name.toLowerCase() === userData.currentTier && (
                          <Badge variant="outline" className="bg-white/20 text-white">
                            Current
                          </Badge>
                        )}
                      </div>
                      <CardDescription className={`${tier.textColor} opacity-90`}>{tier.requirements}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold mb-4">{tier.price}</div>
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={
                            tier.name.toLowerCase() === userData.currentTier && !isBloggingRestricted
                            ? "default"
                            : "outline"
                        }
                        disabled={
                            tier.name.toLowerCase() === userData.currentTier ||
                            getTierIndex(tier.name) > getTierIndex(currentTierAchievement) ||
                            (isBloggingRestricted && getTierIndex(tier.name) < getTierIndex(currentTierAchievement))
                        }
                      >
                        {isBloggingRestricted && getTierIndex(tier.name) === getTierIndex(currentTierAchievement) ? (
                            "Subscribe to Continue"
                        ) : isBloggingRestricted && getTierIndex(tier.name) < getTierIndex(currentTierAchievement) ? (
                            "Achieved (Blocked)"
                        ) : tier.name.toLowerCase() === userData.currentTier ? (
                            "Current Tier"
                        ) : tier.unlocked ? (
                            "Switch to This Tier"
                        ) : (
                            <span className="flex items-center">
                            <Lock className="h-4 w-4 mr-2" />
                            {getTierIndex(tier.name) > getTierIndex(currentTierAchievement) ? "Locked" : "Unlock Tier"}
                            </span>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="table" className="overflow-x-auto">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Tier</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Requirements</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Benefits</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {tiers.map((tier) => (
                      <tr
                        key={tier.name}
                        className={tier.name.toLowerCase() === userData.currentTier ? "bg-primary/5" : ""}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-full ${tier.color} mr-3`}>{tier.icon}</div>
                            <span className="font-medium">{tier.name}</span>
                            {tier.name.toLowerCase() === userData.currentTier && (
                              <Badge className="ml-2">Current</Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">{tier.requirements}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          <ul className="list-disc pl-5 space-y-1">
                            {tier.benefits.slice(0, 3).map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                            {tier.benefits.length > 3 && <li>+ {tier.benefits.length - 3} more benefits</li>}
                          </ul>
                        </td>
                        <td className="px-6 py-4 font-medium">{tier.price}</td>
                        <td className="px-6 py-4">
                          <Button
                            size="sm"
                            variant={
                                tier.name.toLowerCase() === userData.currentTier && !isBloggingRestricted
                                ? "default"
                                : "outline"
                            }
                            disabled={
                                tier.name.toLowerCase() === userData.currentTier ||
                                getTierIndex(tier.name) > getTierIndex(currentTierAchievement) ||
                                (isBloggingRestricted && getTierIndex(tier.name) < getTierIndex(currentTierAchievement))
                            }
                          >
                            {isBloggingRestricted && getTierIndex(tier.name) === getTierIndex(currentTierAchievement) ? (
                                "Subscribe to Continue"
                            ) : isBloggingRestricted && getTierIndex(tier.name) < getTierIndex(currentTierAchievement) ? (
                                "Achieved (Blocked)"
                            ) : tier.name.toLowerCase() === userData.currentTier ? (
                                "Current"
                            ) : tier.unlocked ? (
                                "Switch"
                            ) : (
                                <span className="flex items-center">
                                <Lock className="h-4 w-4 mr-1" />
                                {getTierIndex(tier.name) > getTierIndex(currentTierAchievement) ? "Locked" : "Unlock"}
                                </span>
                            )}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold mb-2">How do I level up my subscription?</h3>
              <p className="text-slate-600">
                You can level up by meeting the content requirements (blogs, views, likes, comments) or by paying the
                subscription fee to instantly unlock the next tier.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold mb-2">Can I downgrade my subscription?</h3>
              <p className="text-slate-600">
                Yes, you can downgrade to a lower tier at any time. Your benefits will adjust accordingly at the start
                of your next billing cycle.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold mb-2">Do my achievements carry over if I cancel?</h3>
              <p className="text-slate-600">
                Your content metrics (blogs, views, likes, comments) will remain in our system for 90 days if you
                cancel. If you resubscribe within that period, your progress will be restored.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

