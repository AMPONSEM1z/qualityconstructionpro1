"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Services from "./components/Services"
import BookingForm from "./components/BookingForm"
import Footer from "./components/Footer"
import "./App.css"

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <BookingForm />
      </main>
      <Footer />
    </div>
  )
}

export default App
