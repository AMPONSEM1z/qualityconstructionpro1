"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-primary shadow-lg" : "bg-primary/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-white text-xl font-bold">BuildPro Construction</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("booking")}
                className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              >
                Book Appointment
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-primary-light">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection("home")}
              className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("booking")}
              className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Book Appointment
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
