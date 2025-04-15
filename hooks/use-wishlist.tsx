"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "@/hooks/use-toast"

interface WishlistContextType {
  items: number[]
  addToWishlist: (productId: number) => void
  removeFromWishlist: (productId: number) => void
  toggleWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<number[]>([])

  // Load wishlist from localStorage on client side
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist")
      if (savedWishlist) {
        setItems(JSON.parse(savedWishlist))
      }
    } catch (error) {
      console.error("Failed to load wishlist from localStorage:", error)
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(items))
    } catch (error) {
      console.error("Failed to save wishlist to localStorage:", error)
    }
  }, [items])

  const addToWishlist = (productId: number) => {
    if (!items.includes(productId)) {
      setItems((prev) => [...prev, productId])
      toast({
        title: "Added to wishlist",
        description: "Product has been added to your wishlist",
      })
    }
  }

  const removeFromWishlist = (productId: number) => {
    setItems((prev) => prev.filter((id) => id !== productId))
    toast({
      title: "Removed from wishlist",
      description: "Product has been removed from your wishlist",
    })
  }

  const toggleWishlist = (productId: number) => {
    if (items.includes(productId)) {
      removeFromWishlist(productId)
    } else {
      addToWishlist(productId)
    }
  }

  const isInWishlist = (productId: number) => {
    return items.includes(productId)
  }

  const clearWishlist = () => {
    setItems([])
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
    })
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
