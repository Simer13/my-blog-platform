"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CalendarIcon, ClockIcon } from "lucide-react"
import Image from "next/image"
import Link from 'next/link';

const blogPosts = [
  { id: 4, title: "10 Essential VS Code Extensions for Web Developers", category: "Tools", date: "May 15, 2023", readTime: "5 min", imageUrl: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D" },
  { id: 5, title: "The Future of React: What's Coming in React 19", category: "React", date: "May 18, 2023", readTime: "7 min", imageUrl: "https://plus.unsplash.com/premium_photo-1683211783920-8c66ab120c09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D" },
  { id: 6, title: "Mastering CSS Grid: Advanced Layout Techniques", category: "CSS", date: "May 20, 2023", readTime: "6 min", imageUrl: "https://plus.unsplash.com/premium_photo-1683309565422-77818a287060?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D" },
  { id: 7, title: "Building Scalable APIs with GraphQL and Node.js", category: "Backend", date: "May 22, 2023", readTime: "8 min", imageUrl: "https://images.unsplash.com/photo-1514782831304-632d84503f6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGJsb2d8ZW58MHx8MHx8fDA%3D" },
  { id: 8, title: "Optimizing Web Performance: A Deep Dive", category: "Performance", date: "May 25, 2023", readTime: "10 min", imageUrl: "https://images.unsplash.com/photo-1501556466850-7c9fa1fccb4c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGJsb2d8ZW58MHx8MHx8fDA%3D" },
  { id: 9, title: "The Art of Clean Code: Best Practices for Maintainability", category: "Best Practices", date: "May 28, 2023", readTime: "6 min", imageUrl: "https://images.unsplash.com/photo-1507120410856-1f35574c3b45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGJsb2d8ZW58MHx8MHx8fDA%3D" },
  { id: 10, title: "Exploring the JAMstack: Modern Web Development", category: "Web Dev", date: "June 1, 2023", readTime: "7 min", imageUrl: "https://plus.unsplash.com/premium_photo-1710361778821-93aeb8787ccd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGJsb2d8ZW58MHx8MHx8fDA%3D" },
  { id: 11, title: "Machine Learning in JavaScript with TensorFlow.js", category: "AI", date: "June 3, 2023", readTime: "9 min", imageUrl: "https://plus.unsplash.com/premium_photo-1676998930667-cab56c8fa602?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGJsb2d8ZW58MHx8MHx8fDA%3D" },
]

const BlogPostCard = ({ post }) => (
  <Card className="flex flex-col sm:flex-row items-center transition-transform duration-300 hover:scale-105 hover:shadow-lg w-full max-w-[600px]">
    <div className="relative w-full sm:w-[300px] h-[200px]">
      <Image
        src={post.imageUrl}
        alt={post.title}
        layout="fill"
        objectFit="cover"
        className="rounded-lg sm:rounded-l-lg"
      />
    </div>
    <CardContent className="flex-grow p-4">
      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
      <div className="flex items-center text-sm text-muted-foreground">
        <CalendarIcon className="mr-1 h-4 w-4" />
        <span className="mr-3">{post.date}</span>
        <ClockIcon className="mr-1 h-4 w-4" />
        <span>{post.readTime}</span>
      </div>
    </CardContent>
    <CardFooter className="p-4 pt-0">
    <Link href={`/blogPosts/${post.id}`} className="text-primary hover:underline">
    Read more
  </Link>
    </CardFooter>
  </Card>
)

const ScrollingRowMobile = ({ posts }) => (
  <div className="flex overflow-x-scroll space-x-6 py-6">
    {posts.map(post => (
      <BlogPostCard key={post.id} post={post} />
    ))}
  </div>
)

const ScrollingRowDesktop = ({ posts, direction }) => {
  const scrollRef = useRef(null)
  const isInView = useInView(scrollRef, { once: false, margin: "-20%" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start({
        x: direction * -100 + "%",
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        },
      })
    } else {
      controls.stop()
    }
  }, [isInView, controls, direction])

  return (
    <div className="overflow-hidden py-6" ref={scrollRef}>
      <motion.div
        className="flex space-x-6"
        animate={controls}
      >
        {[...posts, ...posts].map((post, index) => (
          <BlogPostCard key={`${post.id}-${index}`} post={post} />
        ))}
      </motion.div>
    </div>
  )
}

export default function FeaturedBlogPosts() {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
          Featured Blog Posts
        </h2>
        <div className="hidden sm:block space-y-8">
          <ScrollingRowDesktop posts={blogPosts.slice(0, 4)} direction={1} />
          <ScrollingRowDesktop posts={blogPosts.slice(4)} direction={-1} />
        </div>
        <div className="block sm:hidden">
          <ScrollingRowMobile posts={blogPosts} />
        </div>
      </div>
    </section>
  )
}
