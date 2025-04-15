"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShoppingCart, Trash2, Heart } from "lucide-react"
import { useWishlist } from "@/hooks/use-wishlist"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"
import EnhancedProductAnimation from "./enhanced-product-animations"

// Sample product data - this would typically come from an API
const products = [
  {
    id: 1,
    name: "ProBook Ultra",
    category: "Professional",
    price: 99990,
    image: "https://hp.widen.net/content/nwromex1oa/webp/nwromex1oa.png?w=573&dpi=72&color=ffffff00?height=300&width=400",
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

export default function WishlistPage() {
  const { items: wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [isClearing, setIsClearing] = useState(false)

  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
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

  const handleClearWishlist = () => {
    setIsClearing(true)
    setTimeout(() => {
      clearWishlist()
      setIsClearing(false)
    }, 300)
  }

  const wishlistProducts = products.filter((product) => wishlistItems.includes(product.id))

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-tech-purple to-tech-blue">
            My Wishlist
          </h1>
          <p className="text-muted-foreground mt-2">Products you've saved for later</p>
        </div>
        {wishlistItems.length > 0 && (
          <Button
            variant="outline"
            className="text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200"
            onClick={handleClearWishlist}
            disabled={isClearing}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Wishlist
          </Button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 border rounded-lg"
        >
          <Heart className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Save items you're interested in for later by clicking the heart icon on any product.
          </p>
          <Button asChild className="bg-gradient-to-r from-tech-purple to-tech-blue text-white">
            <Link href="/products">Browse Products</Link>
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product, index) => (
            <EnhancedProductAnimation key={product.id} category={product.category} delay={index * 0.1} id={product.id}>
              <Card className="overflow-hidden h-full flex flex-col border hover:shadow-md transition-all duration-300">
                <div className="relative">
                  <Link href={`/products/${product.id}`}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-red-500 hover:bg-red-50 hover:text-red-700 bg-white/80 backdrop-blur-sm"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-medium text-tech-purple">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <p className="text-lg font-bold mt-1 price-tag">{formatPrice(product.price)}</p>

                  <div className="flex gap-2 mt-auto pt-4">
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
              </Card>
            </EnhancedProductAnimation>
          ))}
        </div>
      )}
    </div>
  )
}
