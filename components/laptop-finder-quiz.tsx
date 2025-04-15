"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Laptop,
  Gamepad,
  Camera,
  Briefcase,
  GraduationCapIcon as Graduation,
  Clock,
  ChevronRight,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

type UserType = "student" | "creator" | "professional" | "gamer" | null
type UsageIntensity = "light" | "medium" | "heavy" | null
type BudgetRange = "budget" | "midrange" | "premium" | null
type Portability = "ultraportable" | "balanced" | "performance" | null

interface QuizState {
  step: number
  userType: UserType
  usageIntensity: UsageIntensity
  budgetRange: BudgetRange
  portability: Portability
}

const initialState: QuizState = {
  step: 1,
  userType: null,
  usageIntensity: null,
  budgetRange: null,
  portability: null,
}

export default function LaptopFinderQuiz() {
  const [quizState, setQuizState] = useState<QuizState>(initialState)
  const [showResults, setShowResults] = useState(false)
  const [showSimilarOptions, setShowSimilarOptions] = useState(false)

  const resetQuiz = () => {
    setQuizState(initialState)
    setShowResults(false)
    setShowSimilarOptions(false)
  }

  const handleUserTypeSelect = (type: UserType) => {
    setQuizState({ ...quizState, userType: type, step: 2 })
  }

  const handleUsageIntensitySelect = (intensity: UsageIntensity) => {
    setQuizState({ ...quizState, usageIntensity: intensity, step: 3 })
  }

  const handleBudgetSelect = (budget: BudgetRange) => {
    setQuizState({ ...quizState, budgetRange: budget, step: 4 })
  }

  const handlePortabilitySelect = (portability: Portability) => {
    setQuizState({ ...quizState, portability: portability, step: 5 })
    setShowResults(true)
  }

  // Get recommended laptop based on quiz answers
  const getRecommendedLaptop = () => {
    const { userType, usageIntensity, budgetRange, portability } = quizState

    // This is a simplified recommendation logic
    if (userType === "gamer" && budgetRange === "premium") {
      return {
        id: 3,
        name: "ROG Strix",
        description: "Ultimate gaming performance with high refresh rate display and powerful graphics",
        image: "https://dlcdnwebimgs.asus.com/gain/CFE9CB59-216D-4AC9-AEAE-10054506055C/w1000/h732?height=300&width=400",
        match: 98,
      }
    } else if (userType === "creator" && budgetRange === "premium") {
      return {
        id: 2,
        name: "StudioBook Pro",
        description: "Perfect for content creation with color-accurate display and powerful processor",
        image: "https://dlcdnwebimgs.asus.com/files/media/3a44c10f-9fc8-4ce3-a7df-b589813a5d05/v2/features/images/large/2x/kv.webp?height=300&width=400",
        match: 95,
      }
    } else if (userType === "student" && (budgetRange === "budget" || budgetRange === "midrange")) {
      return {
        id: 4,
        name: "ZenBook 14",
        description: "Lightweight, long battery life, and perfect for taking notes and research",
        image: "https://dlcdnwebimgs.asus.com/files/media/87d135b1-7e5d-4637-8b58-a8651d4a4cc1/v1/features/images/large/2x/kv/kv.webp?height=300&width=400",
        match: 94,
      }
    } else if (userType === "professional" && portability === "ultraportable") {
      return {
        id: 1,
        name: "ProBook Ultra",
        description: "Sleek, professional design with excellent performance for business tasks",
        image: "/https://images.samsung.com/is/image/samsung/assets/us/computing/galaxybooks/galaxy-book4-ultra/GB4Ultra-HD01-HomeKV-D.jpg?height=300&width=400",
        match: 96,
      }
    } else {
      return {
        id: 1,
        name: "ProBook Ultra",
        description: "Versatile laptop that balances performance and portability",
        image: "/https://images.samsung.com/is/image/samsung/assets/us/computing/galaxybooks/galaxy-book4-ultra/GB4Ultra-HD01-HomeKV-D.jpg?height=300&width=400",
        match: 90,
      }
    }
  }

  const recommendedLaptop = getRecommendedLaptop()

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="shadow-sm">
        <CardHeader className="text-center bg-secondary/50 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-primary">Find Your Perfect Laptop</CardTitle>
          <p className="text-muted-foreground">Answer a few questions and we'll recommend the best laptop for you</p>
        </CardHeader>

        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key={`step-${quizState.step}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {quizState.step === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-medium">What type of user are you?</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant={quizState.userType === "student" ? "default" : "outline"}
                        className="h-auto py-6 flex flex-col items-center gap-2"
                        onClick={() => handleUserTypeSelect("student")}
                      >
                        <Graduation className="h-8 w-8" />
                        <span>Student</span>
                      </Button>
                      <Button
                        variant={quizState.userType === "creator" ? "default" : "outline"}
                        className="h-auto py-6 flex flex-col items-center gap-2"
                        onClick={() => handleUserTypeSelect("creator")}
                      >
                        <Camera className="h-8 w-8" />
                        <span>Creator</span>
                      </Button>
                      <Button
                        variant={quizState.userType === "professional" ? "default" : "outline"}
                        className="h-auto py-6 flex flex-col items-center gap-2"
                        onClick={() => handleUserTypeSelect("professional")}
                      >
                        <Briefcase className="h-8 w-8" />
                        <span>Professional</span>
                      </Button>
                      <Button
                        variant={quizState.userType === "gamer" ? "default" : "outline"}
                        className="h-auto py-6 flex flex-col items-center gap-2"
                        onClick={() => handleUserTypeSelect("gamer")}
                      >
                        <Gamepad className="h-8 w-8" />
                        <span>Gamer</span>
                      </Button>
                    </div>
                  </div>
                )}

                {quizState.step === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-medium">How intensive will your usage be?</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <Button
                        variant={quizState.usageIntensity === "light" ? "default" : "outline"}
                        className="h-auto py-6 flex flex-col items-center gap-2"
                        onClick={() => handleUsageIntensitySelect("light")}
                      >
                        <Clock className="h-6 w-6" />
                        <span>Light</span>
                        <p className="text-xs text-center mt-1">Web browsing, documents, emails</p>
                      </Button>
                      <Button
                        variant={quizState.usageIntensity === "medium" ? "default" : "outline"}
                        className="h-auto py-6 flex flex-col items-center gap-2"
                        onClick={() => handleUsageIntensitySelect("medium")}
                      >
                        <Clock className="h-6 w-6" />
                        <span>Medium</span>
                        <p className="text-xs text-center mt-1">Photo editing, multiple apps</p>
                      </Button>
                      <Button
                        variant={quizState.usageIntensity === "heavy" ? "default" : "outline"}
                        className="h-auto py-6 flex flex-col items-center gap-2"
                        onClick={() => handleUsageIntensitySelect("heavy")}
                      >
                        <Clock className="h-6 w-6" />
                        <span>Heavy</span>
                        <p className="text-xs text-center mt-1">Video editing, gaming, 3D rendering</p>
                      </Button>
                    </div>
                  </div>
                )}

                {quizState.step === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-medium">What's your budget range?</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <Button
                        variant={quizState.budgetRange === "budget" ? "default" : "outline"}
                        className="h-auto py-6 flex flex-col items-center gap-2"
                        onClick={() => handleBudgetSelect("budget")}
                      >
                        <span>Budget</span>
                        <p className="text-xs text-center mt-1">₹50,000 - ₹80,000</p>
                      </Button>
                      <Button
                        variant={quizState.budgetRange === "midrange" ? "default" : "outline"}
                        className="h-auto py-6 flex flex-col items-center gap-2"
                        onClick={() => handleBudgetSelect("midrange")}
                      >
                        <span>Mid-range</span>
                        <p className="text-xs text-center mt-1">₹80,000 - ₹120,000</p>
                      </Button>
                      <Button
                        variant={quizState.budgetRange === "premium" ? "default" : "outline"}
                        className="h-auto py-6 flex flex-col items-center gap-2"
                        onClick={() => handleBudgetSelect("premium")}
                      >
                        <span>Premium</span>
                        <p className="text-xs text-center mt-1">₹120,000+</p>
                      </Button>
                    </div>
                  </div>
                )}

                {quizState.step === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-medium">How important is portability to you?</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <Button
                        variant={quizState.portability === "ultraportable" ? "default" : "outline"}
                        className="h-auto py-6 flex flex-col items-center gap-2"
                        onClick={() => handlePortabilitySelect("ultraportable")}
                      >
                        <Laptop className="h-6 w-6" />
                        <span>Ultra-portable</span>
                        <p className="text-xs text-center mt-1">Lightweight, all-day battery</p>
                      </Button>
                      <Button
                        variant={quizState.portability === "balanced" ? "default" : "outline"}
                        className="h-auto py-6 flex flex-col items-center gap-2"
                        onClick={() => handlePortabilitySelect("balanced")}
                      >
                        <Laptop className="h-6 w-6" />
                        <span>Balanced</span>
                        <p className="text-xs text-center mt-1">Good mix of power and portability</p>
                      </Button>
                      <Button
                        variant={quizState.portability === "performance" ? "default" : "outline"}
                        className="h-auto py-6 flex flex-col items-center gap-2"
                        onClick={() => handlePortabilitySelect("performance")}
                      >
                        <Laptop className="h-6 w-6" />
                        <span>Performance</span>
                        <p className="text-xs text-center mt-1">Power over portability</p>
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-4">
                    <div className="text-2xl font-bold text-green-600">{recommendedLaptop.match}%</div>
                  </div>
                  <h3 className="text-xl font-bold">Your Perfect Match</h3>
                  <p className="text-muted-foreground">Based on your preferences</p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center bg-secondary/50 rounded-lg p-6 mb-6">
                  <div className="md:w-1/3">
                    <img
                      src={recommendedLaptop.image || "/placeholder.svg"}
                      alt={recommendedLaptop.name}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  <div className="md:w-2/3 text-left">
                    <h4 className="text-2xl font-bold text-primary mb-2">{recommendedLaptop.name}</h4>
                    <p className="text-muted-foreground mb-4">{recommendedLaptop.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {quizState.userType === "student" && (
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          Perfect for Students
                        </span>
                      )}
                      {quizState.userType === "creator" && (
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          Creator-optimized
                        </span>
                      )}
                      {quizState.userType === "professional" && (
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          Business-ready
                        </span>
                      )}
                      {quizState.userType === "gamer" && (
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          Gaming Performance
                        </span>
                      )}
                      {quizState.portability === "ultraportable" && (
                        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">Ultraportable</span>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Button asChild className="btn-primary">
                        <Link href={`/products/${recommendedLaptop.id}`}>
                          View Details <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="btn-outline"
                        onClick={() => {
                          setShowSimilarOptions(true)
                        }}
                      >
                        See Similar Options
                      </Button>
                    </div>
                  </div>
                </div>

                {showSimilarOptions && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 border-t pt-6">
                    <h4 className="text-lg font-medium mb-4">Similar Options You Might Like</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2].map((i) => {
                        // Generate different similar products based on the recommended laptop
                        const similarProduct = {
                          id: recommendedLaptop.id + i + 1,
                          name:
                            i === 1
                              ? `${recommendedLaptop.name} ${recommendedLaptop.name.includes("Pro") ? "Air" : "Pro"}`
                              : `${recommendedLaptop.name} ${recommendedLaptop.name.includes("Ultra") ? "Slim" : "Ultra"}`,
                          image: `${recommendedLaptop.image}`,
                          match: recommendedLaptop.match - i * 5,
                          description:
                            i === 1
                              ? `A lighter version with slightly less power but better battery life`
                              : `A more powerful alternative with additional features and performance`,
                        }

                        return (
                          <div key={i} className="flex gap-4 p-4 border rounded-lg bg-secondary/30">
                            <div className="w-1/3">
                              <img
                                src={similarProduct.image || "/placeholder.svg"}
                                alt={similarProduct.name}
                                className="w-full h-auto rounded-md"
                              />
                            </div>
                            <div className="w-2/3">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-medium">{similarProduct.name}</h5>
                                <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded-full">
                                  {similarProduct.match}% match
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{similarProduct.description}</p>
                              <Button asChild size="sm" variant="outline" className="text-xs h-8 btn-outline">
                                <Link href={`/products/${similarProduct.id}`}>View Details</Link>
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSimilarOptions(false)}
                      className="mt-4 text-muted-foreground"
                    >
                      Hide Similar Options
                    </Button>
                  </motion.div>
                )}

                <Button variant="ghost" onClick={resetQuiz} className="mt-2">
                  <RefreshCw className="mr-2 h-4 w-4" /> Start Over
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        {!showResults && quizState.step > 1 && (
          <CardFooter className="flex justify-between border-t p-4">
            <Button
              variant="ghost"
              onClick={() => setQuizState((prev) => ({ ...prev, step: prev.step - 1 }))}
              disabled={quizState.step === 1}
            >
              Back
            </Button>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full ${
                    step === quizState.step ? "bg-primary" : step < quizState.step ? "bg-primary/50" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <div className="w-16"></div> {/* Spacer for alignment */}
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
