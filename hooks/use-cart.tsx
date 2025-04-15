"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "@/hooks/use-toast"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on client side
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items))
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error)
    }
  }, [items])

  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // If item already exists, increase quantity
        const updatedItems = prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
        toast({
          title: "Item quantity updated",
          description: `${product.name} quantity increased to ${existingItem.quantity + 1}`,
        })
        return updatedItems
      } else {
        // If item doesn't exist, add it with quantity 1
        toast({
          title: "Item added to cart",
          description: `${product.name} has been added to your cart`,
        })
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === productId)
      if (itemToRemove) {
        toast({
          title: "Item removed from cart",
          description: `${itemToRemove.name} has been removed from your cart`,
        })
      }
      return prevItems.filter((item) => item.id !== productId)
    })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    })
  }

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
