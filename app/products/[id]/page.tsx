"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  ShoppingCart,
  Share2,
  Heart,
  ArrowLeft,
  Check,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Cpu,
  MemoryStick,
  Monitor,
  Battery,
  Loader2,
} from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { toast } from "@/hooks/use-toast"

// Sample product data
const products = [
  {
    id: 1,
    name: "ProBook Ultra",
    category: "Professional",
    price: 99990,
    rating: 4.8,
    reviewCount: 124,
    images: [
      "https://images.samsung.com/is/image/samsung/assets/us/computing/galaxybooks/galaxy-book4-ultra/GB4Ultra-HD01-HomeKV-D.jpg?imwidth=2560?height=600&width=800",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQsgI49tN-0zDEj-YzPdrGNzJ8fwyoaHyCg95GwxcWcW3S1txWgYl1jtHsXf8ceRpKikU&usqp=CAU?height=600&width=800",
      "https://www.laptopvip.vn/images/ab__webp/detailed/38/hk-en-galaxy-book4-156-inch-np750xgka-495803-np750xgk-kb3hk-539874180-www.laptopvip.vn-1725621302.webp?height=600&width=800",
    ],
    videos: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXXa1s5f9spPic-dez245r-vNkrLbsKapyTjJTZPKurmspkXrcab1YvNQlkvPWd-kI5Q4&usqp=CAU?height=600&width=800"],
    specs: {
      processor: "Intel Core i7-13700H",
      memory: "16GB DDR5",
      storage: "512GB NVMe SSD",
      display: '14" 2.8K OLED, 120Hz',
      graphics: "Intel Iris Xe Graphics",
      battery: "70Wh, up to 12 hours",
      weight: "1.3 kg",
      ports: "2x Thunderbolt 4, 1x USB-A, HDMI, Audio jack",
      wireless: "Wi-Fi 6E, Bluetooth 5.3",
      os: "Windows 11 Pro",
    },
    description:
      "The ProBook Ultra is designed for professionals who need reliable performance in a lightweight package. With the latest Intel processor and a stunning OLED display, it's perfect for productivity on the go.",
    features: [
      "Military-grade durability",
      "Backlit keyboard with 1.5mm key travel",
      "AI-powered noise cancellation",
      "Fingerprint reader and IR camera for secure login",
      "Fast charging: 60% in 49 minutes",
    ],
    badge: "Best Seller",
    colors: ["Silver", "Space Gray", "Midnight Blue"],
  },
  {
    id: 2,
    name: "StudioBook Pro",
    category: "Creator",
    price: 149990,
    rating: 4.7,
    reviewCount: 89,
    images: [
      "https://dlcdnwebimgs.asus.com/files/media/3a44c10f-9fc8-4ce3-a7df-b589813a5d05/v2/features/images/large/2x/kv.webp?height=600&width=800",
      "https://dlcdnwebimgs.asus.com/gain/45796652-41d9-4fac-9bd5-460d706e06ad/w800?height=600&width=800",
      "https://dlcdnwebimgs.asus.com/gain/07516e07-0320-4fc7-befb-e7716f07a134/w800?height=600&width=800",
    ],
    videos: ["https://dlcdnwebimgs.asus.com/gain/5f23f868-30e8-4add-9a25-12182c4cae89/w800?height=600&width=800"],
    specs: {
      processor: "Intel Core i9-13900H",
      memory: "32GB DDR5",
      storage: "1TB NVMe SSD",
      display: '16" 4K OLED, 120Hz',
      graphics: "NVIDIA RTX 4070 8GB",
      battery: "90Wh, up to 8 hours",
      weight: "2.0 kg",
      ports: "2x Thunderbolt 4, 2x USB-A, HDMI, SD card reader, Audio jack",
      wireless: "Wi-Fi 6E, Bluetooth 5.3",
      os: "Windows 11 Pro",
    },
    description:
      "The StudioBook Pro is engineered for content creators who demand exceptional performance. With a color-accurate 4K OLED display and powerful NVIDIA graphics, it's the ultimate creative workstation.",
    features: [
      "Pantone Validated display with 100% DCI-P3 coverage",
      "ASUS Dial for precise creative control",
      "Advanced thermal design with liquid metal compound",
      "Creator-optimized software suite",
      "Thunderbolt 4 for high-speed data transfers",
    ],
    badge: "New",
    colors: ["Star Black", "Ceramic White"],
  },
  {
    id: 3,
    name: "ROG Strix",
    category: "Gaming",
    price: 129990,
    rating: 4.9,
    reviewCount: 156,
    images: [
      "https://dlcdnwebimgs.asus.com/gain/CFE9CB59-216D-4AC9-AEAE-10054506055C/w1000/h732?height=600&width=800",
      "https://dlcdnwebimgs.asus.com/gain/5CA99398-7772-4CA9-8857-D19D4B0E5DD5/w1000/h732?height=600&width=800",
      "https://dlcdnwebimgs.asus.com/gain/26B3DFC8-6783-4FAB-BA61-D1A0AE10ED26/w1000/h732?height=600&width=800",
    ],
    videos: ["https://dlcdnwebimgs.asus.com/gain/A03C4AD2-ED61-4C5B-B39B-5D2FC6B6CFB0/w1000/h732?height=600&width=800"],
    specs: {
      processor: "AMD Ryzen 9 7945HX",
      memory: "32GB DDR5",
      storage: "1TB NVMe SSD",
      display: '15.6" QHD, 240Hz',
      graphics: "NVIDIA RTX 4060 8GB",
      battery: "90Wh, up to 6 hours",
      weight: "2.3 kg",
      ports: "1x Thunderbolt 4, 3x USB-A, HDMI, Ethernet, Audio jack",
      wireless: "Wi-Fi 6E, Bluetooth 5.3",
      os: "Windows 11 Home",
    },
    description:
      "The ROG Strix is built for gamers who demand the best. With a high-refresh display, powerful AMD processor, and NVIDIA RTX graphics, it delivers an immersive gaming experience.",
    features: [
      "Advanced cooling system with liquid metal",
      "Per-key RGB keyboard with Aura Sync",
      "Virtual 7.1 surround sound",
      "AI-powered noise cancellation for clear communication",
      "Customizable performance modes",
    ],
    badge: "Top Rated",
    colors: ["Eclipse Gray", "Nebula Red"],
  },
  {
    id: 4,
    name: "ZenBook 14",
    category: "Ultrabook",
    price: 89990,
    rating: 4.6,
    reviewCount: 112,
    images: [
      "https://dlcdnwebimgs.asus.com/files/media/87d135b1-7e5d-4637-8b58-a8651d4a4cc1/v1/features/images/large/2x/kv/kv.webp?height=600&width=800",
      "https://dlcdnwebimgs.asus.com/gain/428cc0dd-7ac1-49c7-84ee-0314e5c993c9/w800?height=600&width=800",
      "https://dlcdnwebimgs.asus.com/gain/ad84a84b-50a3-4d62-a6e3-9a3574692fc3/w800?height=600&width=800",
    ],
    videos: ["https://dlcdnwebimgs.asus.com/gain/8414b1d4-7414-49b8-90c8-f4754ddbcac3/w800?height=600&width=800"],
    specs: {
      processor: "Intel Core i5-1340P",
      memory: "16GB LPDDR5",
      storage: "512GB NVMe SSD",
      display: '14" 2.8K OLED, 90Hz',
      graphics: "Intel Iris Xe Graphics",
      battery: "75Wh, up to 14 hours",
      weight: "1.1 kg",
      ports: "2x Thunderbolt 4, 1x USB-A, HDMI, Audio jack",
      wireless: "Wi-Fi 6E, Bluetooth 5.3",
      os: "Windows 11 Home",
    },
    description:
      "The ZenBook 14 combines premium design with exceptional portability. Weighing just 1.1 kg and featuring a stunning OLED display, it's perfect for professionals on the go.",
    features: [
      "Ultra-lightweight magnesium-aluminum alloy chassis",
      "ErgoLift hinge for improved typing position",
      "NumberPad 2.0 integrated into touchpad",
      "AI noise cancellation for clear video calls",
      "Military-grade durability certification",
    ],
    badge: "Lightweight",
    colors: ["Pine Gray", "Lilac Mist"],
  },
  {
    id: 5,
    name: "TUF Gaming A15",
    category: "Gaming",
    price: 94990,
    rating: 4.5,
    reviewCount: 98,
    images: [
      "https://in.store.asus.com/media/catalog/product/1/_/1._main_f15.jpg?width=439&height=439&store=en_IN&image-type=image?height=600&width=800",
      "https://in.store.asus.com/media/catalog/product/9/_/9._design_1.png?width=439&height=439&store=en_IN&image-type=image?height=600&width=800",
      "https://in.store.asus.com/media/catalog/product/1/2/12._military_grade_1.jpg?width=439&height=439&store=en_IN&image-type=image?height=600&width=800",
    ],
    videos: ["https://www.asus.com/WebsitesBanner/IN/banners/q9ley2hnciq9ilwr/q9ley2hnciq9ilwr-0_0_desktop_0_2X.jpg?webp?height=600&width=800"],
    specs: {
      processor: "AMD Ryzen 7 7735HS",
      memory: "16GB DDR5",
      storage: "1TB NVMe SSD",
      display: '15.6" FHD, 144Hz',
      graphics: "NVIDIA RTX 3050 Ti 4GB",
      battery: "90Wh, up to 5 hours",
      weight: "2.2 kg",
      ports: "1x USB-C, 3x USB-A, HDMI, Ethernet, Audio jack",
      wireless: "Wi-Fi 6, Bluetooth 5.2",
      os: "Windows 11 Home",
    },
    description: "Durable gaming laptop with powerful performance at an accessible price point.",
    features: [
      "Military-grade durability",
      "Self-cleaning dual fans with anti-dust technology",
      "RGB backlit keyboard",
      "DTS:X Ultra for 7.1 surround sound",
      "TUF Gaming software suite",
    ],
    badge: "Value",
    colors: ["Graphite Black", "Jaeger Gray"],
  },
  {
    id: 6,
    name: "VivoBook Pro",
    category: "Creator",
    price: 109990,
    rating: 4.4,
    reviewCount: 76,
    images: [
      "https://dlcdnwebimgs.asus.com/gain/d17c5603-7f8a-4809-bedd-0b1b3280c566/w800?height=600&width=800",
      "https://dlcdnwebimgs.asus.com/gain/9153c5dc-c4af-4d1a-af00-0c5462c9ea5b/w800?height=600&width=800",
      "https://dlcdnwebimgs.asus.com/gain/d3c18490-5ae4-41ed-8e0b-979effd47fd6/w800?height=600&width=800",
    ],
    videos: ["https://dlcdnwebimgs.asus.com/gain/62f87825-5590-47fb-a33c-74839e597e00/w800?height=600&width=800"],
    specs: {
      processor: "Intel Core i7-13700H",
      memory: "16GB DDR5",
      storage: "1TB NVMe SSD",
      display: '16" 2.5K, 120Hz',
      graphics: "NVIDIA RTX 3050 4GB",
      battery: "70Wh, up to 9 hours",
      weight: "1.8 kg",
      ports: "1x Thunderbolt 4, 2x USB-A, HDMI, Audio jack",
      wireless: "Wi-Fi 6E, Bluetooth 5.3",
      os: "Windows 11 Home",
    },
    description: "Powerful laptop for creative professionals with a stunning display and discrete graphics.",
    features: [
      "OLED display with 100% DCI-P3 color gamut",
      "ASUS DialPad for creative control",
      "Harman Kardon-certified audio",
      "IR camera for facial recognition",
      "ASUS IceCool thermal technology",
    ],
    badge: "Creator",
    colors: ["Quiet Blue", "Cool Silver"],
  },
  {
    id: 7,
    name: "ExpertBook B9",
    category: "Professional",
    price: 119990,
    rating: 4.7,
    reviewCount: 65,
    images: [
      "https://dlcdnwebimgs.asus.com/gain/a5cc741e-6c72-4878-99b7-e62c0f67b4c3/w800/fwebp?height=600&width=800",
      "https://dlcdnwebimgs.asus.com/gain/da108796-40dd-465f-ac81-265c85529d6a/w800/fwebp?height=600&width=800",
      "https://dlcdnwebimgs.asus.com/gain/8bc75e3d-2b11-4f3f-bb5d-d3e9f94bc803/w800/fwebp?height=600&width=800",
    ],
    videos: ["https://dlcdnwebimgs.asus.com/gain/32292095-2813-4079-8505-2604a5d4e71d/w800/fwebp?height=600&width=800"],
    specs: {
      processor: "Intel Core i7-1355U",
      memory: "32GB LPDDR5",
      storage: "1TB NVMe SSD",
      display: '14" FHD+, 60Hz',
      graphics: "Intel Iris Xe Graphics",
      battery: "66Wh, up to 16 hours",
      weight: "0.88 kg",
      ports: "2x Thunderbolt 4, 1x USB-A, HDMI, Audio jack",
      wireless: "Wi-Fi 6E, Bluetooth 5.3",
      os: "Windows 11 Pro",
    },
    description: "Ultra-lightweight business laptop with enterprise-grade security features.",
    features: [
      "World's lightest 14-inch business laptop",
      "US military-grade durability",
      "Trusted Platform Module (TPM) 2.0",
      "IR camera with Windows Hello support",
      "Spill-resistant keyboard",
    ],
    badge: "Business",
    colors: ["Star Black"],
  },
  {
    id: 8,
    name: "Swift Edge",
    category: "Ultrabook",
    price: 79990,
    rating: 4.3,
    reviewCount: 54,
    images: [
      "https://images.acer.com/is/image/acer/acer-laptop-swift-Edge-16-optimized-brilliance:KSP-with-Specs-XL?height=600&width=800",
      "https://images.acer.com/is/image/acer/acer-laptop-swift-Edge-16-indulge-your-eyes-with-a-swift-oled-laptop-1:KSP-with-Specs-XL?height=600&width=800",
      "https://images.acer.com/is/image/acer/acer-laptop-swift-Edge-16-the-connectivity:KSP-with-Specs-XL?height=600&width=800",
    ],
    videos: ["https://images.acer.com/is/image/acer/acer-laptop-swift-Edge-16-freedom-to-move-freedom-to-unplug-1:KSP-with-Specs-XL?height=600&width=800"],
    specs: {
      processor: "AMD Ryzen 7 7840U",
      memory: "16GB LPDDR5",
      storage: "512GB NVMe SSD",
      display: '16" 4K OLED, 60Hz',
      graphics: "AMD Radeon Graphics",
      battery: "54Wh, up to 10 hours",
      weight: "1.2 kg",
      ports: "2x USB-C, 2x USB-A, HDMI, Audio jack",
      wireless: "Wi-Fi 6E, Bluetooth 5.3",
      os: "Windows 11 Home",
    },
    description: "Ultra-thin laptop with a large 16-inch OLED display in a lightweight package.",
    features: [
      "World's lightest 16-inch OLED laptop",
      "100% DCI-P3 color gamut",
      "Microsoft Pluton security processor",
      "Antimicrobial Corning Gorilla Glass",
      "TwinAir cooling system",
    ],
    badge: "Lightweight",
    colors: ["Olivine Black", "Misty Green"],
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("specifications")
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState("")
  const [wishlist, setWishlist] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const { addToCart } = useCart()
  const videoRef = useRef<HTMLVideoElement>(null)

  // Get product ID from params
  const productId = Number.parseInt(params.id, 10)

  // Find the product
  const product = products.find((p) => p.id === productId)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)

      // Set default color if product exists
      if (product && product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0])
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [product])

  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      })

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    }
  }

  const toggleWishlist = () => {
    if (!product) return

    setWishlist((prev) => {
      if (prev.includes(product.id)) {
        toast({
          title: "Removed from wishlist",
          description: "Product has been removed from your wishlist",
        })
        return prev.filter((id) => id !== product.id)
      } else {
        toast({
          title: "Added to wishlist",
          description: "Product has been added to your wishlist",
        })
        return [...prev, product.id]
      }
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || "Product",
        text: product?.description || "",
        url: window.location.href,
      })
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this product with others",
      })
    }
  }

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-[50vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Loader2 className="h-12 w-12 text-primary mb-4" />
          </motion.div>
          <p className="text-muted-foreground">Loading product details...</p>
        </div>
      </motion.div>
    )
  }

  // Product not found
  if (!product) {
    return (
      <motion.div
        className="container py-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/products">Browse All Products</Link>
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="container py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-video rounded-lg overflow-hidden border relative">
            <AnimatePresence mode="wait">
              {isVideoPlaying ? (
                <motion.video
                  key="video"
                  ref={videoRef}
                  src={product.videos[0]}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  autoPlay
                  loop
                  muted
                />
              ) : (
                <motion.img
                  key={`image-${activeImageIndex}`}
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>

            {product.badge && (
              <Badge className="absolute top-4 right-4 bg-gradient-to-r from-tech-purple to-tech-blue text-white border-0">
                {product.badge}
              </Badge>
            )}

            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full pointer-events-auto opacity-80 hover:opacity-100 bg-white/20 backdrop-blur-sm"
                onClick={() => {
                  setActiveImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
                  setIsVideoPlaying(false)
                }}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full pointer-events-auto opacity-80 hover:opacity-100 bg-white/20 backdrop-blur-sm"
                onClick={() => {
                  setActiveImageIndex((prev) => (prev + 1) % product.images.length)
                  setIsVideoPlaying(false)
                }}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {product.videos && product.videos.length > 0 && (
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-4 right-4 rounded-full bg-white/20 backdrop-blur-sm"
                onClick={handlePlayVideo}
              >
                {isVideoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <motion.div
                key={index}
                className={`cursor-pointer border rounded-md overflow-hidden ${
                  index === activeImageIndex && !isVideoPlaying ? "ring-2 ring-primary" : ""
                }`}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setActiveImageIndex(index)
                  setIsVideoPlaying(false)
                }}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover aspect-video"
                />
              </motion.div>
            ))}

            {product.videos && product.videos.length > 0 && (
              <motion.div
                className={`cursor-pointer border rounded-md overflow-hidden relative ${
                  isVideoPlaying ? "ring-2 ring-primary" : ""
                }`}
                whileHover={{ scale: 1.05 }}
                onClick={handlePlayVideo}
              >
                <img
                  src={product.videos[0] || "/placeholder.svg"}
                  alt={`${product.name} video`}
                  className="w-full h-full object-cover aspect-video"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <Play className="h-6 w-6 text-white" />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Product Details */}
        <div>
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center">
              <Badge className="mr-2">{product.category}</Badge>
              {product.badge && <Badge variant="secondary">{product.badge}</Badge>}
            </div>

            <motion.h1
              className="text-3xl font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-tech-purple to-tech-blue"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {product.name}
            </motion.h1>

            <motion.div
              className="flex items-center mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm font-medium">{product.rating}</span>
              <span className="mx-2 text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
            </motion.div>

            <motion.div
              className="mt-4 text-3xl font-bold price-tag"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {formatPrice(product.price)}
            </motion.div>

            <motion.p
              className="mt-4 text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {product.description}
            </motion.p>
          </motion.div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
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
                        : "border-tech-purple/30 text-tech-purple hover:border-tech-purple"
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

          {/* Action Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Button
              size="lg"
              className="flex-1 bg-gradient-to-r from-tech-purple to-tech-blue text-white hover:shadow-lg transition-all duration-300 pulse-glow"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="flex-1 border-tech-purple/30 text-tech-purple hover:border-tech-purple"
              onClick={() => {
                handleAddToCart()
                window.location.href = "/checkout"
              }}
            >
              Buy Now
            </Button>

            <Button
              size="icon"
              variant={wishlist.includes(product.id) ? "default" : "outline"}
              className={wishlist.includes(product.id) ? "bg-rose-500 text-white" : ""}
              onClick={toggleWishlist}
            >
              <Heart className={`h-5 w-5 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
            </Button>

            <Button
              size="icon"
              variant="outline"
              className="border-tech-purple/30 text-tech-purple hover:border-tech-purple"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </motion.div>

          {/* Key Features */}
          <motion.div
            className="border rounded-lg p-4 mb-6 gradient-border"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h3 className="font-medium mb-2">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                >
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Specifications Tabs */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <Tabs defaultValue="specifications" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="specifications" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Technical Specifications</h3>
                    <div className="space-y-2">
                      {Object.entries(product.specs).map(([key, value], index) => (
                        <motion.div
                          key={key}
                          className="grid grid-cols-2 py-2 border-b last:border-0"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <div className="font-medium capitalize flex items-center">
                            {key === "processor" && <Cpu className="mr-2 h-4 w-4 text-tech-purple" />}
                            {key === "memory" && <MemoryStick className="mr-2 h-4 w-4 text-tech-purple" />}
                            {key === "display" && <Monitor className="mr-2 h-4 w-4 text-tech-purple" />}
                            {key === "battery" && <Battery className="mr-2 h-4 w-4 text-tech-purple" />}
                            {key.replace("_", " ")}
                          </div>
                          <div>{value}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h3 className="text-lg font-medium mb-4">Compare with Similar Products</h3>
                    <Button asChild className="w-full bg-gradient-to-r from-tech-purple to-tech-blue text-white">
                      <Link href="/compare">Compare Products</Link>
                    </Button>
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg font-medium mb-2">Product Reviews</h3>
                  <p className="text-muted-foreground mb-4">
                    This product has {product.reviewCount} reviews with an average rating of {product.rating} stars.
                  </p>
                  <Button className="bg-gradient-to-r from-tech-purple to-tech-blue text-white">
                    View All Reviews
                  </Button>
                </motion.div>
              </TabsContent>

              <TabsContent value="support" className="mt-6">
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div>
                    <h3 className="text-lg font-medium mb-2">Downloads</h3>
                    <ul className="space-y-2">
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <Link href="#" className="text-blue-600 hover:underline">
                          User Manual (PDF)
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <Link href="#" className="text-blue-600 hover:underline">
                          Driver Package
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <Link href="#" className="text-blue-600 hover:underline">
                          Software Utilities
                        </Link>
                      </motion.li>
                    </ul>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <h3 className="text-lg font-medium mb-2">Warranty Information</h3>
                    <p>
                      This product comes with a 2-year limited warranty covering parts and labor. Extended warranty
                      options are available at checkout.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <h3 className="text-lg font-medium mb-2">Contact Support</h3>
                    <Button className="bg-gradient-to-r from-tech-purple to-tech-blue text-white">
                      Contact Support Team
                    </Button>
                  </motion.div>
                </motion.div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
