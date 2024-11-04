import React from 'react';
import Link from 'next/link';

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: 'The Art of Storytelling',
      date: 'Oct 10, 2024',
      author: 'Sophia Williams',
      authorRole: 'Senior Editor',
      excerpt: 'Discover the secrets to captivating storytelling that engages readers from start to finish...',
      imageUrl: 'https://images.unsplash.com/photo-1648113137741-43e7e00c87f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXJ0JTIwb2YlMjBzdG9yeXRlbGxpbmd8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 2,
      title: 'Writing for the Digital Age',
      date: 'Sep 25, 2024',
      author: 'Liam Thompson',
      authorRole: 'Content Strategist',
      excerpt: 'Learn how to adapt traditional writing techniques for the fast-paced world of digital media...',
      imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fHdyaXRpbmd8ZW58MHx8fHwxNjEwOTMwMTI3&ixlib=rb-1.2.1&q=80&w=400',
    },
    {
      id: 3,
      title: 'Mastering SEO for Writers',
      date: 'Aug 14, 2024',
      author: 'Olivia Johnson',
      authorRole: 'SEO Expert',
      excerpt: 'Boost your writing’s visibility with our essential SEO tips for authors and content creators...',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fHNlYXJjaCUyMGVuZ2luZXxlbnwwfHx8fDE2MTEzNDg1MDM&ixlib=rb-1.2.1&q=80&w=400',
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="flex flex-col items-end mx-auto max-w-3xl lg:mx-0 text-center ml-12"> 
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl text-center">From the Blog</h2> 
          <p className="mt-2 text-lg leading-10 text-gray-700 italic text-center"> 
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {blogs.map((blog) => (
            <article key={blog.id} className="flex max-w-xl flex-col items-center justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={blog.date} className="text-gray-500">{blog.date}</time>
                <Link href={`/blogs/${blog.id}`}>
                  <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-blue-600 hover:bg-blue-100">Marketing</span>
                </Link>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-blue-700">
                  <Link href={`/blogs/${blog.id}`}>
                    <span className="absolute inset-0"></span>
                    {blog.title}
                  </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{blog.excerpt}</p>
              </div>
              <img src={blog.imageUrl} alt={blog.title} className="mt-4 mb-4 h-64 w-full rounded-md object-cover shadow-md" />
              <div className="relative mt-8 flex items-center gap-x-4">
                <img src={blog.imageUrl} alt={blog.title} className="h-10 w-10 rounded-full bg-gray-50" />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">{blog.author}</p>
                  <p className="text-gray-600">{blog.authorRole}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
