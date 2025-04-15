"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingCart, Heart, Play, Pause, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import Link from "next/link"

interface Product {
  id: number
  name: string
  category: string
  price: number
  rating: number
  image: string
  specs: Record<string, string>
  badge?: string
  video?: string
  colors?: string[]
}

interface ProductQuickViewProps {
  product: Product
  onClose: () => void
}

export default function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "")
  const videoRef = useRef<HTMLVideoElement>(null)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 hover:bg-red-100 hover:text-red-600 transition-colors text-black"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative">
                <div className="relative aspect-video overflow-hidden">
                  {product.video ? (
                    <>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`}
                      />
                      <video
                        ref={videoRef}
                        src={product.video}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0"}`}
                        autoPlay={isPlaying}
                        loop
                        muted
                      />
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute bottom-4 right-4 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 z-10"
                        onClick={handlePlayVideo}
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                    </>
                  ) : (
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-tech-purple to-tech-blue text-white border-0 shadow-md">
                      {product.badge}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="p-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <h2 className="text-2xl font-bold mt-1 glow-text">{product.name}</h2>
                  <div className="mt-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-tech-purple to-tech-blue">
                    {formatPrice(product.price)}
                  </div>
                </motion.div>

                <motion.div
                  className="mt-4 space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-medium">Key Specifications</h3>
                  <div className="grid grid-cols-2 gap-y-2">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="col-span-2 flex">
                        <span className="w-1/3 text-muted-foreground capitalize">{key}</span>
                        <span className="w-2/3 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {product.colors && product.colors.length > 0 && (
                  <motion.div
                    className="mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="font-medium mb-2">Color</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <Button
                          key={color}
                          variant={color === selectedColor ? "default" : "outline"}
                          className={`rounded-full px-4 ${
                            color === selectedColor
                              ? "bg-gradient-to-r from-tech-purple to-tech-blue text-white"
                              : "border-gray-300 text-black hover:bg-tech-purple hover:text-white hover:border-tech-purple"
                          }`}
                          onClick={() => setSelectedColor(color)}
                        >
                          {color === selectedColor && <Check className="mr-2 h-4 w-4" />}
                          {color}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.div
                  className="mt-6 flex space-x-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    className="flex-1 bg-gradient-to-r from-tech-purple to-tech-blue text-white hover:shadow-lg transition-all duration-300"
                    onClick={() => {
                      addToCart(product)
                      onClose()
                    }}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`${
                      isInWishlist(product.id)
                        ? "bg-tech-pink text-white border-tech-pink"
                        : "border-gray-300 text-black hover:bg-tech-pink hover:text-white hover:border-tech-pink"
                    }`}
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-white" : ""}`} />
                  </Button>
                </motion.div>

                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button asChild variant="link" className="p-0 text-tech-blue hover:text-tech-blue/80">
                    <Link href={`/products/${product.id}`}>View Full Details</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
