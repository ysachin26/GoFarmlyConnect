"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Clock, Users } from "lucide-react"
import Image from "next/image"
import { useLanguage } from '@/contexts/LanguageContext'

export default function LearnWithUs() {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  const tutorials = [
    {
      title: t('farm_registration_title'),
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "5:30",
      views: "12.5K",
      category: t('getting_started_category'),
    },
    {
      title: t('crop_management_title'),
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "8:45",
      views: "8.2K",
      category: t('management_category'),
    },
    {
      title: t('market_price_title'),
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "6:20",
      views: "15.1K",
      category: t('analytics_category'),
    },
    {
      title: t('digital_payment_title'),
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "4:15",
      views: "9.8K",
      category: t('finance_category'),
    },
    {
      title: t('supply_chain_title'),
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "7:30",
      views: "11.3K",
      category: t('logistics_category'),
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, tutorials.length - 2))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, tutorials.length - 2)) % Math.max(1, tutorials.length - 2))
  }

  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-white py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.05),_transparent_28%)]" />

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          {/* Learning Resources Tag */}
          <div className="animate-fadeInUp">
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800">
              {t('learning_resources')}
            </span>
          </div>
          
          {/* Learn With GoFarmlyConnect Title */}
          <div className="flex flex-col items-center animate-fadeInUp animation-delay-200">
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 transition-transform duration-300 hover:scale-105">
              {t('learn_with_gofarmly')}
            </h2>
            <div className="mt-2 h-1 w-32 rounded-full bg-emerald-400 transform scale-x-0 animate-scaleX animation-delay-500"></div>
          </div>
          
          {/* Description */}
          <div className="animate-fadeInUp animation-delay-400">
            <p className="max-w-3xl mx-auto text-lg leading-relaxed text-slate-600 transition-colors duration-300 hover:text-slate-800">
              {t('learn_description')}
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center justify-center space-x-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full border border-slate-200 bg-white transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 group"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700 transition-colors duration-300 group-hover:text-emerald-700" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
              {tutorials.slice(currentSlide, currentSlide + 3).map((tutorial, index) => (
                <div
                  key={index}
                  className="group cursor-pointer overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={tutorial.thumbnail || "/placeholder.svg"}
                      alt={tutorial.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="rounded-full bg-emerald-600 p-4 text-white shadow-xl transition-transform duration-300 group-hover:scale-100">
                        <Play className="w-8 h-8 text-white fill-white" />
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 rounded-full border border-white/10 bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition-transform duration-300 transform -translate-y-2 group-hover:translate-y-0">
                      {tutorial.category}
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-4 right-4 flex items-center space-x-1 rounded-lg bg-slate-950/75 px-2 py-1 text-xs text-white backdrop-blur-sm">
                      <Clock className="w-3 h-3" />
                      <span>{tutorial.duration}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="mb-3 text-lg font-semibold text-slate-900 transition-colors duration-300 line-clamp-2 group-hover:text-emerald-700">
                      {tutorial.title}
                    </h3>

                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{tutorial.views} {t('views')}</span>
                      </div>
                      <div className="font-medium text-emerald-700 transition-colors duration-300 group-hover:text-emerald-800">
                        {t('watch_now')} →
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 blur-xl"></div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full border border-slate-200 bg-white transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 group"
            >
              <ChevronRight className="w-5 h-5 text-slate-700 transition-colors duration-300 group-hover:text-emerald-700" />
            </Button>
          </div>

          <div className="flex justify-center mt-12">
            <Button className="rounded-full bg-slate-900 px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-emerald-700">
              <span className="mr-2">{t('view_all_tutorials')}</span>
              <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
