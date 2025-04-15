"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, ShoppingCart, Menu, User, Heart, LogOut, Settings, HelpCircle, X } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { useWishlist } from "@/hooks/use-wishlist"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CartDrawer from "./cart-drawer"
import AuthDialog from "./auth-dialog"

const categories = [
  {
    title: "Professional",
    href: "/products?category=professional",
    description: "High-performance laptops for business and productivity",
  },
  {
    title: "Gaming",
    href: "/products?category=gaming",
    description: "Powerful machines designed for immersive gaming experiences",
  },
  {
    title: "Creator",
    href: "/products?category=creator",
    description: "Precision-engineered laptops for content creators and designers",
  },
  {
    title: "Ultrabook",
    href: "/products?category=ultrabook",
    description: "Thin and light laptops with exceptional battery life",
  },
]

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false)
  const [showCartDrawer, setShowCartDrawer] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { totalItems } = useCart()
  const { user, signOut, isAuthenticated } = useAuth()
  const { items: wishlistItems } = useWishlist()
  const router = useRouter()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleWishlistClick = () => {
    if (isAuthenticated) {
      router.push("/wishlist")
    } else {
      setShowAuthDialog(true)
    }
  }

  // Handle search submission
  const handleSearch = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }

    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setShowSearch(false)
      setSearchQuery("")
    }
  }

  // Handle Enter key in search input
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <>
      <div className="h-0.5 bg-primary" />
      <header
        className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
          scrolled ? "bg-background/95 shadow-sm" : "bg-background/60"
        }`}
      >
        <div className="container flex h-16 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4">
                <Link href="/" className="font-bold text-xl mb-4 gradient-text">
                  TECH LAPTOPS
                </Link>
                <Link href="/products" className="font-medium">
                  All Products
                </Link>
                {categories.map((category) => (
                  <Link key={category.title} href={category.href} className="text-muted-foreground hover:text-primary">
                    {category.title}
                  </Link>
                ))}
                <Link href="/compare" className="font-medium">
                  Compare
                </Link>
                <Link href="/reviews" className="font-medium">
                  Reviews
                </Link>
                <Link href="/support" className="font-medium">
                  Support
                </Link>
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full justify-start btn-outline" onClick={handleWishlistClick}>
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                    {wishlistItems.length > 0 && (
                      <span className="ml-2 h-5 w-5 rounded-full bg-rose-500 text-xs text-white flex items-center justify-center">
                        {wishlistItems.length}
                      </span>
                    )}
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2 md:gap-6">
            <div className="hidden md:block">
              <Link href="/" className="font-bold text-xl gradient-text">
                TECH LAPTOPS
              </Link>
            </div>

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {categories.map((category) => (
                        <li key={category.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={category.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary"
                            >
                              <div className="text-sm font-medium leading-none">{category.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {category.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/compare" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Compare</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/reviews" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Reviews</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/support" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Support</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex flex-1 items-center justify-end gap-2">
            {showSearch ? (
              <form onSubmit={handleSearch} className="relative w-full max-w-sm">
                <Input
                  placeholder="Search products..."
                  className="pr-8"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 border-0"
                  onClick={() => {
                    setShowSearch(false)
                    setSearchQuery("")
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <>
                <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)} className="hidden md:flex">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>

                <Button variant="ghost" size="icon" className="hidden md:flex relative" onClick={handleWishlistClick}>
                  <Heart className="h-5 w-5" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-rose-500 text-xs text-white flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                  <span className="sr-only">Wishlist</span>
                </Button>

                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                          <AvatarFallback className="bg-primary text-white">{user?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user?.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/orders" className="cursor-pointer">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          <span>Orders</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/wishlist" className="cursor-pointer">
                          <Heart className="mr-2 h-4 w-4" />
                          <span>Wishlist</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/support" className="cursor-pointer">
                          <HelpCircle className="mr-2 h-4 w-4" />
                          <span>Support</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={signOut}
                        className="cursor-pointer text-red-500 hover:text-white hover:bg-red-500"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="ghost" size="icon" onClick={() => setShowAuthDialog(true)}>
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Button>
                )}

                <Button variant="ghost" size="icon" className="relative" onClick={() => setShowCartDrawer(true)}>
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                  {totalItems > 0 && (
                    <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <CartDrawer open={showCartDrawer} onClose={() => setShowCartDrawer(false)} />
      <AuthDialog open={showAuthDialog} onClose={() => setShowAuthDialog(false)} />
    </>
  )
}
