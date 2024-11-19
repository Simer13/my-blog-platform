import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // Fetch the blog post by slug from your database
  const post = await fetchPostBySlug(slug);  // Replace with your database or API call

  if (!post) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function POST(req: Request) {
  const { title, content } = await req.json();

  // Save the new post to your database (this is just a placeholder)
  const newPost = await createNewPost(title, content);  // Replace with your DB logic

  return NextResponse.json(newPost, { status: 201 });
}

// Dummy functions for fetching and creating posts (you can replace with actual DB logic)
async function fetchPostBySlug(slug: string) {
  return {
    title: `Sample Post for ${slug}`,
    content: 'This is the content of the blog post.',
  };
}

async function createNewPost(title: string, content: string) {
  return {
    slug: 'generated-slug',  // Generate a slug
    title,
    content,
  };
}
