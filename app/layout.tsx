import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CartProvider } from "@/hooks/use-cart"
import { AuthProvider } from "@/hooks/use-auth"
import { WishlistProvider } from "@/hooks/use-wishlist"
import { Toaster } from "@/components/ui/toaster"
import ScrollProgress from "@/components/scroll-progress"
import InitialLoader from "@/components/initial-loader"
import ChatbotButton from "@/components/chatbot-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Premium Laptops | High-Performance Computing Solutions",
  description:
    "Discover our range of premium laptops designed for professionals, creators, and gamers. Experience cutting-edge technology and exceptional performance.",
  keywords: "laptops, gaming laptops, professional laptops, ultrabooks, creator laptops, high-performance computing",
  authors: [{ name: "Tech Laptops" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <div className="flex min-h-screen flex-col">
                  <ScrollProgress />
                  <Navbar />
                  <InitialLoader />
                  <div className="flex-1">{children}</div>
                  <Footer />
                  <ChatbotButton />
                </div>
                <Toaster />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'