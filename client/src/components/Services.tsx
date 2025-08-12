"use client";

import { useEffect, useState } from "react";
import { Hammer, Wrench, Zap } from "lucide-react";
import buildingImg from "./images/building.jpeg";
import plumbingImg from "./images/plumber.jpeg";
import elevtricalsImg from "./images/electrician.jpeg";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("services");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: <Hammer className="w-12 h-12 text-accent" />,
      title: "Building Services",
      description:
        "Complete construction and renovation services for residential and commercial properties. From foundations to finishing touches.",
      image: buildingImg,
    },
    {
      icon: <Wrench className="w-12 h-12 text-accent" />,
      title: "Plumbing Services",
      description:
        "Professional plumbing installation, repair, and maintenance. Emergency services available 24/7 for urgent issues.",
      image: plumbingImg,
    },
    {
      icon: <Zap className="w-12 h-12 text-accent" />,
      title: "Electrical Services",
      description:
        "Licensed electrical work including wiring, panel upgrades, lighting installation, and electrical safety inspections.",
      image: elevtricalsImg,
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive construction services with quality
            craftsmanship and reliable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h3 className="text-xl font-bold text-primary ml-3">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <button
                  onClick={scrollToBooking}
                  className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-accent/50"
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
