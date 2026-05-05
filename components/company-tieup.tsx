"use client"

import { useLanguage } from '@/contexts/LanguageContext'
import { Landmark, Banknote, Store, Globe, Microscope, Rocket, Factory, Sprout } from "lucide-react"

export default function CompanyTieup() {
  const { t } = useLanguage()
  const partners = [
    { name: "Ministry of Agriculture", icon: Landmark, category: "Government" },
    { name: "NABARD", icon: Banknote, category: "Banking" },
    { name: "FCI", icon: Sprout, category: "Food Corp" },
    { name: "APMC", icon: Store, category: "Market" },
    { name: "Digital India", icon: Globe, category: "Initiative" },
    { name: "ICAR", icon: Microscope, category: "Research" },
    { name: "Startup India", icon: Rocket, category: "Startup" },
    { name: "Make in India", icon: Factory, category: "Manufacturing" },
  ]

  const duplicatedPartners = [...partners, ...partners]

  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-white py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.06),_transparent_28%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800">
              {t('trusted_partners')}
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-6 animate-fadeInUp">
            {t('our_partners_integrations')}
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed animate-fadeInUp animation-delay-200">
            {t('partners_description')}
          </p>
        </div>

        {/* Partners Grid - Fixed width and proper container */}
        <div className="max-w-6xl mx-auto relative overflow-hidden">
          <div className="flex animate-scroll space-x-3 md:space-x-6 py-4">
            {duplicatedPartners.map((partner, index) => (
              <div key={index} className="flex-shrink-0 group cursor-pointer w-48 md:w-64">
                <div className="relative bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 group-hover:border-emerald-200 transform hover:scale-[1.02] hover:-translate-y-1">
                  <div className="text-center">
                    <div className="mx-auto mb-3 md:mb-4 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 group-hover:border-emerald-200 group-hover:text-emerald-700 transition-all duration-300">
                      <partner.icon className="h-6 w-6 md:h-8 md:w-8" />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base text-slate-800 group-hover:text-emerald-700 transition-colors duration-300 mb-2">
                      {partner.name}
                    </h3>
                    <span className="inline-block bg-slate-100 text-slate-600 px-2 md:px-3 py-1 rounded-full text-xs font-medium">
                      {partner.category}
                    </span>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 blur-xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center group">
            <div className="text-3xl font-semibold text-emerald-700 group-hover:scale-110 transition-transform duration-300">
              25+
            </div>
            <div className="text-slate-600 font-medium">{t('government_partners')}</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl font-semibold text-emerald-700 group-hover:scale-110 transition-transform duration-300">
              15+
            </div>
            <div className="text-slate-600 font-medium">{t('banking_partners')}</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl font-semibold text-emerald-700 group-hover:scale-110 transition-transform duration-300">
              50+
            </div>
            <div className="text-slate-600 font-medium">{t('tech_integrations')}</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl font-semibold text-emerald-700 group-hover:scale-110 transition-transform duration-300">
              100%
            </div>
            <div className="text-slate-600 font-medium">{t('compliance_rate')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
