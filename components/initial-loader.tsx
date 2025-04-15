"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Laptop } from "lucide-react"

export default function InitialLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Store in session storage so it only shows once per session
    const hasLoaded = sessionStorage.getItem("hasLoaded")

    if (hasLoaded) {
      setLoading(false)
      return
    }

    const timer = setTimeout(() => {
      setLoading(false)
      sessionStorage.setItem("hasLoaded", "true")
    }, 2500) // 2.5 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="relative">
                <Laptop className="h-16 w-16 text-tech-purple" />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-tech-purple to-tech-blue rounded-full"
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl font-bold text-tech-purple mb-2"
            >
              TechLaptops
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-sm text-muted-foreground"
            >
              Preparing your personalized experience...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
