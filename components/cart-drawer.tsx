"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { Minus, Plus, ShoppingBag, ArrowRight, Trash2, CreditCard, Gift } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import AuthDialog from "./auth-dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)

  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true)
    } else {
      // Proceed to checkout
      onClose()
      window.location.href = "/checkout"
    }
  }

  const handleApplyPromo = () => {
    if (!promoCode) return

    setIsApplyingPromo(true)

    // Simulate API call
    setTimeout(() => {
      setPromoApplied(true)
      setIsApplyingPromo(false)
    }, 1000)
  }

  // Calculate shipping cost
  const shippingCost = totalPrice > 50000 ? 0 : 499

  // Calculate discount
  const discount = promoApplied ? Math.round(totalPrice * 0.1) : 0

  // Calculate tax
  const tax = Math.round(totalPrice * 0.18)

  // Calculate final total
  const finalTotal = totalPrice + shippingCost + tax - discount

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l-tech-purple/20">
          <div className="bg-gradient-to-r from-tech-purple to-tech-blue text-white p-6">
            <SheetHeader className="text-white">
              <SheetTitle className="flex items-center text-white">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Your Cart ({totalItems})
              </SheetTitle>
            </SheetHeader>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <ShoppingBag className="h-12 w-12 text-tech-purple" />
                </div>
              </motion.div>
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground text-center mb-6 max-w-xs">
                Looks like you haven't added any products to your cart yet.
              </p>
              <SheetClose asChild>
                <Button asChild className="bg-gradient-to-r from-tech-purple to-tech-blue text-white">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </SheetClose>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto py-6 px-6">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex items-start py-4 border-b border-gray-100"
                    >
                      <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0 gradient-border">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium text-tech-purple">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border rounded-md border-tech-purple/30">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none text-tech-purple"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none text-tech-purple"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-tech-purple to-tech-blue">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="mt-6">
                  <div className="flex items-center">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="border-tech-purple/30"
                      disabled={promoApplied}
                    />
                    <Button
                      className="ml-2 whitespace-nowrap bg-gradient-to-r from-tech-purple to-tech-blue text-white"
                      onClick={handleApplyPromo}
                      disabled={!promoCode || promoApplied || isApplyingPromo}
                    >
                      {isApplyingPromo ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Applying
                        </div>
                      ) : promoApplied ? (
                        <div className="flex items-center">
                          <Gift className="mr-2 h-4 w-4" />
                          Applied
                        </div>
                      ) : (
                        "Apply"
                      )}
                    </Button>
                  </div>
                  {promoApplied && <p className="text-sm text-green-600 mt-1">Promo code applied! 10% discount</p>}
                </div>
              </div>

              <div className="border-t border-gray-100 bg-gray-50 p-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Discount (10%)</span>
                      <span className="font-medium text-green-600">-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (18%)</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-tech-purple to-tech-blue">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-tech-purple to-tech-blue text-white hover:shadow-lg transition-all duration-300"
                    onClick={handleCheckout}
                  >
                    Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      className="w-full border-tech-purple/30 text-tech-purple hover:border-tech-purple"
                    >
                      Continue Shopping
                    </Button>
                  </SheetClose>
                  <Button
                    variant="ghost"
                    className="w-full text-red-500 hover:bg-red-50 hover:text-red-700"
                    onClick={clearCart}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Cart
                  </Button>
                </div>

                <div className="mt-6 flex items-center justify-center text-sm text-muted-foreground">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span>Secure payment processing with Razorpay</span>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <AuthDialog
        open={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        message="Please sign in to continue to checkout"
      />
    </>
  )
}
