"use client";

import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-light overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/modern-building-construction.png"
          alt="Construction site background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-primary/60"></div>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Quality Construction
          <span className="block text-accent">You Can Trust</span>
        </h1>
        <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Professional building, plumbing, and electrical services for your
          home and business needs.
        </p>
        <button
          onClick={scrollToBooking}
          className="bg-accent hover:bg-accent-dark text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/50 shadow-lg"
        >
          Book an Appointment
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
