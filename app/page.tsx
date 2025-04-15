import Link from "next/link"
import { ArrowRight, Cpu, MemoryStickIcon as Memory, HardDrive, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import FeaturedProducts from "@/components/featured-products"
import HeroSection from "@/components/hero-section"
import LaptopFinderQuiz from "@/components/laptop-finder-quiz"
import UserStories from "@/components/user-stories"
import ProductComparisonWidget from "@/components/product-comparison-widget"
import LiveAssistant from "@/components/live-assistant"
import EnhancedCategorySlideshow from "@/components/enhanced-category-slideshow"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />

      {/* Category Slideshow - Added here */}
      <section className="w-full py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Explore Our Collections</h2>
            <p className="mt-4 text-muted-foreground md:w-2/3">
              Discover our range of premium laptops designed for every need and lifestyle
            </p>
          </div>
          <EnhancedCategorySlideshow />
        </div>
      </section>

      {/* Laptop Finder Quiz Section */}
      <section id="laptop-finder" className="container py-12 md:py-24 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Find Your Perfect Match</h2>
          <p className="mt-4 text-muted-foreground md:w-2/3">
            Not sure which laptop is right for you? Answer a few questions and we'll recommend the perfect model for
            your needs.
          </p>
        </div>

        <LaptopFinderQuiz />
      </section>

      {/* Specs Section - Simplified and More Visual */}
      <section className="container py-12 md:py-24 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Cutting-Edge Performance</h2>
          <p className="mt-4 text-muted-foreground md:w-2/3">
            Experience unparalleled power and efficiency with our latest laptop series. Designed for professionals,
            gamers, and creators alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <Card className="border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Processors</CardTitle>
              <Cpu className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Latest Gen</div>
              <p className="text-xs text-muted-foreground">Up to Intel Core i9 & AMD Ryzen 9</p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Memory</CardTitle>
              <Memory className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Up to 64GB</div>
              <p className="text-xs text-muted-foreground">DDR5 RAM for ultimate multitasking</p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Storage</CardTitle>
              <HardDrive className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Up to 2TB</div>
              <p className="text-xs text-muted-foreground">Ultra-fast NVMe SSD storage</p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Display</CardTitle>
              <Monitor className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">OLED</div>
              <p className="text-xs text-muted-foreground">4K resolution with 120Hz refresh rate</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gradient-to-r from-slate-50 to-white py-12 md:py-24">
        <div className="container">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Products</h2>
            <p className="mt-4 text-muted-foreground md:w-2/3">
              Discover our most popular laptops, designed to meet your every need
            </p>
          </div>

          <div className="w-full px-4 md:px-0">
            <FeaturedProducts />
          </div>

          <div className="flex justify-center mt-12">
            <Button asChild size="lg">
              <Link href="/products">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Product Comparison Section */}
      <section className="container py-12 md:py-24">
        <ProductComparisonWidget />
      </section>

      {/* User Stories Section - Moved after Featured Products */}
      <section className="container py-12 md:py-24">
        <UserStories />
      </section>

      <section className="container py-12 md:py-24 bg-gradient-to-r from-slate-50 to-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Compare and Find Your Perfect Match</h2>
            <p className="mt-4 text-muted-foreground">
              Not sure which laptop is right for you? Use our comparison tool to see detailed specifications side by
              side and make an informed decision.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link href="/compare">Compare Products</Link>
            </Button>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-md">
            <img
              src="https://www.ghacks.net/wp-content/uploads/2020/10/microsoft-surface-laptop-go.jpg?height=400&width=600"
              alt="Laptop comparison"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white py-12 md:py-24">
        <div className="container">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Customers Say</h2>
            <p className="mt-4 text-gray-300 md:w-2/3">
              Don't just take our word for it. See what our customers think about our products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-gray-800 border-gray-700 text-white">
                <CardHeader>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, j) => (
                      <svg
                        key={j}
                        className={`w-4 h-4 ${j < 4 ? "text-yellow-400" : "text-gray-600"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <CardTitle>Amazing Performance</CardTitle>
                  <CardDescription className="text-gray-400">John D. - Verified Buyer</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    "This laptop exceeds all my expectations. The speed is incredible and the display is stunning.
                    Battery life is impressive too!"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button
              asChild
              variant="outline"
              className="border-white text-white bg-white/10 hover:bg-white hover:text-gray-900"
            >
              <Link href="/reviews">Read All Reviews</Link>
            </Button>
          </div>
        </div>
      </section>

      <LiveAssistant />
    </main>
  )
}
