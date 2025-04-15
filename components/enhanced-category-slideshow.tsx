"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface Slide {
  id: number
  title: string
  category: string
  description: string
  image: string
  link: string
  color: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Gaming Excellence",
    category: "Gaming",
    description: "Unleash your gaming potential with high-performance laptops designed for immersive experiences.",
    image: "https://i0.wp.com/newdigitalage.co/wp-content/uploads/2022/06/iStock-1334436084-jpg.webp?fit=1024%2C683&ssl=1?height=600&width=1200&text=Gaming?height=600&width=1200&text=Gaming",
    link: "/products?category=gaming",
    color: "from-purple-900 to-indigo-900",
  },
  {
    id: 2,
    title: "Creator Series",
    category: "Creator",
    description: "Powerful machines for content creators, designers, and visual professionals.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu5tWVzddXqFf-4vF8Ig0Sj8buzho7Ve6_Nw&s?height=600&width=1200&text=Creator?height=600&width=1200&text=Creator",
    link: "/products?category=creator",
    color: "from-rose-900 to-pink-900",
  },
  {
    id: 3,
    title: "Professional Range",
    category: "Professional",
    description: "Reliable performance for business professionals with enhanced security features.",
    image: "https://png.pngtree.com/png-clipart/20230114/original/pngtree-simple-professional-team-icon-element-free-material-png-image_8910382.png?height=600&width=1200&text=Professional",
    link: "/products?category=professional",
    color: "from-blue-900 to-cyan-900",
  },
  {
    id: 4,
    title: "Ultrabook Collection",
    category: "Ultrabook",
    description: "Sleek, lightweight designs with exceptional battery life for the modern nomad.",
    image: "https://dlcdnwebimgs.asus.com/files/media/69c52e00-bea3-4e79-8344-3690f8cc94f2/v1/assets/image/proart/article_cover.jpg?height=600&width=1200&text=Ultrabook?height=600&width=1200&text=Ultrabook",
    link: "/products?category=ultrabook",
    color: "from-emerald-900 to-teal-900",
  },
]

export default function EnhancedCategorySlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left
  const slideInterval = 5000 // 5 seconds per slide
  const slideRef = useRef<HTMLDivElement>(null)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [])

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
    // Reset auto-play timer when manually changing slides
    setIsAutoPlaying(true)
  }

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide()
      }, slideInterval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlaying, nextSlide, slideInterval])

  // Pause auto-play when user interacts with controls
  const handleManualControl = (callback: () => void) => {
    setIsAutoPlaying(false)
    callback()
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  // Variants for slide animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      },
    }),
  }

  return (
    <div className="relative overflow-hidden rounded-lg h-[600px] mb-12" ref={slideRef}>
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Background image with overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].color} opacity-80 z-10`} />
          <img
            src={slides[currentSlide].image || "/placeholder.svg"}
            alt={slides[currentSlide].title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center max-w-3xl px-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block text-sm font-medium tracking-wider uppercase mb-2 text-white/80"
              >
                {slides[currentSlide].category}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold mb-4 text-white"
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-lg text-white/90 mb-8 max-w-xl mx-auto"
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 border-0">
                  <Link href={slides[currentSlide].link}>Explore {slides[currentSlide].category} Laptops</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-3 rounded-full transition-colors"
        onClick={() => handleManualControl(prevSlide)}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-3 rounded-full transition-colors"
        onClick={() => handleManualControl(nextSlide)}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleManualControl(() => goToSlide(index))}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-10" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
