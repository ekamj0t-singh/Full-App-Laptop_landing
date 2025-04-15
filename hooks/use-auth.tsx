"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error("Failed to restore auth state:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication - in a real app, this would be an API call
      if (email === "demo@example.com" && password === "password") {
        const user = {
          id: "user-1",
          name: "Demo User",
          email: "demo@example.com",
          avatar: "/placeholder.svg?height=40&width=40",
        }

        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))

        toast({
          title: "Signed in successfully",
          description: `Welcome back, ${user.name}!`,
        })
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock registration - in a real app, this would be an API call
      const user = {
        id: `user-${Date.now()}`,
        name,
        email,
        avatar: "/placeholder.svg?height=40&width=40",
      }

      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))

      toast({
        title: "Account created successfully",
        description: `Welcome, ${name}!`,
      })
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account",
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
