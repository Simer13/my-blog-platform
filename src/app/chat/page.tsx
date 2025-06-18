"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Crown, Users, MessageCircle, Clock } from "lucide-react"

interface Message {
  id: string
  content: string
  author: string
  role: "author" | "reader"
  timestamp: number
  avatar?: string
}

export default function AuthorReaderChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [userName, setUserName] = useState("")
  const [userRole, setUserRole] = useState<"author" | "reader" | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  //const [onlineCount, setOnlineCount] = useState(12) // Simulated online count
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Fetch messages periodically
  useEffect(() => {
    if (!isConnected) return

    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages")
        const data = await response.json()
        setMessages(data.messages)
      } catch (error) {
        console.error("Failed to fetch messages:", error)
      }
    }

    fetchMessages()
    const interval = setInterval(fetchMessages, 2000) // Poll every 2 seconds

    return () => clearInterval(interval)
  }, [isConnected])

  const handleJoinChat = () => {
    if (userName.trim()) {
      setIsConnected(true)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !userName || !userRole) return

    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newMessage,
          author: userName,
          role: userRole,
        }),
      })

      setNewMessage("")
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full p-6 mx-auto w-fit mb-4">
              <MessageCircle className="w-12 h-12 text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
              Join the Conversation
            </h1>
            <p className="text-gray-400">Connect with the author and fellow readers</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name..."
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Join as</label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={userRole === "author" ? "default" : "outline"}
                  onClick={() => setUserRole("author")}
                  className={`rounded-xl ${
                    userRole === "author"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "border-gray-600 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Author
                </Button>
                <Button
                  variant={userRole === "reader" ? "default" : "outline"}
                  onClick={() => setUserRole("reader")}
                  className={`rounded-xl ${
                    userRole === "reader"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "border-gray-600 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Reader
                </Button>
              </div>
            </div>

            <Button
              onClick={handleJoinChat}
              disabled={!userName.trim() || !userRole}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl py-3 disabled:opacity-50"
            >
              Join Chat
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[90vh] bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <MessageCircle className="w-8 h-8 text-purple-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Author Corner
                </h1>
                <p className="text-gray-400 text-sm">Live discussion with readers</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              
              <Badge
                variant="outline"
                className={`${
                  userRole === "author" ? "border-purple-500/50 text-purple-400" : "border-blue-500/50 text-blue-400"
                }`}
              >
                {userRole === "author" ? <Crown className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />}
                {userName}
              </Badge>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 h-[calc(90vh-180px)]">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full p-8 mb-6">
                <MessageCircle className="w-16 h-16 text-purple-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">Start the Conversation</h2>
              <p className="text-gray-400 max-w-md">Be the first to share your thoughts and connect with others!</p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.author === userName ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  message.role === "author"
                    ? "bg-gradient-to-br from-purple-600 to-purple-700 border-2 border-purple-400/50"
                    : "bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600"
                }`}
              >
                {message.avatar}
              </div>

              <div className={`flex-1 max-w-[75%] ${message.author === userName ? "text-right" : "text-left"}`}>
                <div className="flex items-center space-x-2 mb-1">
                  <span
                    className={`text-sm font-medium ${message.role === "author" ? "text-purple-400" : "text-gray-300"}`}
                  >
                    {message.author}
                  </span>
                  {message.role === "author" && <Crown className="w-3 h-3 text-purple-400" />}
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTime(message.timestamp)}
                  </span>
                </div>

                <div
                  className={`inline-block p-3 rounded-2xl max-w-full ${
                    message.author === userName
                      ? "bg-gradient-to-br from-blue-600 to-purple-700 text-white"
                      : message.role === "author"
                        ? "bg-gradient-to-br from-purple-800/50 to-purple-900/50 border border-purple-600/30 text-gray-100"
                        : "bg-gray-800/80 border border-gray-700/50 text-gray-100"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>
                </div>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="border-t border-gray-700/50 bg-gray-900/50 backdrop-blur-sm p-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={`Message as ${userName}...`}
                className="w-full bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl px-6 py-3 transition-all duration-200 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <div className="text-center mt-3">
            <p className="text-xs text-gray-500">Press Enter to send • Connected as {userRole}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
