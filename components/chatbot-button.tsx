"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi there! I'm your virtual assistant. How can I help you with our laptops today?", isUser: false },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { text: input, isUser: true }])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      let response = "I'm sorry, I don't have information about that yet."

      const lowerInput = input.toLowerCase()
      if (lowerInput.includes("price") || lowerInput.includes("cost")) {
        response =
          "Our laptops range from $899 for entry models to $2499 for premium configurations. You can check specific pricing on the product pages."
      } else if (lowerInput.includes("warranty")) {
        response =
          "All our laptops come with a standard 2-year warranty. We also offer extended warranty options at checkout."
      } else if (lowerInput.includes("delivery") || lowerInput.includes("shipping")) {
        response = "We offer free shipping on all orders over $999. Standard delivery takes 3-5 business days."
      } else if (lowerInput.includes("specs") || lowerInput.includes("specifications")) {
        response =
          "Our laptops feature the latest Intel and AMD processors, up to 64GB RAM, and high-resolution displays. You can compare detailed specifications on our comparison page."
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        response = "Hello! How can I assist you with our laptops today?"
      }

      setMessages((prev) => [...prev, { text: response, isUser: false }])
    }, 1000)
  }

  return (
    <>
      <Button className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50" onClick={() => setIsOpen(true)}>
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 md:w-96 shadow-xl z-50 border-slate-200">
          <CardHeader className="bg-slate-100 border-b pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Chat Support</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 h-80 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, i) => (
                <div key={i} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.isUser ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-900"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t p-3">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
