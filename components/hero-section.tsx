"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, ShieldCheck, Play } from "lucide-react"
import { useLanguage } from '@/contexts/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()
  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-[#0f172a] pt-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.08),_transparent_24%),linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(15,23,42,0.88))]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div className="space-y-8 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-white/8 px-4 py-2 text-sm text-emerald-100 backdrop-blur-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            <span>{t('revolutionizing_agriculture')}</span>
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {t('welcome_to')}{" "}
              <span className="text-emerald-300">{t('gofarmlyconnect')}</span>
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              {t('hero_description')}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="rounded-full bg-emerald-500 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:bg-emerald-400 hover:shadow-emerald-500/30">
              {t('get_started_free')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              className="rounded-full border border-white/15 bg-white/5 px-8 py-6 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              <Play className="mr-2 h-5 w-5" />
              {t('watch_demo')}
            </Button>
          </div>

          <div className="grid max-w-2xl grid-cols-3 gap-4 pt-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-2xl font-semibold text-white">50K+</div>
              <div className="mt-1 text-xs text-slate-300">{t('active_farmers')}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-2xl font-semibold text-white">₹500Cr+</div>
              <div className="mt-1 text-xs text-slate-300">{t('trade_volume')}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-2xl font-semibold text-white">99.9%</div>
              <div className="mt-1 text-xs text-slate-300">{t('uptime')}</div>
            </div>
          </div>
        </div>

        <div className="relative animate-fadeInRight">
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-4 shadow-2xl shadow-black/25 backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900">
              <video
                className="h-full w-full object-cover"
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
                  alt="Modern agricultural operations dashboard"
                  width={960}
                  height={760}
                  priority
                  className="h-auto w-full object-cover"
                />
              </video>

              <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-slate-950/75 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm">
                Sidebox demo video
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                <p className="mt-3 text-sm font-medium text-white">Verified onboarding</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                <p className="mt-3 text-sm font-medium text-white">Document workflow</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                <p className="mt-3 text-sm font-medium text-white">Live support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
