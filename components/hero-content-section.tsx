"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, TrendingUp, Sparkles, ShieldCheck, FileText } from "lucide-react"
import Image from "next/image"
import { useLanguage } from '@/contexts/LanguageContext'

export default function HeroContentSection() {
  const { t } = useLanguage()
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-white/80 py-20">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,248,0.9),rgba(255,255,255,1))]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-7 animate-fadeInLeft">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800">
            <TrendingUp className="h-4 w-4" />
            <span>{t('revolutionizing_agriculture')}</span>
          </div>

          <div className="space-y-5">
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {t('simplify_your')} <span className="text-emerald-700">{t('import_export')}</span>
            </h2>
            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {t('hero_content_description')}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="rounded-full bg-emerald-600 px-8 py-6 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:bg-emerald-700">
              {t('get_started_free')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              className="rounded-full border-slate-300 bg-white px-8 py-6 text-base font-semibold text-slate-700 transition-all duration-300 hover:border-emerald-300 hover:text-emerald-800"
            >
              <Play className="mr-2 h-5 w-5" />
              {t('watch_demo')}
            </Button>
          </div>

          <div className="grid gap-3 pt-2 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <ShieldCheck className="h-5 w-5 text-emerald-700" />
              <p className="mt-3 text-sm font-medium text-slate-900">Secure filing flow</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <FileText className="h-5 w-5 text-emerald-700" />
              <p className="mt-3 text-sm font-medium text-slate-900">Document tracking</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <Sparkles className="h-5 w-5 text-emerald-700" />
              <p className="mt-3 text-sm font-medium text-slate-900">Guided onboarding</p>
            </div>
          </div>
        </div>

        <div className="relative animate-fadeInRight">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
            <Image
              src="/modern-farming.png"
              alt="Digital export management workspace"
              width={960}
              height={760}
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="-mt-8 grid gap-3 px-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Profiles</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Fast onboarding</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Files</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Centralized docs</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Help</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Live support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
