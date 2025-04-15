"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, X, Send } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "assistant"
  timestamp: Date
}

export default function LiveAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hi there! I'm your tech assistant. How can I help you find the perfect laptop today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    // Show the assistant button after a delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false)
      return
    }
    setIsOpen(!isOpen)
  }

  const minimizeChat = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMinimized(true)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate assistant typing
    setIsTyping(true)
    setTimeout(() => {
      const assistantResponse = getAssistantResponse(inputValue)
      const assistantMessage: Message = {
        id: messages.length + 2,
        text: assistantResponse,
        sender: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  // Simple response logic
  const getAssistantResponse = (userInput: string) => {
    const input = userInput.toLowerCase()

    if (input.includes("gaming") || input.includes("game")) {
      return "For gaming, I recommend our ROG Strix with AMD Ryzen 9 and high refresh rate display. It's perfect for competitive gaming and content creation. Would you like to see the specs?"
    } else if (input.includes("student") || input.includes("study") || input.includes("college")) {
      return "For students, our ZenBook 14 is a great choice! It's lightweight (just 1.1kg), has all-day battery life, and enough power for assignments and research. Would you like more details?"
    } else if (
      input.includes("creator") ||
      input.includes("design") ||
      input.includes("video") ||
      input.includes("photo")
    ) {
      return "Content creators love our StudioBook Pro with its color-accurate 4K OLED display and powerful Intel Core i9 processor. Perfect for video editing, 3D rendering, and graphic design!"
    } else if (input.includes("business") || input.includes("work") || input.includes("professional")) {
      return "For business professionals, I recommend our ProBook Ultra. It has enterprise-grade security features, excellent battery life, and is built for reliability and performance."
    } else if (input.includes("price") || input.includes("cost") || input.includes("budget")) {
      return "We have laptops across all price ranges! Our budget options start at ₹50,000, mid-range from ₹80,000 to ₹120,000, and premium models above ₹120,000. What's your budget range?"
    } else if (input.includes("compare") || input.includes("difference")) {
      return "You can use our comparison tool to see detailed specs side by side. Would you like me to help you compare specific models?"
    } else if (input.includes("thank")) {
      return "You're welcome! Feel free to ask if you have any other questions. Happy laptop hunting! 😊"
    } else if (input.includes("hi") || input.includes("hello") || input.includes("hey")) {
      return "Hello there! How can I help you find your perfect laptop today? Are you looking for something specific?"
    } else {
      return "I'd be happy to help you with that. Could you tell me more about how you plan to use your laptop? Are you a student, gamer, content creator, or business professional?"
    }
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <Button
              onClick={toggleChat}
              className={`rounded-full shadow-sm ${
                isOpen ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
              } text-white h-12 w-12 flex items-center justify-center`}
            >
              {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              height: isMinimized ? "auto" : "500px",
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-24 right-6 w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden z-50 border flex flex-col`}
          >
            <div
              className="bg-primary text-white p-4 flex justify-between items-center cursor-pointer"
              onClick={isMinimized ? toggleChat : undefined}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border-2 border-white">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-white text-primary">TA</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">Tech Assistant</h3>
                  {!isMinimized && <p className="text-xs text-white/80">Online | Typically replies instantly</p>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white hover:bg-white/20 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(false)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="flex-1 p-4 overflow-y-auto bg-white">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "assistant" && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback className="bg-primary text-white">TA</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user" ? "bg-primary text-white" : "bg-secondary text-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="mb-4 flex justify-start">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback className="bg-primary text-white">TA</AvatarFallback>
                      </Avatar>
                      <div className="bg-secondary p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button type="submit" className="btn-primary" disabled={!inputValue.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
