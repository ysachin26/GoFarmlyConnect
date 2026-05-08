"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import Image from "next/image"
import { useLanguage } from '@/contexts/LanguageContext'

export default function Testimonials() {
  const { t } = useLanguage()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Wheat Farmer",
      location: "Punjab",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "GoFarmlyConnect transformed my farming business completely. The document filing system saved me weeks of paperwork, and the market intelligence helped me get 25% better prices for my crops.",
    },
    {
      name: "Priya Sharma",
      role: "Organic Farmer",
      location: "Maharashtra",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "The crop management features are incredible. I can now predict yields accurately and plan my farming activities better. My productivity has increased by 40% since using GoFarmlyConnect.",
    },
    {
      name: "Mohammed Ali",
      role: "Cotton Farmer",
      location: "Gujarat",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Getting loans was always a nightmare until I found GoFarmlyConnect. Now I can apply and get approved within hours. The financial services are a game-changer for small farmers like me.",
    },
    {
      name: "Sunita Devi",
      role: "Vegetable Farmer",
      location: "Uttar Pradesh",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "The mobile app is fantastic! I can manage everything from my phone - check weather, market prices, and even file documents. It's like having an agricultural expert in my pocket.",
    },
    {
      name: "Kiran Patel",
      role: "Dairy Farmer",
      location: "Rajasthan",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Customer support is outstanding. Whenever I have questions, the team responds immediately with helpful solutions. They truly understand farming challenges.",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-slate-50 py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.05),_transparent_28%)]" />

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-800 shadow-sm">
              {t('success_stories')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 animate-fadeInUp">
            {t('what_farmers_say')}
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed animate-fadeInUp animation-delay-200">
            {t('testimonials_description')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Testimonial */}
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 md:p-12 shadow-[0_16px_40px_rgba(15,23,42,0.06)] animate-fadeInUp">
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-16 h-16 text-slate-400" />
              </div>

              <div className="relative z-10">
                {/* Stars */}
                <div className="mb-6 flex items-center space-x-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-amber-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="mb-8 text-xl md:text-2xl font-medium leading-relaxed text-slate-800">
                  {testimonials[currentTestimonial].text}
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center space-x-4">
                  <Image
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-slate-100"
                  />
                  <div>
                    <div className="text-lg font-semibold text-slate-900">{testimonials[currentTestimonial].name}</div>
                    <div className="font-medium text-emerald-700">{testimonials[currentTestimonial].role}</div>
                    <div className="text-sm text-slate-500">{testimonials[currentTestimonial].location}</div>
                  </div>
                </div>
              </div>

              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-slate-50/80 opacity-70"></div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full border border-slate-200 bg-white transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </Button>

              {/* Dots */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? "bg-emerald-600 scale-125" : "bg-slate-300 hover:bg-emerald-300"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full border border-slate-200 bg-white transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center group">
              <div className="text-3xl font-semibold text-emerald-700 group-hover:scale-110 transition-transform duration-300">
                4.9/5
              </div>
              <div className="font-medium text-slate-600">{t('average_rating')}</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-semibold text-emerald-700 group-hover:scale-110 transition-transform duration-300">
                50K+
              </div>
              <div className="font-medium text-slate-600">{t('happy_farmers_count')}</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-semibold text-emerald-700 group-hover:scale-110 transition-transform duration-300">
                98%
              </div>
              <div className="font-medium text-slate-600">{t('satisfaction_rate')}</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-semibold text-emerald-700 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="font-medium text-slate-600">{t('support_available')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
