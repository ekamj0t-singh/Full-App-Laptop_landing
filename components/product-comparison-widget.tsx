"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Check,
  X,
  ArrowRight,
  Cpu,
  MemoryStickIcon as Memory,
  HardDrive,
  Monitor,
  Battery,
  Wifi,
  Zap,
} from "lucide-react"
import Link from "next/link"

// Sample laptop data for comparison
const laptops = [
  {
    id: 1,
    name: "ProBook Ultra",
    category: "Professional",
    price: 99990,
    image: "https://images.samsung.com/is/image/samsung/assets/us/computing/galaxybooks/galaxy-book4-ultra/GB4Ultra-HD01-HomeKV-D.jpg?imwidth=2560?imwidth=2560?height=200&width=300",
    specs: {
      processor: "Intel Core i7-13700H",
      memory: "16GB DDR5",
      storage: "512GB NVMe SSD",
      display: '14" 2.8K OLED, 120Hz',
      battery: "Up to 12 hours",
      connectivity: "Wi-Fi 6E, Bluetooth 5.3",
      ports: "2x Thunderbolt 4, HDMI, USB-A",
      weight: "1.3 kg",
    },
    features: {
      fingerprint: true,
      faceUnlock: true,
      backlit: true,
      touchscreen: false,
      stylus: false,
      dedicated_gpu: false,
    },
  },
  {
    id: 2,
    name: "StudioBook Pro",
    category: "Creator",
    price: 149990,
    image: "https://dlcdnwebimgs.asus.com/files/media/3a44c10f-9fc8-4ce3-a7df-b589813a5d05/v2/features/images/large/2x/kv.webp?height=200&width=300",
    specs: {
      processor: "Intel Core i9-13900H",
      memory: "32GB DDR5",
      storage: "1TB NVMe SSD",
      display: '16" 4K OLED, 120Hz',
      battery: "Up to 8 hours",
      connectivity: "Wi-Fi 6E, Bluetooth 5.3",
      ports: "2x Thunderbolt 4, HDMI, USB-A, SD Card",
      weight: "1.8 kg",
    },
    features: {
      fingerprint: true,
      faceUnlock: true,
      backlit: true,
      touchscreen: true,
      stylus: true,
      dedicated_gpu: true,
    },
  },
  {
    id: 3,
    name: "ROG Strix",
    category: "Gaming",
    price: 129990,
    image: "https://dlcdnwebimgs.asus.com/gain/CFE9CB59-216D-4AC9-AEAE-10054506055C/w1000/h732?height=200&width=300",
    specs: {
      processor: "AMD Ryzen 9 7945HX",
      memory: "32GB DDR5",
      storage: "1TB NVMe SSD",
      display: '15.6" QHD, 240Hz',
      battery: "Up to 6 hours",
      connectivity: "Wi-Fi 6E, Bluetooth 5.3",
      ports: "USB-C, HDMI 2.1, USB-A, Ethernet",
      weight: "2.3 kg",
    },
    features: {
      fingerprint: false,
      faceUnlock: false,
      backlit: true,
      touchscreen: false,
      stylus: false,
      dedicated_gpu: true,
    },
  },
]

export default function ProductComparisonWidget() {
  const [selectedLaptops, setSelectedLaptops] = useState<number[]>([1, 2])
  const [activeTab, setActiveTab] = useState("specs")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Set visible after component mounts for animations
    setIsVisible(true)
  }, [])

  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const toggleLaptop = (id: number) => {
    if (selectedLaptops.includes(id)) {
      if (selectedLaptops.length > 1) {
        setSelectedLaptops(selectedLaptops.filter((laptopId) => laptopId !== id))
      }
    } else {
      if (selectedLaptops.length < 3) {
        setSelectedLaptops([...selectedLaptops, id])
      }
    }
  }

  const getComparedLaptops = () => {
    return laptops.filter((laptop) => selectedLaptops.includes(laptop.id))
  }

  const comparedLaptops = getComparedLaptops()

  // Get spec icons
  const getSpecIcon = (specName: string) => {
    switch (specName) {
      case "processor":
        return <Cpu className="h-4 w-4" />
      case "memory":
        return <Memory className="h-4 w-4" />
      case "storage":
        return <HardDrive className="h-4 w-4" />
      case "display":
        return <Monitor className="h-4 w-4" />
      case "battery":
        return <Battery className="h-4 w-4" />
      case "connectivity":
        return <Wifi className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center justify-center text-center mb-12"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text">Compare Models</h2>
        <p className="mt-4 text-muted-foreground md:w-2/3">
          Find the perfect laptop by comparing specifications side by side
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 flex flex-wrap justify-center gap-4"
      >
        {laptops.map((laptop) => (
          <Button
            key={laptop.id}
            variant={selectedLaptops.includes(laptop.id) ? "default" : "outline"}
            onClick={() => toggleLaptop(laptop.id)}
            className={selectedLaptops.includes(laptop.id) ? "btn-primary" : "btn-outline"}
          >
            {laptop.name}
          </Button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Tabs defaultValue="specs" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          <TabsContent value="specs" className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-primary">Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-4 px-2 w-1/4">Specification</th>
                        {comparedLaptops.map((laptop) => (
                          <th key={laptop.id} className="text-left py-4 px-2">
                            <div className="flex flex-col items-center">
                              <img
                                src={laptop.image || "/placeholder.svg"}
                                alt={laptop.name}
                                className="w-32 h-auto mb-2 rounded-md object-cover"
                              />
                              <span className="font-bold gradient-text">{laptop.name}</span>
                              <span className="text-sm text-muted-foreground">{laptop.category}</span>
                              <span className="font-bold mt-1">{formatPrice(laptop.price)}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(comparedLaptops[0].specs).map(([key, value], index) => (
                        <tr key={key} className={index % 2 === 0 ? "bg-secondary/30" : ""}>
                          <td className="py-3 px-2 border-b">
                            <div className="flex items-center gap-2">
                              {getSpecIcon(key)}
                              <span className="capitalize">{key.replace("_", " ")}</span>
                            </div>
                          </td>
                          {comparedLaptops.map((laptop) => (
                            <td key={laptop.id} className="py-3 px-2 border-b font-medium">
                              {laptop.specs[key as keyof typeof laptop.specs]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-primary">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-4 px-2 w-1/4">Feature</th>
                        {comparedLaptops.map((laptop) => (
                          <th key={laptop.id} className="text-left py-4 px-2">
                            <div className="flex flex-col items-center">
                              <img
                                src={laptop.image || "/placeholder.svg"}
                                alt={laptop.name}
                                className="w-32 h-auto mb-2 rounded-md object-cover"
                              />
                              <span className="font-bold gradient-text">{laptop.name}</span>
                              <span className="text-sm text-muted-foreground">{laptop.category}</span>
                              <span className="font-bold mt-1">{formatPrice(laptop.price)}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(comparedLaptops[0].features).map(([key, value], index) => (
                        <tr key={key} className={index % 2 === 0 ? "bg-secondary/30" : ""}>
                          <td className="py-3 px-2 border-b">
                            <span className="capitalize">{key.replace("_", " ")}</span>
                          </td>
                          {comparedLaptops.map((laptop) => (
                            <td key={laptop.id} className="py-3 px-2 border-b text-center">
                              {laptop.features[key as keyof typeof laptop.features] ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-red-500 mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex justify-center mt-8"
      >
        <Button asChild className="btn-primary">
          <Link href="/compare">
            Compare All Models <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
