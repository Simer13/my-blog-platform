'use client'

import { useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement,
  LineElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js'
import { Bell, BookOpen, Edit, Eye, Home, LayoutDashboard, LogOut, Menu, MessageSquare, PieChart, Settings, ThumbsUp, Users } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function BlogAdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const viewsChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Views',
        data: [1200, 1900, 3000, 5000, 4200, 3300],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  const commentsChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Comments',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center h-20 border-b">
          <h1 className="text-xl font-bold text-gray-800">Blog Admin</h1>
        </div>
        <nav className="mt-6">
          <div className="px-4 py-2">
            <Input type="search" placeholder="Search..." className="w-full" />
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)] px-3">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Edit className="mr-2 h-4 w-4" />
                New Post
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                All Posts
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Comments
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Users
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <PieChart className="mr-2 h-4 w-4" />
                Analytics
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </ScrollArea>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
            <h2 className="text-xl font-semibold text-gray-800 ml-2">Blog Overview</h2>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="@johndoe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,209</div>
                  <p className="text-xs text-muted-foreground">+20 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,350,123</div>
                  <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,234</div>
                  <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">573</div>
                  <p className="text-xs text-muted-foreground">+201 since last week</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 mb-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Views Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <Bar data={viewsChartData} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Comments Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <Line data={commentsChartData} />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
                <CardDescription>You published 12 posts this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left font-medium p-4">Post</th>
                        <th className="text-left font-medium p-4">Views</th>
                        <th className="text-left font-medium p-4">Comments</th>
                        <th className="text-left font-medium p-4">Likes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(10)].map((_, i) => (
                        <tr key={i} className="border-t">
                          <td className="p-4">
                            <div className="flex items-center">
                              <Avatar className="h-9 w-9">
                                <AvatarImage src={`https://source.unsplash.com/100x100/?blog,${i}`} alt={`Blog post ${i + 1}`} />
                                <AvatarFallback>BP</AvatarFallback>
                              </Avatar>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">How to Master Blogging in 2024</p>
                                <p className="text-sm text-gray-500">Published on {new Date().toLocaleDateString()}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{Math.floor(Math.random() * 10000)}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{Math.floor(Math.random() * 100)}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center">
                              <ThumbsUp className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{Math.floor(Math.random() * 1000)}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ScrollArea>
              </CardContent>
            </Card>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Latest Comments</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="recent" className="w-full">
                    <TabsList>
                      <TabsTrigger value="recent">Recent</TabsTrigger>
                      <TabsTrigger value="popular">Popular</TabsTrigger>
                      <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                    </TabsList>
                    <TabsContent value="recent">
                      <ScrollArea className="h-[300px]">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="flex items-start space-x-4 py-4">
                            <Avatar>
                              <AvatarImage src={`https://source.unsplash.com/100x100/?portrait,${i}`} />
                              <AvatarFallback>U{i}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">User {i + 1}</p>
                              <p className="text-sm text-muted-foreground">
                                Great article! I learned a lot from this. Keep up the good work!
                              </p>
                              <div className="flex items-center pt-2">
                                <Button variant="ghost" size="sm">
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </ScrollArea>
                    </TabsContent>
                    <TabsContent value="popular">
                      <p className="text-sm text-muted-foreground">Popular comments content here.</p>
                    </TabsContent>
                    <TabsContent value="unanswered">
                      <p className="text-sm text-muted-foreground">Unanswered comments content here.</p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}