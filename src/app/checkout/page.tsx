"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Calendar, Lock } from "lucide-react"

const luhnCheck = (val: string) => {
  let checksum = 0
  let j = 1
  for (let i = val.length - 1; i >= 0; i--) {
    let calc = 0
    calc = Number(val.charAt(i)) * j
    if (calc > 9) {
      checksum = checksum + 1
      calc = calc - 10
    }
    checksum = checksum + calc
    if (j == 1) {
      j = 2
    } else {
      j = 1
    }
  }
  return checksum % 10 == 0
}

export default function CheckoutPage() {
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })
  const [isFlipped, setIsFlipped] = useState(false)
  const [errors, setErrors] = useState({
    cardNumber: "",
    expiryDate: "",
  })

  useEffect(() => {
    if (paymentDetails.expiryDate.length === 5) {
      setIsFlipped(true)
    } else {
      setIsFlipped(false)
    }
  }, [paymentDetails.expiryDate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    let formattedValue = value

    if (id === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19)
    } else if (id === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d{0,2})/, "$1/$2")
        .slice(0, 5)
    } else if (id === "cvv") {
      formattedValue = value.slice(0, 3)
    }

    setPaymentDetails((prev) => ({ ...prev, [id]: formattedValue }))
    validateField(id, formattedValue)
  }

  const validateField = (field: string, value: string) => {
    let error = ""
    if (field === "cardNumber") {
      if (!luhnCheck(value.replace(/\s/g, ""))) {
        error = "Invalid card number"
      }
    } else if (field === "expiryDate") {
      const [month, year] = value.split("/")
      const currentDate = new Date()
      const currentYear = currentDate.getFullYear() % 100
      const currentMonth = currentDate.getMonth() + 1

      if (Number(month) > 12 || Number(month) < 1) {
        error = "Invalid month"
      } else if (Number(year) < currentYear || (Number(year) === currentYear && Number(month) < currentMonth)) {
        error = "Card has expired"
      } else if (Number(year) > currentYear + 10) {
        error = "Expiry date too far in the future"
      }
    }
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (errors.cardNumber || errors.expiryDate) {
      console.log("Please correct the errors before submitting")
      return
    }
    console.log("Payment details:", paymentDetails)
    // Implement Razorpay checkout here
  }

  return (
    <div className="bg-gradient-to-br from-[#FFE6E2] to-[#FFF0ED] min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-[#F28179] mb-8 text-center"
        >
          Secure Checkout
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="max-w-2xl mx-auto overflow-hidden shadow-lg border-2 border-[#F9B4AB]">
            <CardHeader className="bg-gradient-to-r from-[#F9B4AB] to-[#F28179] text-white">
              <CardTitle className="text-2xl">Payment Details</CardTitle>
              <CardDescription className="text-pink-100">
                Enter your payment information to complete your booking
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={isFlipped ? "back" : "front"}
                    initial={{ rotateY: isFlipped ? -180 : 0, opacity: 0 }}
                    animate={{ rotateY: isFlipped ? 0 : 0, opacity: 1 }}
                    exit={{ rotateY: isFlipped ? 0 : 180, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      width: "100%",
                      height: "200px",
                      backgroundColor: "#F28179",
                      borderRadius: "10px",
                      padding: "20px",
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {!isFlipped ? (
                      <>
                        <div className="text-lg font-bold">{paymentDetails.cardNumber || "•••• •••• •••• ••••"}</div>
                        <div>
                          <div className="text-sm">Card Holder</div>
                          <div>{paymentDetails.cardName || "YOUR NAME"}</div>
                        </div>
                        <div>
                          <div className="text-sm">Expires</div>
                          <div>{paymentDetails.expiryDate || "MM/YY"}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="h-10 bg-black mt-4"></div>
                        <div className="text-right">
                          <div className="text-sm">CVV</div>
                          <div className="bg-white text-black inline-block px-2 py-1 rounded">
                            {paymentDetails.cvv || "•••"}
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="space-y-2"
                >
                  <Label htmlFor="cardName" className="text-[#B8473F]">
                    Name on Card
                  </Label>
                  <div className="relative">
                    <Input
                      id="cardName"
                      placeholder="Enter name on card"
                      className="pl-10 border-[#F9B4AB] focus:border-[#F28179] focus:ring-[#F28179]"
                      value={paymentDetails.cardName}
                      onChange={handleInputChange}
                      required
                    />
                    <CreditCard
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F28179]"
                      size={18}
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="space-y-2"
                >
                  <Label htmlFor="cardNumber" className="text-[#B8473F]">
                    Card Number
                  </Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="Enter card number"
                      className="pl-10 border-[#F9B4AB] focus:border-[#F28179] focus:ring-[#F28179]"
                      value={paymentDetails.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                    <CreditCard
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F28179]"
                      size={18}
                    />
                  </div>
                  {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                </motion.div>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="expiryDate" className="text-[#B8473F]">
                      Expiry Date
                    </Label>
                    <div className="relative">
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        className="pl-10 border-[#F9B4AB] focus:border-[#F28179] focus:ring-[#F28179]"
                        value={paymentDetails.expiryDate}
                        onChange={handleInputChange}
                        required
                      />
                      <Calendar
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F28179]"
                        size={18}
                      />
                    </div>
                    {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="cvv" className="text-[#B8473F]">
                      CVV
                    </Label>
                    <div className="relative">
                      <Input
                        id="cvv"
                        placeholder="Enter CVV"
                        className="pl-10 border-[#F9B4AB] focus:border-[#F28179] focus:ring-[#F28179]"
                        value={paymentDetails.cvv}
                        onChange={handleInputChange}
                        required
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F28179]" size={18} />
                    </div>
                  </motion.div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="bg-gray-50">
              <Button
                className="w-full bg-gradient-to-r from-[#F9B4AB] to-[#F28179] hover:from-[#F28179] hover:to-[#F9B4AB] text-white transition-all duration-300"
                onClick={handleSubmit}
              >
                Pay Securely
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

