"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, ThumbsUp, ThumbsDown, Flag, Camera, X, Video, Play } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import AuthDialog from "./auth-dialog"
import { toast } from "@/hooks/use-toast"

// Sample reviews data
const sampleReviews = [
  {
    id: 1,
    author: "Michael Johnson",
    date: "2023-10-15",
    rating: 5,
    title: "Exceptional performance and build quality",
    content:
      "I've been using this laptop for about a month now, and I'm thoroughly impressed. The performance is outstanding, especially for creative work. The display is vibrant and accurate, and the battery life exceeds my expectations. Highly recommended for professionals.",
    helpful: 24,
    unhelpful: 2,
    verified: true,
    images: ["https://img.etimg.com/thumb/msid-52233543,width-640,height-480,imgsize-181887,resizemode-4/asus-eeebook.jpg?height=200&width=300", "https://tiimg.tistatic.com/fp/1/007/931/intel-core-i3-processor-screen-15-6-inch-full-hd-4-gb-ram-1-tb-ssd-red-dell-laptops-298.jpg?height=200&width=300"],
    avatar: "data:image/jpeg;base64,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?height=40&width=40",
  },
  {
    id: 2,
    author: "Sarah Williams",
    date: "2023-09-28",
    rating: 4,
    title: "Great laptop with minor issues",
    content:
      "Overall, this is an excellent laptop. The build quality is premium, and it handles all my tasks with ease. My only complaint is that the fans can get a bit loud under heavy load. The keyboard is comfortable to type on, and the trackpad is responsive. Battery life is good but not exceptional.",
    helpful: 18,
    unhelpful: 3,
    verified: false,
    images: ["https://img.etimg.com/thumb/width-1200,height-900,imgsize-137954,resizemode-75,msid-112933125/top-trending-products/electronics/laptops/top-10-budget-friendly-laptops-under-45000-in-india-affordable-and-reliable-choices.jpg?height=200&width=300"],
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv4yuvcDGiwRmZkqiJiFxADqwmLqbyMPanKw&s?height=40&width=40",
  },
  {
    id: 3,
    author: "David Chen",
    date: "2023-09-10",
    rating: 5,
    title: "Perfect for my needs",
    content:
      "This laptop has exceeded all my expectations. The screen is gorgeous, performance is snappy, and the build quality is top-notch. I use it primarily for software development and occasional gaming, and it handles everything I throw at it without breaking a sweat.",
    helpful: 32,
    unhelpful: 1,
    verified: true,
    video: "https://m.media-amazon.com/images/I/61Qe0euJJZL.jpg?height=300&width=400",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX3s9fwejmSRJRcEQfG3DLZjmGOx9z8EotA&s?height=40&width=40",
  },
  {
    id: 4,
    author: "Emily Rodriguez",
    date: "2023-08-22",
    rating: 3,
    title: "Good, but not great",
    content:
      "The laptop performs well for most tasks, but I've experienced some issues with the Wi-Fi connectivity. Sometimes it disconnects randomly and requires a restart to fix. The display and keyboard are excellent, though, and the battery life is decent.",
    helpful: 15,
    unhelpful: 7,
    verified: true,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbFMEYgyIvM2gNrSEC4ia1R13rT_Sd2V45yg&s?height=40&width=40",
  },
]

interface ProductReviewsProps {
  productId: number
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState(sampleReviews)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [reviewTitle, setReviewTitle] = useState("")
  const [reviewContent, setReviewContent] = useState("")
  const [reviewImages, setReviewImages] = useState<string[]>([])
  const [reviewVideo, setReviewVideo] = useState<string | null>(null)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [expandedReview, setExpandedReview] = useState<number | null>(null)
  const [expandedMedia, setExpandedMedia] = useState<string | null>(null)

  const { user, isAuthenticated } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  const ratingDistribution = [0, 0, 0, 0, 0]
  reviews.forEach((review) => {
    ratingDistribution[review.rating - 1]++
  })

  const ratingPercentages = ratingDistribution.map((count) => (count / reviews.length) * 100)

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated) {
      setShowAuthDialog(true)
      return
    }

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review",
        variant: "destructive",
      })
      return
    }

    // Create new review
    const newReview = {
      id: reviews.length + 1,
      author: user?.name || "Anonymous",
      date: new Date().toISOString().split("T")[0],
      rating,
      title: reviewTitle,
      content: reviewContent,
      helpful: 0,
      unhelpful: 0,
      verified: true,
      images: reviewImages,
      video: reviewVideo,
      avatar: user?.avatar || "/placeholder.svg?height=40&width=40",
    }

    // Add to reviews
    setReviews([newReview, ...reviews])

    // Reset form
    setRating(0)
    setReviewTitle("")
    setReviewContent("")
    setReviewImages([])
    setReviewVideo(null)
    setShowReviewForm(false)

    toast({
      title: "Review submitted",
      description: "Thank you for sharing your feedback!",
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, you would upload these files to a server
      // For this demo, we'll just use placeholder images
      const newImages = Array.from(e.target.files).map(
        (_, index) => `/placeholder.svg?height=200&width=300&text=Upload${reviews.length + index}`,
      )
      setReviewImages([...reviewImages, ...newImages])
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, you would upload this file to a server
      // For this demo, we'll just use a placeholder video
      setReviewVideo(`/placeholder.svg?height=300&width=400&text=Video${reviews.length}`)
    }
  }

  const handleRemoveImage = (index: number) => {
    setReviewImages(reviewImages.filter((_, i) => i !== index))
  }

  const handleRemoveVideo = () => {
    setReviewVideo(null)
  }

  const handleVote = (reviewId: number, isHelpful: boolean) => {
    if (!isAuthenticated) {
      setShowAuthDialog(true)
      return
    }

    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          if (isHelpful) {
            return { ...review, helpful: review.helpful + 1 }
          } else {
            return { ...review, unhelpful: review.unhelpful + 1 }
          }
        }
        return review
      }),
    )

    toast({
      title: "Vote recorded",
      description: "Thank you for your feedback!",
    })
  }

  const toggleReviewExpansion = (reviewId: number) => {
    setExpandedReview(expandedReview === reviewId ? null : reviewId)
  }

  const openMediaModal = (url: string) => {
    setExpandedMedia(url)
  }

  const closeMediaModal = () => {
    setExpandedMedia(null)
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(averageRating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">Based on {reviews.length} reviews</div>
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center">
              <div className="w-8 text-sm font-medium">{star} star</div>
              <div className="w-full mx-2 h-4 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-yellow-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${ratingPercentages[star - 1]}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + (5 - star) * 0.1 }}
                />
              </div>
              <div className="w-8 text-sm text-right">{ratingDistribution[star - 1]}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            size="lg"
            onClick={() => {
              if (!isAuthenticated) {
                setShowAuthDialog(true)
              } else {
                setShowReviewForm(!showReviewForm)
              }
            }}
            className="mb-2 btn-hover-effect"
          >
            Write a Review
          </Button>
          <p className="text-sm text-muted-foreground text-center">Share your experience with this product</p>
        </motion.div>
      </div>

      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            className="border rounded-lg p-6 mb-8"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-medium mb-4">Write Your Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <Label htmlFor="rating" className="block mb-2">
                  Rating
                </Label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-8 w-8 cursor-pointer transition-colors ${
                        star <= (hoveredRating || rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                      }`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="title" className="block mb-2">
                  Review Title
                </Label>
                <Input
                  id="title"
                  placeholder="Summarize your experience"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="review" className="block mb-2">
                  Review
                </Label>
                <Textarea
                  id="review"
                  placeholder="Write your review here..."
                  className="min-h-[150px]"
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label className="block mb-2">Add Photos (optional)</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {reviewImages.map((image, index) => (
                    <div key={index} className="relative w-24 h-24 rounded overflow-hidden">
                      <img src={image || "/placeholder.svg"} alt="Review" className="w-full h-full object-cover" />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    className="w-24 h-24 flex flex-col items-center justify-center"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="h-6 w-6 mb-1" />
                    <span className="text-xs">Add Photo</span>
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              <div>
                <Label className="block mb-2">Add Video (optional)</Label>
                {reviewVideo ? (
                  <div className="relative w-full max-w-md h-48 rounded overflow-hidden mb-2">
                    <img
                      src={reviewVideo || "/placeholder.svg"}
                      alt="Review Video"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={handleRemoveVideo}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center"
                    onClick={() => videoInputRef.current?.click()}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Upload Video
                  </Button>
                )}
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoUpload}
                />
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2" onClick={() => setShowReviewForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="btn-hover-effect">
                  Submit Review
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="border-b pb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <img
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <h4 className="font-bold mt-1">{review.title}</h4>
                  </div>
                  <div className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</div>
                </div>

                <div className="flex items-center mb-2">
                  <div className="font-medium">{review.author}</div>
                  {review.verified && (
                    <div className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Verified Purchase
                    </div>
                  )}
                </div>

                <p className={`text-muted-foreground mb-4 ${expandedReview === review.id ? "" : "line-clamp-3"}`}>
                  {review.content}
                </p>

                {review.content.length > 150 && (
                  <Button
                    variant="link"
                    onClick={() => toggleReviewExpansion(review.id)}
                    className="mt-1 mb-3 p-0 h-auto"
                  >
                    {expandedReview === review.id ? "Show less" : "Read more"}
                  </Button>
                )}

                {(review.images?.length > 0 || review.video) && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {review.images?.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="w-20 h-20 rounded overflow-hidden cursor-pointer"
                        onClick={() => openMediaModal(image)}
                      >
                        <img src={image || "/placeholder.svg"} alt="Review" className="w-full h-full object-cover" />
                      </div>
                    ))}

                    {review.video && (
                      <div
                        className="w-20 h-20 rounded overflow-hidden cursor-pointer relative"
                        onClick={() => openMediaModal(review.video!)}
                      >
                        <img
                          src={review.video || "/placeholder.svg"}
                          alt="Review Video"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center text-sm">
                  <div className="mr-4">Was this review helpful?</div>
                  <Button variant="outline" size="sm" className="h-8 mr-2" onClick={() => handleVote(review.id, true)}>
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Yes ({review.helpful})
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 mr-4" onClick={() => handleVote(review.id, false)}>
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    No ({review.unhelpful})
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">
                    <Flag className="h-4 w-4 mr-1" />
                    Report
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="outline" className="btn-hover-effect">
          Load More Reviews
        </Button>
      </div>

      {/* Media Modal */}
      {expandedMedia && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={closeMediaModal}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70"
              onClick={closeMediaModal}
            >
              <X className="h-5 w-5" />
            </Button>
            <img
              src={expandedMedia || "/placeholder.svg"}
              alt="Review Media"
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <AuthDialog
        open={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        message="Please sign in to submit reviews or vote on existing reviews"
      />
    </div>
  )
}
