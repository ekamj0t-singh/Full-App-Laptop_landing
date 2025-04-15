"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, CreditCard, Wallet, Truck, Shield, Check } from "lucide-react"
import Link from "next/link"
import RazorpayPayment from "@/components/razorpay-payment"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    upiId: "",
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
      toast({
        title: "Authentication required",
        description: "Please sign in to access the checkout page",
        variant: "destructive",
      })
    }
  }, [isAuthenticated, router])

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !orderComplete) {
      router.push("/products")
      toast({
        title: "Empty cart",
        description: "Your cart is empty. Add some products before checkout.",
        variant: "destructive",
      })
    }
  }, [items.length, router, orderComplete])

  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const calculateTotalAmount = () => {
    // Calculate final amount
    const shippingCost = totalPrice > 50000 ? 0 : 499
    const tax = Math.round(totalPrice * 0.18)
    return totalPrice + shippingCost + tax
  }

  const handlePaymentSuccess = (response: any) => {
    // In a real app, you would verify the payment with your backend
    console.log("Payment successful:", response)

    // For this demo, we'll simulate a successful payment
    setIsProcessing(false)
    setOrderComplete(true)
    clearCart()

    toast({
      title: "Payment successful",
      description: `Payment ID: ${response.razorpay_payment_id}`,
    })

    // In a real app, you would redirect to an order confirmation page
    // or update the UI to show the order details
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (paymentMethod === "card") {
      if (!formData.cardNumber || !formData.cardName || !formData.cardExpiry || !formData.cardCvv) {
        toast({
          title: "Missing payment information",
          description: "Please fill in all card details",
          variant: "destructive",
        })
        return
      }
    } else if (paymentMethod === "upi") {
      if (!formData.upiId) {
        toast({
          title: "Missing payment information",
          description: "Please enter your UPI ID",
          variant: "destructive",
        })
        return
      }
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      toast({
        title: "Missing shipping information",
        description: "Please fill in all required shipping details",
        variant: "destructive",
      })
      return
    }

    // Process payment
    setIsProcessing(true)
  }

  if (orderComplete) {
    return (
      <div className="container max-w-4xl py-12 md:py-24">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-tech-purple/20 to-tech-blue/20 rounded-full mb-6">
            <Check className="h-12 w-12 text-tech-purple" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-tech-purple to-tech-blue">
            Order Placed Successfully!
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Thank you for your purchase. Your order has been received and is being processed. You will receive a
            confirmation email shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-tech-purple to-tech-blue text-white">
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gray-300 text-black hover:bg-tech-purple hover:text-white"
            >
              <Link href="/profile">View Orders</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl py-12">
      <div className="flex items-center mb-8">
        <Button asChild variant="ghost" className="mr-4 text-black">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shopping
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-tech-purple to-tech-blue">
          Checkout
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="bg-white rounded-lg border border-gray-300 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-tech-purple">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-tech-purple"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-tech-purple"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-tech-purple"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-tech-purple"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-tech-purple"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-tech-purple"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-tech-purple"
                    required
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white rounded-lg border border-gray-300 p-6">
              <h2 className="text-xl font-semibold mb-4 text-tech-purple">Payment Method</h2>
              <Tabs defaultValue="card" value={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                  <TabsTrigger
                    value="card"
                    className="flex items-center data-[state=active]:bg-tech-purple data-[state=active]:text-white"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Credit/Debit Card
                  </TabsTrigger>
                  <TabsTrigger
                    value="upi"
                    className="flex items-center data-[state=active]:bg-tech-purple data-[state=active]:text-white"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    UPI
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="card" className="mt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-tech-purple"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        placeholder="John Doe"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-tech-purple"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Expiry Date</Label>
                        <Input
                          id="cardExpiry"
                          name="cardExpiry"
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-tech-purple"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardCvv">CVV</Label>
                        <Input
                          id="cardCvv"
                          name="cardCvv"
                          placeholder="123"
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-tech-purple"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Your card details will be securely processed by Razorpay. We don't store your card information.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="upi" className="mt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        name="upiId"
                        placeholder="yourname@upi"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-tech-purple"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You will receive a payment request on your UPI app after placing the order.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <img src="/placeholder.svg?height=40&width=40&text=GPay" alt="Google Pay" className="h-10" />
                      <img src="/placeholder.svg?height=40&width=40&text=PhonePe" alt="PhonePe" className="h-10" />
                      <img src="/placeholder.svg?height=40&width=40&text=Paytm" alt="Paytm" className="h-10" />
                      <img src="/placeholder.svg?height=40&width=40&text=BHIM" alt="BHIM" className="h-10" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg border border-gray-300 p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4 text-tech-purple">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between py-2">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded overflow-hidden mr-3 border border-gray-200">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-tech-purple">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium">{totalPrice > 50000 ? "Free" : formatPrice(499)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%)</span>
                <span className="font-medium">{formatPrice(totalPrice * 0.18)}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-purple to-tech-blue">
                  {formatPrice(calculateTotalAmount())}
                </span>
              </div>

              <RazorpayPayment
                amount={calculateTotalAmount()}
                customerInfo={{
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                  address: formData.address,
                }}
                onSuccess={handlePaymentSuccess}
              />

              <div className="flex items-center justify-center text-sm text-muted-foreground mt-4">
                <Shield className="h-4 w-4 mr-2" />
                <span>Secure payment with Razorpay</span>
              </div>

              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Truck className="h-4 w-4 mr-2" />
                <span>Free shipping on orders over ₹50,000</span>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium mb-2">Payment Information</h3>
                <p className="text-xs text-muted-foreground">
                  By clicking "Pay with Razorpay", you'll be redirected to Razorpay's secure payment gateway to complete
                  your purchase.
                </p>
                <div className="flex items-center mt-2">
                  <img src="/placeholder.svg?height=20&width=60&text=Razorpay" alt="Razorpay" className="h-5 mr-2" />
                  <img src="/placeholder.svg?height=20&width=40&text=Visa" alt="Visa" className="h-5 mr-2" />
                  <img src="/placeholder.svg?height=20&width=40&text=MC" alt="Mastercard" className="h-5 mr-2" />
                  <img src="/placeholder.svg?height=20&width=40&text=Rupay" alt="Rupay" className="h-5" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
