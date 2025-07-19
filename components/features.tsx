"use client"

import { CheckCircle, Zap, Shield, Users, TrendingUp, Clock } from "lucide-react"
import Image from "next/image"
import { useLanguage } from '@/contexts/LanguageContext'

export default function Features() {
  const { t } = useLanguage()
  const features = [
    {
      icon: Zap,
      title: t('lightning_fast'),
      description: t('lightning_description'),
    },
    {
      icon: Shield,
      title: t('bank_grade_security'),
      description: t('security_description'),
    },
    {
      icon: Users,
      title: t('expert_support'),
      description: t('expert_description'),
    },
    {
      icon: TrendingUp,
      title: t('proven_results'),
      description: t('results_description'),
    },
    {
      icon: Clock,
      title: t('save_time'),
      description: t('time_description'),
    },
    {
      icon: CheckCircle,
      title: t('compliance_100'),
      description: t('compliance_description'),
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full animate-float blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-r from-teal-400/10 to-emerald-400/10 rounded-full animate-float-delayed blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fadeInLeft space-y-6 sm:space-y-8">
            <div className="inline-block">
              <span className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium border border-emerald-400/30">
                {t('why_choose')}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {t('built_for_modern')}{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                {t('farmers')}
              </span>
            </h2>

            <p className="text-emerald-100 text-base sm:text-lg leading-relaxed">
              {t('features_description')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={index}
                    className="flex items-start space-x-3 sm:space-x-4 group animate-fadeInUp p-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/30 transition-colors duration-300">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-white text-sm sm:text-base mb-1 group-hover:text-emerald-300 transition-colors duration-300 leading-snug">
                        {feature.title}
                      </h3>
                      <p className="text-emerald-200 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fadeInRight mt-8 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <Image
                src="/images/digital-agriculture.png"
                alt="Digital agriculture technology"
                width={500}
                height={400}
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent rounded-2xl"></div>

              {/* Floating Stats - Better positioned for mobile */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-xl animate-float">
                <div className="text-lg sm:text-2xl font-bold text-emerald-600">99.9%</div>
                <div className="text-gray-600 text-xs sm:text-sm">{t('uptime')}</div>
              </div>

              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-xl animate-float-delayed">
                <div className="text-lg sm:text-2xl font-bold text-emerald-600">50K+</div>
                <div className="text-gray-600 text-xs sm:text-sm">{t('happy_farmers')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
