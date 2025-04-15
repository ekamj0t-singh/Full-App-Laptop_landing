"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  const [userType, setUserType] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulate detecting user type based on browsing behavior
    const userTypes = ["student", "professional", "creator", "gamer"]
    const randomType = userTypes[Math.floor(Math.random() * userTypes.length)]
    setUserType(randomType)

    // Set loaded after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Personalized content based on user type
  const getPersonalizedContent = () => {
    switch (userType) {
      case "student":
        return {
          heading: "Elevate Your Learning Experience",
          subheading: "Lightweight laptops with all-day battery life, perfect for classes and research",
          image: "https://www.shutterstock.com/image-photo/university-student-writing-while-using-600nw-2442495581.jpg?height=600&width=800",
          cta: "Find Student Laptops",
          highlight: "Perfect for note-taking, research, and online classes",
        }
      case "professional":
        return {
          heading: "Empower Your Workday",
          subheading: "Reliable performance and security features for business professionals",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqRF8zbX_D6kR0UDh-rtukmk6jBhsPIqwRYA&s?height=600&width=800",
          cta: "Explore Business Laptops",
          highlight: "Designed for multitasking, presentations, and secure remote work",
        }
      case "creator":
        return {
          heading: "Unleash Your Creative Vision",
          subheading: "Color-accurate displays and powerful processors for content creators",
          image: "https://dlcdnwebimgs.asus.com/files/media/69c52e00-bea3-4e79-8344-3690f8cc94f2/v1/assets/image/proart/article_cover.jpg?height=600&width=800",
          cta: "Discover Creator Laptops",
          highlight: "Perfect for video editing, graphic design, and 3D rendering",
        }
      case "gamer":
        return {
          heading: "Level Up Your Gaming Experience",
          subheading: "High-refresh displays and powerful GPUs for immersive gameplay",
          image: "https://p3-ofp.static.pub/ShareResource/na/landing-pages/gaming-storefront/hot-spots/lenovo-lifestyle-streamer-legion-7i-legion-go-desktop.jpg?height=600&width=800",
          cta: "View Gaming Laptops",
          highlight: "Engineered for competitive gaming, streaming, and content creation",
        }
      default:
        return {
          heading: "Find Your Perfect Laptop",
          subheading: "Cutting-edge technology tailored to your unique needs",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7AAS03URpw8aFy_Vr3H21NrNjBe2UrA88Cg&s?height=600&width=800",
          cta: "Explore All Laptops",
          highlight: "From everyday computing to specialized professional tasks",
        }
    }
  }

  const content = getPersonalizedContent()

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col"
          >
            <span className="inline-block px-4 py-1 mb-6 text-sm font-medium text-primary bg-primary/5 rounded-full">
              Personalized for {userType || "you"}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              <span className="gradient-text">{content.heading}</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-6">{content.subheading}</p>

            <div className="bg-secondary p-4 rounded-lg mb-6">
              <p className="text-sm">{content.highlight}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="btn-primary">
                <Link href="/products">
                  {content.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-outline">
                <Link href="#laptop-finder">Find Your Perfect Match</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <img
              src={content.image || "/placeholder.svg"}
              alt="Laptop showcase"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
