"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface ProductAnimationProps {
  children: React.ReactNode
  category: string
  delay?: number
  id?: number
}

export default function EnhancedProductAnimation({ children, category, delay = 0, id = 0 }: ProductAnimationProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start("visible")
      setHasAnimated(true)
    }
  }, [isInView, controls, hasAnimated])

  // Different animation variants based on product category
  const getVariants = () => {
    switch (category.toLowerCase()) {
      case "gaming":
        return {
          hidden: { opacity: 0, y: 50, rotateY: -15 },
          visible: {
            opacity: 1,
            y: 0,
            rotateY: 0,
            transition: {
              duration: 0.6,
              delay: delay,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        }
      case "professional":
        return {
          hidden: { opacity: 0, y: 30, scale: 0.95 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            },
          },
        }
      case "creator":
        return {
          hidden: { opacity: 0, x: -30, scale: 0.98 },
          visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
              duration: 0.7,
              delay: delay,
              ease: "easeInOut",
            },
          },
        }
      case "ultrabook":
        return {
          hidden: { opacity: 0, y: 20, scale: 0.97 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.4,
              delay: delay,
              ease: "easeOut",
            },
          },
        }
      default:
        // Default animation based on product ID for variety
        const direction = id % 2 === 0 ? 1 : -1
        return {
          hidden: { opacity: 0, x: 20 * direction, y: 20 },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
              duration: 0.5,
              delay: delay,
              ease: "easeOut",
            },
          },
        }
    }
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={getVariants()} className="h-full w-full">
      {children}
    </motion.div>
  )
}
