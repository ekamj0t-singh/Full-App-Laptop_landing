"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, ArrowLeft, ShoppingCart, Plus } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { motion } from "framer-motion"

// Sample product data - expanded to include all laptops
const products = [
  {
    id: 1,
    name: "ProBook Ultra",
    category: "Professional",
    price: 99990,
    image: "/https://images.samsung.com/is/image/samsung/assets/us/computing/galaxybooks/galaxy-book4-ultra/GB4Ultra-HD01-HomeKV-D.jpg?height=200&width=300",
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
  },
  {
    id: 2,
    name: "StudioBook Pro",
    category: "Creator",
    price: 149990,
    image: "/https://dlcdnwebimgs.asus.com/files/media/3a44c10f-9fc8-4ce3-a7df-b589813a5d05/v2/features/images/large/2x/kv.webp?height=200&width=300",
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
  },
  {
    id: 3,
    name: "ROG Strix",
    category: "Gaming",
    price: 129990,
    image: "/https://dlcdnwebimgs.asus.com/gain/CFE9CB59-216D-4AC9-AEAE-10054506055C/w1000/h732?height=200&width=300",
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
  },
  {
    id: 4,
    name: "ZenBook 14",
    category: "Ultrabook",
    price: 89990,
    image: "/https://dlcdnwebimgs.asus.com/files/media/87d135b1-7e5d-4637-8b58-a8651d4a4cc1/v1/features/images/large/2x/kv/kv.webp?height=200&width=300",
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
  },
  {
    id: 5,
    name: "TUF Gaming A15",
    category: "Gaming",
    price: 94990,
    image: "/https://in.store.asus.com/media/catalog/product/1/_/1._main_f15.jpg?width=439&height=439&store=en_IN&image-type=image?height=200&width=300",
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
  },
  {
    id: 6,
    name: "VivoBook Pro",
    category: "Creator",
    price: 109990,
    image: "/https://dlcdnwebimgs.asus.com/gain/d17c5603-7f8a-4809-bedd-0b1b3280c566/w800?height=200&width=300",
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
  },
  {
    id: 7,
    name: "ExpertBook B9",
    category: "Professional",
    price: 119990,
    image: "/https://dlcdnwebimgs.asus.com/gain/a5cc741e-6c72-4878-99b7-e62c0f67b4c3/w800/fwebp?height=200&width=300",
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
  },
  {
    id: 8,
    name: "Swift Edge",
    category: "Ultrabook",
    price: 79990,
    image: "/https://images.acer.com/is/image/acer/acer-laptop-swift-Edge-16-optimized-brilliance:KSP-with-Specs-XL?height=200&width=300",
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
  },
]

export default function ComparePage() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([1, 3])
  const { addToCart } = useCart()
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleProductChange = (index: number, productId: string) => {
    const newSelectedProducts = [...selectedProducts]
    newSelectedProducts[index] = Number.parseInt(productId)
    setSelectedProducts(newSelectedProducts)
  }

  const addComparisonSlot = () => {
    // Find a product that's not already selected
    const availableProducts = products.filter((p) => !selectedProducts.includes(p.id))
    if (availableProducts.length > 0) {
      setSelectedProducts([...selectedProducts, availableProducts[0].id])
    }
  }

  const removeComparisonSlot = (index: number) => {
    const newSelectedProducts = [...selectedProducts]
    newSelectedProducts.splice(index, 1)
    setSelectedProducts(newSelectedProducts)
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

  return (
    <main className="container py-12">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Button asChild variant="ghost" className="mb-8 text-tech-purple">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-tech-purple to-tech-blue">
            Compare Laptops
          </h1>
          <p className="text-muted-foreground mt-2">Compare specifications side by side to find your perfect match</p>
        </div>
        {selectedProducts.length < (isMobile ? 2 : 4) && (
          <Button
            onClick={addComparisonSlot}
            className="mt-4 md:mt-0 bg-gradient-to-r from-tech-purple to-tech-blue text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        )}
      </motion.div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left bg-slate-50 border-b sticky left-0 z-10">
                <div className="font-medium">Product</div>
              </th>
              {selectedProducts.map((productId, index) => {
                const product = products.find((p) => p.id === productId)
                return (
                  <th key={index} className="p-4 text-center border-b min-w-[250px]">
                    <div className="flex flex-col items-center">
                      <div className="relative w-full mb-4">
                        <Select
                          value={productId.toString()}
                          onValueChange={(value) => handleProductChange(index, value)}
                        >
                          <SelectTrigger className="w-full border-tech-purple/30 focus:border-tech-purple">
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((p) => (
                              <SelectItem
                                key={p.id}
                                value={p.id.toString()}
                                disabled={selectedProducts.includes(p.id) && p.id !== productId}
                              >
                                {p.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {selectedProducts.length > 2 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute -right-10 top-0 text-red-500 hover:bg-red-50 hover:text-red-700"
                            onClick={() => removeComparisonSlot(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {product && (
                        <>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="gradient-border rounded-lg p-2"
                          >
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-32 h-auto mb-2"
                            />
                          </motion.div>
                          <div className="font-bold text-tech-purple mt-2">{product.name}</div>
                          <div className="text-sm text-muted-foreground mb-2">{product.category}</div>
                          <div className="text-lg font-bold price-tag mb-4">{formatPrice(product.price)}</div>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button asChild size="sm" className="bg-tech-purple text-white">
                              <Link href={`/products/${product.id}`}>View Details</Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-tech-purple/30 text-tech-purple hover:border-tech-purple"
                              onClick={() => handleAddToCart(product.id)}
                            >
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Add to Cart
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {Object.keys(products[0].specs).map((specKey) => (
              <tr key={specKey} className="border-b hover:bg-slate-50/50">
                <td className="p-4 font-medium bg-slate-50 sticky left-0 z-10 capitalize">{specKey}</td>
                {selectedProducts.map((productId, index) => {
                  const product = products.find((p) => p.id === productId)
                  return (
                    <td key={index} className="p-4 text-center">
                      {product?.specs[specKey as keyof typeof product.specs]}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
