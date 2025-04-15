"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/use-auth"
import { useWishlist } from "@/hooks/use-wishlist"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { User, Package, CreditCard, Heart, Settings, LogOut, ShoppingCart, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useCart } from "@/hooks/use-cart"

// Sample product data for wishlist
const products = [
  {
    id: 1,
    name: "ProBook Ultra",
    category: "Professional",
    price: 99990,
    image: "https://images.samsung.com/is/image/samsung/assets/us/computing/galaxybooks/galaxy-book4-ultra/GB4Ultra-HD01-HomeKV-D.jpg?imwidth=2560?height=300&width=400",
  },
  {
    id: 2,
    name: "StudioBook Pro",
    category: "Creator",
    price: 149990,
    image: "https://dlcdnwebimgs.asus.com/files/media/3a44c10f-9fc8-4ce3-a7df-b589813a5d05/v2/features/images/large/2x/kv.webp?height=300&width=400",
  },
  {
    id: 3,
    name: "ROG Strix",
    category: "Gaming",
    price: 129990,
    image: "https://dlcdnwebimgs.asus.com/gain/CFE9CB59-216D-4AC9-AEAE-10054506055C/w1000/h732?height=300&width=400",
  },
  {
    id: 4,
    name: "ZenBook 14",
    category: "Ultrabook",
    price: 89990,
    image: "https://dlcdnwebimgs.asus.com/files/media/87d135b1-7e5d-4637-8b58-a8651d4a4cc1/v1/features/images/large/2x/kv/kv.webp?height=300&width=400",
  },
  {
    id: 5,
    name: "TUF Gaming A15",
    category: "Gaming",
    price: 94990,
    image: "https://in.store.asus.com/media/catalog/product/1/_/1._main_f15.jpg?width=439&height=439&store=en_IN&image-type=image?height=300&width=400",
  },
  {
    id: 6,
    name: "VivoBook Pro",
    category: "Creator",
    price: 109990,
    image: "https://dlcdnwebimgs.asus.com/gain/d17c5603-7f8a-4809-bedd-0b1b3280c566/w800?height=300&width=400",
  },
  {
    id: 7,
    name: "ExpertBook B9",
    category: "Professional",
    price: 119990,
    image: "https://dlcdnwebimgs.asus.com/gain/a5cc741e-6c72-4878-99b7-e62c0f67b4c3/w800/fwebp?height=300&width=400",
  },
  {
    id: 8,
    name: "Swift Edge",
    category: "Ultrabook",
    price: 79990,
    image: "https://images.acer.com/is/image/acer/acer-laptop-swift-Edge-16-optimized-brilliance:KSP-with-Specs-XL?height=300&width=400",
  },
]

export default function ProfilePage() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")

  const { user, signOut, isAuthenticated } = useAuth()
  const { items: wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(tabParam || "profile")

  // Form state
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
      return
    }
  }, [isAuthenticated, router])

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handleSignOut = () => {
    signOut()
    router.push("/")
  }

  const handleAddToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      })
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container py-12">
      <motion.h1
        className="text-3xl font-bold mb-8 bg-gradient-to-r from-tech-purple to-tech-blue bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        My Account
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback className="text-2xl bg-gradient-to-r from-tech-purple to-tech-blue text-white">
                  {user?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{user?.name}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <nav className="flex flex-col space-y-1">
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className={
                  activeTab === "profile"
                    ? "bg-gradient-to-r from-tech-purple to-tech-blue text-white justify-start"
                    : "text-tech-purple justify-start"
                }
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button
                variant={activeTab === "orders" ? "default" : "ghost"}
                className={
                  activeTab === "orders"
                    ? "bg-gradient-to-r from-tech-purple to-tech-blue text-white justify-start"
                    : "text-tech-purple justify-start"
                }
                onClick={() => setActiveTab("orders")}
              >
                <Package className="mr-2 h-4 w-4" />
                Orders
              </Button>
              <Button
                variant={activeTab === "payments" ? "default" : "ghost"}
                className={
                  activeTab === "payments"
                    ? "bg-gradient-to-r from-tech-purple to-tech-blue text-white justify-start"
                    : "text-tech-purple justify-start"
                }
                onClick={() => setActiveTab("payments")}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </Button>
              <Button
                variant={activeTab === "wishlist" ? "default" : "ghost"}
                className={
                  activeTab === "wishlist"
                    ? "bg-gradient-to-r from-tech-purple to-tech-blue text-white justify-start"
                    : "text-tech-purple justify-start"
                }
                onClick={() => setActiveTab("wishlist")}
              >
                <Heart className="mr-2 h-4 w-4" />
                Wishlist
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className={
                  activeTab === "settings"
                    ? "bg-gradient-to-r from-tech-purple to-tech-blue text-white justify-start"
                    : "text-tech-purple justify-start"
                }
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Separator className="my-2" />
              <Button
                variant="ghost"
                className="justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </nav>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-tech-purple/30 focus:border-tech-purple"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-tech-purple/30 focus:border-tech-purple"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="border-tech-purple/30 focus:border-tech-purple"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="border-tech-purple/30 focus:border-tech-purple"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4 bg-gradient-to-r from-tech-purple to-tech-blue text-white">
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === "orders" && (
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View your past orders and their status.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="py-6 text-center">
                    <Package className="mx-auto h-12 w-12 text-tech-purple/50" />
                    <h3 className="mt-2 text-lg font-medium">No orders yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">When you place orders, they will appear here.</p>
                    <Button asChild className="mt-4 bg-gradient-to-r from-tech-purple to-tech-blue text-white">
                      <Link href="/products">Browse Products</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "payments" && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="py-6 text-center">
                    <CreditCard className="mx-auto h-12 w-12 text-tech-purple/50" />
                    <h3 className="mt-2 text-lg font-medium">No payment methods</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Add a payment method to make checkout faster.</p>
                    <Button className="mt-4 bg-gradient-to-r from-tech-purple to-tech-blue text-white">
                      Add Payment Method
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "wishlist" && (
            <Card>
              <CardHeader>
                <CardTitle>Wishlist</CardTitle>
                <CardDescription>Products you've saved for later.</CardDescription>
              </CardHeader>
              <CardContent>
                {wishlistItems.length === 0 ? (
                  <div className="rounded-md border">
                    <div className="py-6 text-center">
                      <Heart className="mx-auto h-12 w-12 text-tech-purple/50" />
                      <h3 className="mt-2 text-lg font-medium">Your wishlist is empty</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Save items you're interested in for later.</p>
                      <Button asChild className="mt-4 bg-gradient-to-r from-tech-purple to-tech-blue text-white">
                        <Link href="/products">Browse Products</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistItems.map((productId) => {
                      const product = products.find((p) => p.id === productId)
                      if (!product) return null

                      return (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border rounded-lg overflow-hidden"
                        >
                          <div className="relative">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-40 object-cover"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 text-red-500 hover:bg-red-50 hover:text-red-700 bg-white/80 backdrop-blur-sm"
                              onClick={() => removeFromWishlist(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-tech-purple">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                            <p className="text-lg font-bold mt-1 price-tag">{formatPrice(product.price)}</p>

                            <div className="flex gap-2 mt-4">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 border-tech-purple/30 text-tech-purple hover:border-tech-purple"
                                onClick={() => handleAddToCart(product.id)}
                              >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Add to Cart
                              </Button>
                              <Button
                                asChild
                                size="sm"
                                className="flex-1 bg-gradient-to-r from-tech-purple to-tech-blue text-white"
                              >
                                <Link href={`/products/${product.id}`}>View</Link>
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="notifications">
                  <TabsList className="mb-4">
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="privacy">Privacy</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                  </TabsList>
                  <TabsContent value="notifications">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-muted-foreground">Receive emails about your account activity.</p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-tech-purple/30 text-tech-purple hover:border-tech-purple"
                        >
                          Manage
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Marketing Preferences</h4>
                          <p className="text-sm text-muted-foreground">Receive emails about new products and offers.</p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-tech-purple/30 text-tech-purple hover:border-tech-purple"
                        >
                          Manage
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
