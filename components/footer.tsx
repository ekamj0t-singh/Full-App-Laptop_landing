"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronUp,
} from "lucide-react"

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && email.includes("@")) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => {
        setIsSubscribed(false)
      }, 5000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold gradient-text">TECH LAPTOPS</h2>
            </Link>
            <p className="text-slate-300 mb-6">
              Cutting-edge laptops designed for professionals, gamers, creators, and students. Find your perfect match
              today.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/80 transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/80 transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/80 transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/80 transition-colors duration-300"
              >
                <Youtube className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/80 transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-slate-300 hover:text-white hover:underline transition-colors duration-300"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="text-slate-300 hover:text-white hover:underline transition-colors duration-300"
                >
                  Compare Models
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-slate-300 hover:text-white hover:underline transition-colors duration-300"
                >
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-slate-300 hover:text-white hover:underline transition-colors duration-300"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-300 hover:text-white hover:underline transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-300 hover:text-white hover:underline transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-slate-300">
                  123 Tech Street, Digital Park
                  <br />
                  Bangalore, Karnataka 560001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span className="text-slate-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <span className="text-slate-300">info@techlaptops.com</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-4 text-white">Newsletter</h3>
            <p className="text-slate-300 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full btn-primary">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            {isSubscribed && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 mt-2 text-sm">
                Thank you for subscribing!
              </motion.p>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Tech Laptops. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-slate-400">
            <Link href="/privacy" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/shipping" className="hover:text-white transition-colors duration-300">
              Shipping Policy
            </Link>
          </div>
        </motion.div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 left-6 rounded-full bg-primary text-white border-none shadow-sm hover:bg-primary/90 z-50"
        onClick={scrollToTop}
      >
        <ChevronUp className="h-5 w-5" />
      </Button>
    </footer>
  )
}
