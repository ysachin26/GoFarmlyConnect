"use client"

import { CheckCircle, Zap, Shield, Users, TrendingUp, Clock } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"

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
    <section className="relative overflow-hidden border-y border-slate-200 bg-white py-16 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.05),_transparent_28%)]" />

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-16">
          <div className="space-y-6 sm:space-y-8 animate-fadeInLeft">
            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800">
              {t('why_choose')}
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {t('built_for_modern')} <span className="text-emerald-700">{t('farmers')}</span>
              </h2>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {t('features_description')}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={index}
                    className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white hover:shadow-sm"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-emerald-700 shadow-sm transition-colors duration-300 group-hover:border-emerald-200">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 text-sm font-semibold leading-snug text-slate-900 group-hover:text-emerald-700">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative animate-fadeInRight">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:max-w-none">
              <video
                className="h-full w-full rounded-[1.5rem] object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/modern-farming.png"
              >
                <source src="/haifam-video.mp4" type="video/mp4" />
                <Image
                  src="/modern-farming.png"
                  alt="Digital agriculture technology"
                  width={500}
                  height={400}
                  className="h-auto w-full rounded-[1.5rem] object-cover"
                />
              </video>

              <div className="absolute inset-4 rounded-[1.5rem] bg-gradient-to-t from-slate-950/10 to-transparent" />

              <div className="absolute -top-3 -right-3 rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-md">
                <div className="text-lg font-semibold text-emerald-700">99.9%</div>
                <div className="text-xs text-slate-500">{t('uptime')}</div>
              </div>

              <div className="absolute -bottom-3 -left-3 rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-md">
                <div className="text-lg font-semibold text-emerald-700">50K+</div>
                <div className="text-xs text-slate-500">{t('happy_farmers')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
