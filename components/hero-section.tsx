"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { useLanguage } from '@/contexts/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()
  return (
    <section className="relative min-h-screen pt-16 bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 overflow-hidden flex items-center justify-center">
      {/* Full Screen Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline preload="auto">
          <source src="/haifam-video.mp4" type="video/webm" />
          {/* Fallback background image if video fails to load */}
          <Image
            src="/hero-farmer.png"
            alt="Modern farming with technology"
            fill
            className="object-cover"
            priority
          />
        </video>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 via-teal-800/60 to-emerald-900/70" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Animated Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-r from-teal-400/10 to-emerald-400/10 rounded-full animate-float-delayed blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full animate-pulse blur-lg"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 py-12 text-center">
        <div className="space-y-8 animate-fadeInUp">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-400/30">
              <span className="text-emerald-200 text-sm font-medium">{t('revolutionizing_agriculture')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight break-words">
              {t('welcome_to')}{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                {t('gofarmlyconnect')}
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-emerald-100 leading-relaxed max-w-4xl mx-auto break-words">
              {t('hero_description')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group">
              {t('get_started_free')}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

            <Button
              variant="ghost"
              className="bg-gradient-to-r from-black/20 to-white/10 hover:from-black/30 hover:to-white/20 border border-white/20 text-white backdrop-blur-sm px-10 py-4 rounded-xl font-semibold text-lg transform hover:scale-105 transition-all duration-300 group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              {t('watch_demo')}
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12 pt-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">50K+</div>
              <div className="text-emerald-200 text-xs sm:text-sm">{t('active_farmers')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">₹500Cr+</div>
              <div className="text-emerald-200 text-xs sm:text-sm">{t('trade_volume')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">99.9%</div>
              <div className="text-emerald-200 text-xs sm:text-sm">{t('uptime')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Updates Banner */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-emerald-600/90 backdrop-blur-sm text-white py-3 sm:py-4 px-4 shadow-2xl">
        <div className="container mx-auto">
          {/* Mobile Layout: Header above slider */}
          <div className="block sm:hidden">
            <div className="text-center mb-2">
              <span className="font-bold bg-gradient-to-r from-emerald-700 to-teal-700 px-3 py-1.5 rounded-full shadow-lg text-sm">
                {t('latest_updates')}
              </span>
            </div>
            <div className="overflow-hidden">
              <div className="animate-marquee whitespace-nowrap text-sm">
                <span className="mr-8">{t('ai_crop_prediction')}</span>
                <span className="mr-8">{t('mobile_app_launched')}</span>
                <span className="mr-8">{t('special_financing')}</span>
              </div>
            </div>
          </div>

          {/* Desktop Layout: Inline header and slider */}
          <div className="hidden sm:flex items-center space-x-4">
            <span className="font-bold bg-gradient-to-r from-emerald-700 to-teal-700 px-4 py-2 rounded-full shadow-lg animate-pulse">
              {t('latest_updates')}
            </span>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                <span className="mr-12">{t('ai_crop_prediction')}</span>
                <span className="mr-12">{t('mobile_app_launched')}</span>
                <span className="mr-12">{t('special_financing')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
