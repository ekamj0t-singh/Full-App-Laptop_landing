"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Slide {
  id: number
  title: string
  category: string
  description: string
  image: string
  link: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Gaming Excellence",
    category: "Gaming",
    description: "Unleash your gaming potential with high-performance laptops designed for immersive experiences.",
    image: "https://i0.wp.com/newdigitalage.co/wp-content/uploads/2022/06/iStock-1334436084-jpg.webp?fit=1024%2C683&ssl=1?height=600&width=1200&text=Gaming",
    link: "/products?category=gaming",
  },
  {
    id: 2,
    title: "Creator Series",
    category: "Creator",
    description: "Powerful machines for content creators, designers, and visual professionals.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu5tWVzddXqFf-4vF8Ig0Sj8buzho7Ve6_Nw&s?height=600&width=1200&text=Creator",
    link: "/products?category=creator",
  },
  {
    id: 3,
    title: "Professional Range",
    category: "Professional",
    description: "Reliable performance for business professionals with enhanced security features.",
    image: "https://png.pngtree.com/png-clipart/20230114/original/pngtree-simple-professional-team-icon-element-free-material-png-image_8910382.png",
    link: "/products?category=professional",
  },
  {
    id: 4,
    title: "Ultrabook Collection",
    category: "Ultrabook",
    description: "Sleek, lightweight designs with exceptional battery life for the modern nomad.",
    image: "https://dlcdnwebimgs.asus.com/files/media/69c52e00-bea3-4e79-8344-3690f8cc94f2/v1/assets/image/proart/article_cover.jpg?height=600&width=1200&text=Ultrabook",
    link: "/products?category=ultrabook",
  },
]

export default function CategorySlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const slideInterval = 4000 // 4 seconds per slide

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [])

  const goToSlide = (index: number) => {
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

  return (
    <div className="relative overflow-hidden rounded-lg bg-black h-[500px] mb-12">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Background image with overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Content */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center max-w-3xl px-6">
                <span className="inline-block text-sm font-medium tracking-wider uppercase mb-2 text-white/80">
                  {slide.category}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{slide.title}</h2>
                <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">{slide.description}</p>
                <Button asChild className="bg-white text-black hover:bg-white/90 border-0">
                  <Link href={slide.link}>Explore {slide.category} Laptops</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-2 rounded-full transition-colors"
        onClick={() => handleManualControl(prevSlide)}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-2 rounded-full transition-colors"
        onClick={() => handleManualControl(nextSlide)}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleManualControl(() => goToSlide(index))}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
