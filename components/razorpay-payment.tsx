"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useCart } from "@/hooks/use-cart"

// Declare Razorpay type
declare global {
  interface Window {
    Razorpay: any
  }
}

interface RazorpayPaymentProps {
  amount: number
  customerInfo: {
    name: string
    email: string
    phone: string
    address?: string
  }
  onSuccess: (response: any) => void
  onFailure?: (error: any) => void
}

// Razorpay API key - in a real app, this would be an environment variable
const RAZORPAY_KEY_ID = "rzp_test_YourTestKey"

export default function RazorpayPayment({ amount, customerInfo, onSuccess, onFailure }: RazorpayPaymentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  const { clearCart } = useCart()

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpay = async () => {
      if (window.Razorpay) {
        setRazorpayLoaded(true)
        return
      }

      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      script.onload = () => {
        setRazorpayLoaded(true)
      }
      document.body.appendChild(script)

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script)
        }
      }
    }

    loadRazorpay()
  }, [])

  // Create Razorpay order
  const createRazorpayOrder = async () => {
    try {
      // In a real app, this would be an API call to your backend
      // For this demo, we'll simulate creating an order
      const orderData = {
        amount: amount * 100, // Razorpay expects amount in paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone,
        },
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, your backend would create the order and return the order ID
      const mockOrderId = `order_${Date.now()}`
      return mockOrderId
    } catch (error) {
      console.error("Error creating Razorpay order:", error)
      toast({
        title: "Error creating order",
        description: "There was a problem creating your order. Please try again.",
        variant: "destructive",
      })
      if (onFailure) onFailure(error)
      return null
    }
  }

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      toast({
        title: "Payment gateway not loaded",
        description: "Please try again in a moment",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Create Razorpay order
    const orderId = await createRazorpayOrder()
    if (!orderId) {
      setIsLoading(false)
      return
    }

    // Create Razorpay options
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      name: "Tech Laptops",
      description: "Purchase from Tech Laptops",
      order_id: orderId,
      image: "/placeholder.svg?height=60&width=60",
      handler: (response: any) => {
        // Handle successful payment
        setIsLoading(false)
        onSuccess(response)
        clearCart()
      },
      prefill: {
        name: customerInfo.name,
        email: customerInfo.email,
        contact: customerInfo.phone,
      },
      notes: {
        address: customerInfo.address,
      },
      theme: {
        color: "#7C3AED",
      },
      modal: {
        ondismiss: () => {
          setIsLoading(false)
          toast({
            title: "Payment cancelled",
            description: "You have cancelled the payment process",
            variant: "destructive",
          })
        },
      },
    }

    try {
      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Error opening Razorpay:", error)
      setIsLoading(false)
      toast({
        title: "Payment error",
        description: "There was a problem initiating the payment. Please try again.",
        variant: "destructive",
      })
      if (onFailure) onFailure(error)
    }
  }

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading || !razorpayLoaded}
      className="w-full bg-gradient-to-r from-tech-purple to-tech-blue text-white hover:shadow-lg transition-all duration-300"
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : (
        <>Pay with Razorpay</>
      )}
    </Button>
  )
}
