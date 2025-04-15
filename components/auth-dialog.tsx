"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { Loader2 } from "lucide-react"

interface AuthDialogProps {
  open: boolean
  onClose: () => void
  message?: string
}

export default function AuthDialog({ open, onClose, message }: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState("signin")
  const { signIn, signUp, isLoading } = useAuth()

  // Sign in form state
  const [signInEmail, setSignInEmail] = useState("")
  const [signInPassword, setSignInPassword] = useState("")
  const [signInError, setSignInError] = useState("")

  // Sign up form state
  const [signUpName, setSignUpName] = useState("")
  const [signUpEmail, setSignUpEmail] = useState("")
  const [signUpPassword, setSignUpPassword] = useState("")
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("")
  const [signUpError, setSignUpError] = useState("")

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignInError("")

    try {
      await signIn(signInEmail, signInPassword)
      onClose()
    } catch (error) {
      if (error instanceof Error) {
        setSignInError(error.message)
      } else {
        setSignInError("Failed to sign in")
      }
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignUpError("")

    if (signUpPassword !== signUpConfirmPassword) {
      setSignUpError("Passwords do not match")
      return
    }

    try {
      await signUp(signUpName, signUpEmail, signUpPassword)
      onClose()
    } catch (error) {
      if (error instanceof Error) {
        setSignUpError(error.message)
      } else {
        setSignUpError("Failed to create account")
      }
    }
  }

  // Demo account login
  const handleDemoLogin = async () => {
    try {
      await signIn("demo@example.com", "password")
      onClose()
    } catch (error) {
      setSignInError("Failed to sign in with demo account")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{activeTab === "signin" ? "Sign In to Your Account" : "Create an Account"}</DialogTitle>
          <DialogDescription>{message || "Sign in to access your account or create a new one."}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" size="sm" className="p-0 h-auto">
                    Forgot password?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  required
                />
              </div>

              {signInError && <p className="text-sm text-red-500">{signInError}</p>}

              <Button type="submit" className="w-full btn-hover-effect" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button type="button" variant="outline" className="w-full" onClick={handleDemoLogin} disabled={isLoading}>
                Demo Account
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={signUpConfirmPassword}
                  onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {signUpError && <p className="text-sm text-red-500">{signUpError}</p>}

              <Button type="submit" className="w-full btn-hover-effect" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
