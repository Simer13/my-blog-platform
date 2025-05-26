import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Lock, Trophy, Crown, Diamond, Star, Users, ThumbsUp, MessageSquare } from "lucide-react"

export default function SubscriptionPage() {
  // Mock user data - in a real app, this would come from your database
  const userData = {
    currentTier: "silver",
    blogsWritten: 12,
    totalViews: 2500,
    totalLikes: 180,
    totalComments: 45,
    progress: {
      blogs: { current: 12, next: 25 },
      views: { current: 2500, next: 5000 },
      likes: { current: 180, next: 300 },
      comments: { current: 45, next: 100 },
    },
  }

  const tiers = [
    {
      name: "Basic",
      icon: <Star className="h-6 w-6" />,
      color: "bg-slate-200",
      textColor: "text-slate-700",
      requirements: "Start your blogging journey",
      benefits: ["Access to basic blogging tools", "Standard analytics", "Community support"],
      price: "Free",
      unlocked: true,
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
        userData.currentTier === "silver" ||
        userData.currentTier === "gold" ||
        userData.currentTier === "platinum" ||
        userData.currentTier === "diamond",
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
        userData.currentTier === "gold" || userData.currentTier === "platinum" || userData.currentTier === "diamond",
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
      unlocked: userData.currentTier === "platinum" || userData.currentTier === "diamond",
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
      unlocked: userData.currentTier === "diamond",
    },
  ]

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
              <p className="text-slate-600">Keep writing and engaging to unlock more benefits!</p>
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
          {userData.currentTier !== "diamond" && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">
                Progress to{" "}
                {userData.currentTier === "basic"
                  ? "Silver"
                  : userData.currentTier === "silver"
                    ? "Gold"
                    : userData.currentTier === "gold"
                      ? "Platinum"
                      : "Diamond"}
              </h3>
              <div className="space-y-4">
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
                        variant={tier.unlocked ? "outline" : "default"}
                        disabled={!tier.unlocked && tier.name.toLowerCase() !== getNextTier(userData.currentTier)}
                      >
                        {tier.unlocked ? (
                          tier.name.toLowerCase() === userData.currentTier ? (
                            "Current Tier"
                          ) : (
                            "Switch to This Tier"
                          )
                        ) : (
                          <span className="flex items-center">
                            <Lock className="h-4 w-4 mr-2" />
                            {tier.name.toLowerCase() === getNextTier(userData.currentTier) ? "Unlock Tier" : "Locked"}
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
                        variant={tier.unlocked ? "outline" : "default"}
                        disabled={!tier.unlocked && tier.name.toLowerCase() !== getNextTier(userData.currentTier)}
                      >
                        {tier.unlocked ? (
                          tier.name.toLowerCase() === userData.currentTier ? (
                            "Current Tier"
                          ) : (
                            "Switch to This Tier"
                          )
                        ) : (
                          <span className="flex items-center">
                            <Lock className="h-4 w-4 mr-2" />
                            {tier.name.toLowerCase() === getNextTier(userData.currentTier) ? "Unlock Tier" : "Locked"}
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
                            variant={tier.unlocked ? "outline" : "default"}
                            disabled={!tier.unlocked && tier.name.toLowerCase() !== getNextTier(userData.currentTier)}
                          >
                            {tier.unlocked ? (
                              tier.name.toLowerCase() === userData.currentTier ? (
                                "Current"
                              ) : (
                                "Switch"
                              )
                            ) : (
                              <span className="flex items-center">
                                <Lock className="h-4 w-4 mr-1" />
                                {tier.name.toLowerCase() === getNextTier(userData.currentTier) ? "Unlock" : "Locked"}
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
  )
}

// Helper function to determine the next tier
function getNextTier(currentTier: string): string {
  const tiers = ["basic", "silver", "gold", "platinum", "diamond"]
  const currentIndex = tiers.findIndex((t) => t === currentTier)

  if (currentIndex === -1 || currentIndex === tiers.length - 1) {
    return ""
  }

  return tiers[currentIndex + 1]
}
