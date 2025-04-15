import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Search, Filter } from "lucide-react"
import Link from "next/link"

// Sample reviews data
const reviews = [
  {
    id: 1,
    productId: 1,
    productName: "ProBook Ultra",
    productImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeyIIF4EaVT8lSKtHrEYTug3UvFcmhPJ01Hw&s?height=100&width=150",
    author: "Michael Johnson",
    date: "2023-10-15",
    rating: 5,
    title: "Exceptional performance and build quality",
    content:
      "I've been using this laptop for about a month now, and I'm thoroughly impressed. The performance is outstanding, especially for creative work. The display is vibrant and accurate, and the battery life exceeds my expectations. Highly recommended for professionals.",
    helpful: 24,
    unhelpful: 2,
    verified: true,
  },
  {
    id: 2,
    productId: 2,
    productName: "StudioBook Pro",
    productImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUDAxmkJNQ-imvxCZ1xOtqi-vbkIbWP259oQ&s?height=100&width=150",
    author: "Sarah Williams",
    date: "2023-09-28",
    rating: 4,
    title: "Great laptop with minor issues",
    content:
      "Overall, this is an excellent laptop. The build quality is premium, and it handles all my tasks with ease. My only complaint is that the fans can get a bit loud under heavy load. The keyboard is comfortable to type on, and the trackpad is responsive. Battery life is good but not exceptional.",
    helpful: 18,
    unhelpful: 3,
    verified: true,
  },
  {
    id: 3,
    productId: 3,
    productName: "ROG Strix",
    productImage: "https://assetsio.gnwcdn.com/Asus-ROG-Strix-Scar-17-lid.JPG?width=1200&height=630&fit=crop&enable=upscale&auto=webp?height=100&width=150",
    author: "David Chen",
    date: "2023-09-10",
    rating: 5,
    title: "Perfect for my needs",
    content:
      "This laptop has exceeded all my expectations. The screen is gorgeous, performance is snappy, and the build quality is top-notch. I use it primarily for software development and occasional gaming, and it handles everything I throw at it without breaking a sweat.",
    helpful: 32,
    unhelpful: 1,
    verified: true,
  },
  {
    id: 4,
    productId: 1,
    productName: "ProBook Ultra",
    productImage: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQa7mxAnlFqW4KZZV5xfvCskUGYyHkK8gHV--9xhbB3GVjo_w5jHigXEPMk-Z2HAxp4AUL7YfYJIPU1j1dYP5gcTEg2VMive_ifs_oaFImBeAphWAPf1o2-&usqp=CAE?height=100&width=150",
    author: "Emily Rodriguez",
    date: "2023-08-22",
    rating: 3,
    title: "Good, but not great",
    content:
      "The laptop performs well for most tasks, but I've experienced some issues with the Wi-Fi connectivity. Sometimes it disconnects randomly and requires a restart to fix. The display and keyboard are excellent, though, and the battery life is decent.",
    helpful: 15,
    unhelpful: 7,
    verified: true,
  },
  {
    id: 5,
    productId: 4,
    productName: "ZenBook 14",
    productImage: "https://images.firstpost.com/wp-content/uploads/2019/05/ZenBook-Pro-Duo_UX581-1.jpg?height=100&width=150",
    author: "Alex Thompson",
    date: "2023-08-15",
    rating: 5,
    title: "Lightweight powerhouse",
    content:
      "I'm amazed at how much performance they packed into such a lightweight laptop. The battery life is incredible - I can go a full workday without needing to charge. The display is bright and vibrant, and the keyboard is comfortable for long typing sessions.",
    helpful: 28,
    unhelpful: 2,
    verified: true,
  },
  {
    id: 6,
    productId: 2,
    productName: "StudioBook Pro",
    productImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIiAxsaZcgXo-2GIbdAdXDRHMgFEYU-LfTdQ&s?height=100&width=150",
    author: "Jessica Kim",
    date: "2023-07-30",
    rating: 4,
    title: "Great for creative work",
    content:
      "As a graphic designer, I needed a powerful laptop that could handle my workflow. This laptop delivers on that front. The color accuracy is excellent, and it handles large Photoshop files with ease. My only complaint is that it gets quite hot under sustained loads.",
    helpful: 19,
    unhelpful: 3,
    verified: true,
  },
]

export default function ReviewsPage() {
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Customer Reviews</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search reviews" className="pl-10" />
          </div>
        </div>
        <div className="flex gap-4">
          <Select defaultValue="recent">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="border rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <Link href={`/products/${review.productId}`} className="block group">
                  <div className="rounded-md overflow-hidden mb-2">
                    <img
                      src={review.productImage || "/placeholder.svg"}
                      alt={review.productName}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium group-hover:text-blue-600 transition-colors">{review.productName}</h3>
                </Link>
              </div>

              <div className="md:w-3/4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <h4 className="text-xl font-bold mt-1">{review.title}</h4>
                  </div>
                  <div className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</div>
                </div>

                <div className="flex items-center mb-3">
                  <div className="font-medium">By {review.author}</div>
                  {review.verified && (
                    <div className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Verified Purchase
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground mb-4">{review.content}</p>

                <div className="flex items-center text-sm">
                  <div className="mr-2">Was this review helpful?</div>
                  <Button variant="outline" size="sm" className="h-8 mr-2">
                    Yes ({review.helpful})
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    No ({review.unhelpful})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="flex">
          <Button variant="outline" className="rounded-r-none">
            Previous
          </Button>
          <Button variant="outline" className="rounded-none border-l-0 border-r-0">
            1
          </Button>
          <Button className="rounded-none border-r-0">2</Button>
          <Button variant="outline" className="rounded-none border-r-0">
            3
          </Button>
          <Button variant="outline" className="rounded-l-none">
            Next
          </Button>
        </div>
      </div>
    </main>
  )
}
