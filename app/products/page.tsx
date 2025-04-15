"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, ArrowRight, Heart, Search, Eye } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import ProductQuickView from "@/components/product-quick-view"
import EnhancedProductAnimation from "@/components/enhanced-product-animations"

// Sample product data
const products = [
  {
    id: 1,
    name: "ProBook Ultra",
    category: "Professional",
    price: 99990,
    rating: 4.8,
    image: "https://images.samsung.com/is/image/samsung/assets/us/computing/galaxybooks/galaxy-book4-ultra/GB4Ultra-HD01-HomeKV-D.jpg?height=300&width=400",
    hoverImage: "https://images.samsung.com/is/image/samsung/assets/us/computing/galaxybooks/galaxy-book4-ultra/GB4Ultra-HD01-HomeKV-D.jpg?height=300&width=400&text=Hover",
    specs: {
      processor: "Intel Core i7-13700H",
      memory: "16GB DDR5",
      storage: "512GB NVMe SSD",
      display: '14" 2.8K OLED, 120Hz',
    },
    badge: "Best Seller",
    video: "https://hp.widen.net/content/nwromex1oa/webp/nwromex1oa.png?w=573&dpi=72&color=ffffff00?height=300&width=400",
    colors: ["Silver", "Space Gray", "Midnight Blue"],
  },
  {
    id: 2,
    name: "StudioBook Pro",
    category: "Creator",
    price: 149990,
    rating: 4.7,
    image: "https://dlcdnwebimgs.asus.com/files/media/3a44c10f-9fc8-4ce3-a7df-b589813a5d05/v2/features/images/large/2x/kv.webp?height=300&width=400",
    hoverImage: "https://dlcdnwebimgs.asus.com/files/media/3a44c10f-9fc8-4ce3-a7df-b589813a5d05/v2/features/images/large/2x/kv.webp?height=300&width=400&text=Hover",
    specs: {
      processor: "Intel Core i9-13900H",
      memory: "32GB DDR5",
      storage: "1TB NVMe SSD",
      display: '16" 4K OLED, 120Hz',
    },
    badge: "New",
    video: "https://dlcdnwebimgs.asus.com/files/media/3a44c10f-9fc8-4ce3-a7df-b589813a5d05/v2/features/images/large/2x/kv.webp?height=300&width=400",
    colors: ["Star Black", "Ceramic White"],
  },
  {
    id: 3,
    name: "ROG Strix",
    category: "Gaming",
    price: 129990,
    rating: 4.9,
    image: "https://dlcdnwebimgs.asus.com/gain/CFE9CB59-216D-4AC9-AEAE-10054506055C/w1000/h732?height=300&width=400",
    hoverImage: "https://dlcdnwebimgs.asus.com/gain/CFE9CB59-216D-4AC9-AEAE-10054506055C/w1000/h732?height=300&width=400&text=Hover",
    specs: {
      processor: "AMD Ryzen 9 7945HX",
      memory: "32GB DDR5",
      storage: "1TB NVMe SSD",
      display: '15.6" QHD, 240Hz',
    },
    badge: "Top Rated",
    video: "https://dlcdnwebimgs.asus.com/gain/CFE9CB59-216D-4AC9-AEAE-10054506055C/w1000/h732?height=300&width=400",
    colors: ["Eclipse Gray", "Nebula Red"],
  },
  {
    id: 4,
    name: "ZenBook 14",
    category: "Ultrabook",
    price: 89990,
    rating: 4.6,
    image: "https://dlcdnwebimgs.asus.com/files/media/87d135b1-7e5d-4637-8b58-a8651d4a4cc1/v1/features/images/large/2x/kv/kv.webp?height=300&width=400",
    hoverImage: "https://dlcdnwebimgs.asus.com/files/media/87d135b1-7e5d-4637-8b58-a8651d4a4cc1/v1/features/images/large/2x/kv/kv.webp?height=300&width=400&text=Hover",
    specs: {
      processor: "Intel Core i5-1340P",
      memory: "16GB LPDDR5",
      storage: "512GB NVMe SSD",
      display: '14" 2.8K OLED, 90Hz',
    },
    badge: "Lightweight",
    video: "https://dlcdnwebimgs.asus.com/files/media/87d135b1-7e5d-4637-8b58-a8651d4a4cc1/v1/features/images/large/2x/kv/kv.webp?height=300&width=400",
    colors: ["Pine Gray", "Lilac Mist"],
  },
  {
    id: 5,
    name: "TUF Gaming A15",
    category: "Gaming",
    price: 94990,
    rating: 4.5,
    image: "https://in.store.asus.com/media/catalog/product/1/_/1._main_f15.jpg?width=439&height=439&store=en_IN&image-type=image?height=300&width=400",
    hoverImage: "https://in.store.asus.com/media/catalog/product/1/_/1._main_f15.jpg?width=439&height=439&store=en_IN&image-type=image?height=300&width=400&text=Hover",
    specs: {
      processor: "AMD Ryzen 7 7735HS",
      memory: "16GB DDR5",
      storage: "1TB NVMe SSD",
      display: '15.6" FHD, 144Hz',
    },
    video: "https://in.store.asus.com/media/catalog/product/1/_/1._main_f15.jpg?width=439&height=439&store=en_IN&image-type=image?height=300&width=400",
    colors: ["Graphite Black", "Jaeger Gray"],
  },
  {
    id: 6,
    name: "VivoBook Pro",
    category: "Creator",
    price: 109990,
    rating: 4.4,
    image: "https://dlcdnwebimgs.asus.com/gain/d17c5603-7f8a-4809-bedd-0b1b3280c566/w800?height=300&width=400",
    hoverImage: "https://dlcdnwebimgs.asus.com/gain/d17c5603-7f8a-4809-bedd-0b1b3280c566/w800?height=300&width=400&text=Hover",
    specs: {
      processor: "Intel Core i7-13700H",
      memory: "16GB DDR5",
      storage: "1TB NVMe SSD",
      display: '16" 2.5K, 120Hz',
    },
    video: "https://dlcdnwebimgs.asus.com/gain/d17c5603-7f8a-4809-bedd-0b1b3280c566/w800?height=300&width=400",
    colors: ["Quiet Blue", "Cool Silver"],
  },
  {
    id: 7,
    name: "ExpertBook B9",
    category: "Professional",
    price: 119990,
    rating: 4.7,
    image: "https://dlcdnwebimgs.asus.com/gain/a5cc741e-6c72-4878-99b7-e62c0f67b4c3/w800/fwebp?height=300&width=400",
    hoverImage: "https://dlcdnwebimgs.asus.com/gain/a5cc741e-6c72-4878-99b7-e62c0f67b4c3/w800/fwebp?height=300&width=400&text=Hover",
    specs: {
      processor: "Intel Core i7-1355U",
      memory: "32GB LPDDR5",
      storage: "1TB NVMe SSD",
      display: '14" FHD+, 60Hz',
    },
    badge: "Business",
    video: "https://dlcdnwebimgs.asus.com/gain/a5cc741e-6c72-4878-99b7-e62c0f67b4c3/w800/fwebp?height=300&width=400",
    colors: ["Star Black"],
  },
  {
    id: 8,
    name: "Swift Edge",
    category: "Ultrabook",
    price: 79990,
    rating: 4.3,
    image: "https://images.acer.com/is/image/acer/acer-laptop-swift-Edge-16-optimized-brilliance:KSP-with-Specs-XL?height=300&width=400",
    hoverImage: "https://images.acer.com/is/image/acer/acer-laptop-swift-Edge-16-optimized-brilliance:KSP-with-Specs-XL?height=300&width=400&text=Hover",
    specs: {
      processor: "AMD Ryzen 7 7840U",
      memory: "16GB LPDDR5",
      storage: "512GB NVMe SSD",
      display: '16" 4K OLED, 60Hz',
    },
    video: "https://images.acer.com/is/image/acer/acer-laptop-swift-Edge-16-optimized-brilliance:KSP-with-Specs-XL?height=300&width=400",
    colors: ["Olivine Black", "Misty Green"],
  },
]

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("latest")
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [quickViewProduct, setQuickViewProduct] = useState<number | null>(null)
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { addToCart } = useCart()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pageRef = useRef<HTMLDivElement>(null)

  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Initialize from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    const searchParam = searchParams.get("search")

    if (categoryParam) {
      setActiveCategory(categoryParam.toLowerCase())
    }

    if (searchParam) {
      setSearchQuery(searchParam)
    }

    // Scroll to top when page loads or parameters change
    if (pageRef.current) {
      pageRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [searchParams])

  // Filter and sort products
  useEffect(() => {
    let result = [...products]

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((product) => product.category.toLowerCase() === activeCategory.toLowerCase())
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          Object.values(product.specs).some((spec) => typeof spec === "string" && spec.toLowerCase().includes(query)),
      )
    }

    // Sort products
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "latest":
      default:
        // Assume id represents newest first
        result.sort((a, b) => b.id - a.id)
        break
    }

    setFilteredProducts(result)
  }, [activeCategory, searchQuery, sortOption])

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })
  }

  // Handle category change with URL update
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)

    // Update URL without full page reload
    const params = new URLSearchParams(searchParams.toString())

    if (category === "all") {
      params.delete("category")
    } else {
      params.set("category", category)
    }

    // Update the URL without causing a navigation/reload
    router.push(`/products?${params.toString()}`, { scroll: false })
  }

  return (
    <main className="container py-12" ref={pageRef}>
      <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-tech-purple to-tech-blue">
        Our Laptops
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <p className="text-muted-foreground">Find the perfect laptop for your needs</p>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={handleCategoryChange} className="mb-8">
        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap whitespace-nowrap">
          <TabsTrigger value="all" className="w-full">
            All
          </TabsTrigger>
          <TabsTrigger value="professional" className="w-full">
            Professional
          </TabsTrigger>
          <TabsTrigger value="gaming" className="w-full">
            Gaming
          </TabsTrigger>
          <TabsTrigger value="creator" className="w-full">
            Creator
          </TabsTrigger>
          <TabsTrigger value="ultrabook" className="w-full">
            Ultrabook
          </TabsTrigger>
        </TabsList>
        <TabsContent value={activeCategory} className="mt-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  handleCategoryChange("all")
                  setSortOption("latest")
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.map((product, index) => (
                <EnhancedProductAnimation
                  key={product.id}
                  category={product.category}
                  delay={index * 0.1}
                  id={product.id}
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="relative">
                      <Link href={`/products/${product.id}`}>
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-[220px] object-cover"
                        />
                      </Link>
                      {product.badge && <Badge className="absolute top-3 right-3">{product.badge}</Badge>}
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full bg-white"
                          onClick={() => setQuickViewProduct(product.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className={`rounded-full ${
                            isInWishlist(product.id) ? "bg-rose-500 text-white border-rose-500" : "bg-white"
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
                          <Link href={`/products/${product.id}`}>
                            <CardTitle className="mt-1 hover:underline">{product.name}</CardTitle>
                          </Link>
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
                      <div className="mt-4 text-2xl font-bold">{formatPrice(product.price)}</div>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {product.colors?.map((color, i) => (
                          <span
                            key={i}
                            className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => handleAddToCart(product)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button asChild>
                        <Link href={`/products/${product.id}`}>
                          Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </EnhancedProductAnimation>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {filteredProducts.length > 0 && (
        <div className="mt-12 flex justify-center">
          <div className="flex">
            <Button variant="outline" className="rounded-r-none">
              Previous
            </Button>
            <Button className="rounded-none border-r-0 border-l-0">1</Button>
            <Button variant="outline" className="rounded-none border-r-0">
              2
            </Button>
            <Button variant="outline" className="rounded-none border-r-0">
              3
            </Button>
            <Button variant="outline" className="rounded-l-none">
              Next
            </Button>
          </div>
        </div>
      )}

      {quickViewProduct && (
        <ProductQuickView
          product={products.find((p) => p.id === quickViewProduct)!}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </main>
  )
}
