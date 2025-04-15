"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, ArrowRight, Eye, Heart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import ProductQuickView from "./product-quick-view"

const products = [
  {
    id: 1,
    name: "ProBook Ultra",
    category: "Professional",
    price: 99990,
    rating: 4.8,
    image: "https://images.samsung.com/is/image/samsung/assets/us/computing/galaxybooks/galaxy-book4-ultra/GB4Ultra-HD01-HomeKV-D.jpg?imwidth=2560",
    specs: {
      processor: "Intel Core i7-13700H",
      memory: "16GB DDR5",
      storage: "512GB NVMe SSD",
      display: '14" 2.8K OLED, 120Hz',
    },
    badge: "Best Seller",
    video: "/placeholder.svg?height=300&width=400",
    colors: ["Silver", "Space Gray", "Midnight Blue"],
  },
  {
    id: 2,
    name: "StudioBook Pro",
    category: "Creator",
    price: 149990,
    rating: 4.7,
    image: "https://dlcdnwebimgs.asus.com/files/media/3a44c10f-9fc8-4ce3-a7df-b589813a5d05/v2/features/images/large/2x/kv.webp?height=300&width=400",
    specs: {
      processor: "Intel Core i9-13900H",
      memory: "32GB DDR5",
      storage: "1TB NVMe SSD",
      display: '16" 4K OLED, 120Hz',
    },
    badge: "New",
    video: "/placeholder.svg?height=300&width=400",
    colors: ["Star Black", "Ceramic White"],
  },
  {
    id: 3,
    name: "ROG Strix",
    category: "Gaming",
    price: 129990,
    rating: 4.9,
    image: "https://dlcdnwebimgs.asus.com/gain/CFE9CB59-216D-4AC9-AEAE-10054506055C/w1000/h732?height=300&width=400",
    specs: {
      processor: "AMD Ryzen 9 7945HX",
      memory: "32GB DDR5",
      storage: "1TB NVMe SSD",
      display: '15.6" QHD, 240Hz',
    },
    badge: "Top Rated",
    video: "/placeholder.svg?height=300&width=400",
    colors: ["Eclipse Gray", "Nebula Red"],
  },
]

export default function FeaturedProducts() {
  const [quickViewProduct, setQuickViewProduct] = useState<number | null>(null)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })
  const [isVisible, setIsVisible] = useState(false)

  // Check if component is visible in viewport
  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true)
    }
  }, [isInView, isVisible])

  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="w-full"
        >
          <Card className="overflow-hidden h-full flex flex-col border card-hover">
            <div className="relative">
              <Link href={`/products/${product.id}`}>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-[220px] object-cover"
                />
              </Link>
              {product.badge && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-primary text-white border-0">{product.badge}</Badge>
                </div>
              )}
              <div className="absolute top-3 left-3 flex gap-2 z-10">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/90 backdrop-blur-sm text-black border-0 shadow-sm hover:bg-primary hover:text-white"
                  onClick={() => setQuickViewProduct(product.id)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full backdrop-blur-sm border-0 shadow-sm ${
                    isInWishlist(product.id)
                      ? "bg-rose-500 text-white"
                      : "bg-white/90 text-black hover:bg-rose-500 hover:text-white"
                  }`}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-white" : ""}`} />
                </Button>
              </div>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <CardTitle className="mt-1 text-primary hover:underline">
                    <Link href={`/products/${product.id}`}>{product.name}</Link>
                  </CardTitle>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 text-sm font-medium">{product.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-muted-foreground">Processor</div>
                  <div className="font-medium">{product.specs.processor}</div>

                  <div className="text-muted-foreground">Memory</div>
                  <div className="font-medium">{product.specs.memory}</div>

                  <div className="text-muted-foreground">Storage</div>
                  <div className="font-medium">{product.specs.storage}</div>

                  <div className="text-muted-foreground">Display</div>
                  <div className="font-medium">{product.specs.display}</div>
                </div>
              </div>
              <div className="mt-4 text-2xl font-bold gradient-text">{formatPrice(product.price)}</div>

              <div className="mt-3 flex flex-wrap gap-1">
                {product.colors?.map((color, i) => (
                  <span
                    key={i}
                    className="inline-block px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="btn-outline" onClick={() => addToCart(product)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button asChild className="btn-primary">
                <Link href={`/products/${product.id}`}>
                  Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}

      {quickViewProduct && (
        <ProductQuickView
          product={products.find((p) => p.id === quickViewProduct)!}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  )
}
