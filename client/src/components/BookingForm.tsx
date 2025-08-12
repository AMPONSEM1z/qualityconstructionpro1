"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle, AlertCircle } from "lucide-react"

interface FormData {
  fullName: string
  email: string
  phone: string
  location: string
  serviceType: string
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  location?: string
  serviceType?: string
}

const BookingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    serviceType: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[\d\s\-+$$$$]{10,}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    if (!formData.serviceType) {
      newErrors.serviceType = "Please select a service type"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("http://localhost:3001/send-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          location: "",
          serviceType: "",
        })
      } else {
        setSubmitStatus("error")
        setErrorMessage(data.message || "Failed to send appointment request")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Book an Appointment</h2>
          <p className="text-xl text-gray-600">
            Ready to get started? Fill out the form below and we'll contact you soon.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 shadow-lg">
          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <p className="text-green-800">
                ✅ Thank you! Your appointment request has been sent. We'll contact you soon.
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
              <p className="text-red-800">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Service *
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors ${
                    errors.serviceType ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a service</option>
                  <option value="Building">Building</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                </select>
                {errors.serviceType && <p className="mt-1 text-sm text-red-600">{errors.serviceType}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Project Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors ${
                  errors.location ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter the project location"
              />
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Appointment Request"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default BookingForm
