"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

interface UserStory {
  id: number
  name: string
  role: string
  image: string
  story: string
  productImage: string
  productName: string
  quote: string
}

const userStories: UserStory[] = [
  {
    id: 1,
    name: "Emily Chen",
    role: "Architecture Student",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdfciDnqWmqj48QwICCnW0m3bQchNpM1uUsQ&s?height=100&width=100",
    story:
      "As an architecture student, I need a laptop that can handle complex 3D modeling software while still being portable enough to carry between classes and studio sessions.",
    productImage: "https://images.indianexpress.com/2019/05/asus-zenbook-pro-duo.jpg?height=200&width=300",
    productName: "ZenBook Pro",
    quote:
      "The ZenBook Pro transformed my workflow. I can now render complex 3D models in minutes instead of hours, and the battery lasts through my longest studio sessions.",
  },
  {
    id: 2,
    name: "Raj Patel",
    role: "Software Developer",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHtmyRzfJwtpVuchhITLcBqpSwvFUOZQOtQ&s?height=100&width=100",
    story:
      "Working remotely as a software developer means I need a reliable machine with enough power to run multiple virtual environments and development tools simultaneously.",
    productImage: "https://cdn.mos.cms.futurecdn.net/4fq8eXeedp8epHUJ8zhUtM-1200-80.jpg?height=200&width=300",
    productName: "ProBook Ultra",
    quote:
      "The ProBook Ultra handles everything I throw at it. Docker containers, multiple IDEs, and browser tabs - all running smoothly without any lag or performance issues.",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Content Creator",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSofceZaM7thWvHU_gQbO8YN6RD6MPOBnpENQ&s?height=100&width=100",
    story:
      "Creating high-quality video content requires serious processing power and a color-accurate display. I need a laptop that can keep up with my creative workflow.",
    productImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkzurKlFItTGjPlVxaXClyI-YEh8i9NNe7pw&s?height=200&width=300",
    productName: "StudioBook Pro",
    quote:
      "The StudioBook Pro's color-accurate display and powerful processor have revolutionized my video editing process. What used to take hours now takes minutes.",
  },
]

export default function UserStories() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const activeStory = userStories[activeIndex]

  useEffect(() => {
    // Set visible after component mounts for animations
    setIsVisible(true)
  }, [])

  const nextStory = () => {
    setActiveIndex((prev) => (prev + 1) % userStories.length)
  }

  const prevStory = () => {
    setActiveIndex((prev) => (prev - 1 + userStories.length) % userStories.length)
  }

  // Auto-advance stories every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextStory()
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center justify-center text-center mb-12"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text">Real Stories, Real Results</h2>
        <p className="mt-4 text-muted-foreground md:w-2/3">
          See how our laptops are making a difference in people's lives and workflows
        </p>
      </motion.div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStory.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            <div className="order-2 md:order-1">
              <motion.div className="bg-secondary/30 rounded-lg p-6 md:p-8 relative shadow-sm" whileHover={{ y: -5 }}>
                <Quote className="absolute text-primary opacity-10 h-24 w-24 -top-4 -left-4" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                      <img
                        src={activeStory.image || "/placeholder.svg"}
                        alt={activeStory.name}
                        className="h-16 w-16 rounded-full object-cover border-2 border-primary/20"
                      />
                    </motion.div>
                    <div>
                      <motion.h3
                        className="font-bold text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        {activeStory.name}
                      </motion.h3>
                      <motion.p
                        className="text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {activeStory.role}
                      </motion.p>
                    </div>
                  </div>

                  <motion.p
                    className="text-lg mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {activeStory.story}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Card className="bg-white border-primary/10">
                      <CardContent className="p-6">
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" strokeWidth={1} />
                          ))}
                        </div>
                        <p className="italic text-lg text-primary mb-4">"{activeStory.quote}"</p>
                        <div className="flex items-center gap-4">
                          <img
                            src={activeStory.productImage || "/placeholder.svg"}
                            alt={activeStory.productName}
                            className="h-12 w-auto rounded"
                          />
                          <span className="font-medium">Using: {activeStory.productName}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <div className="order-1 md:order-2 relative">
              <motion.img
                src={activeStory.productImage || "/placeholder.svg"}
                alt={`${activeStory.name} using their laptop`}
                className="w-full h-auto rounded-lg shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-8 gap-2">
          <Button variant="outline" size="icon" onClick={prevStory} className="rounded-full btn-outline">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-1">
            {userStories.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-primary" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <Button variant="outline" size="icon" onClick={nextStory} className="rounded-full btn-outline">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
