import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo purposes
// In production, you'd use a database like Supabase or MongoDB
let messages: Array<{
  id: string
  content: string
  author: string
  role: "author" | "reader"
  timestamp: number
  avatar?: string
}> = []

export async function GET() {
  return NextResponse.json({ messages })
}

export async function POST(request: NextRequest) {
  const { content, author, role } = await request.json()

  const newMessage = {
    id: Date.now().toString(),
    content,
    author,
    role,
    timestamp: Date.now(),
    avatar: role === "author" ? "✍️" : "👤",
  }

  messages.push(newMessage)

  // Keep only last 100 messages
  if (messages.length > 100) {
    messages = messages.slice(-100)
  }

  return NextResponse.json({ message: newMessage })
}
