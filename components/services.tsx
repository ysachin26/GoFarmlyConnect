"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Fingerprint, Globe, DollarSign, ArrowRight, CheckCircle, CreditCard } from "lucide-react"
import { useLanguage } from '@/contexts/LanguageContext'

export default function Services() {
  const { t } = useLanguage()
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      icon: CreditCard,
      title: t('gst_filing'),
      description: t('gst_description'),
      features: [t('automated_gst_returns'), t('input_tax_credit'), t('reconciliation_tools'), t('audit_support')],
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      icon: FileText,
      title: t('iec_registration'),
      description: t('iec_description'),
      features: [t('new_iec_application'), t('iec_modification'), t('iec_renewal'), t('consultation_services')],
      color: "from-teal-500 to-emerald-600",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
    },
    {
      icon: Fingerprint,
      title: t('dsc_procurement'),
      description: t('dsc_description'),
      features: [t('class3_dsc'), t('organization_dsc'), t('individual_dsc'), t('renewal_services')],
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      icon: Globe,
      title: t('icegate_services'),
      description: t('icegate_description'),
      features: [t('bill_of_entry'), t('shipping_bill'), t('duty_payment'), t('status_tracking')],
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: DollarSign,
      title: t('adcode_registration'),
      description: t('adcode_description'),
      features: [t('adcode_reg'), t('bank_linkage'), t('export_incentives'), t('compliance_checks')],
      color: "from-purple-500 to-fuchsia-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      icon: FileText,
      title: t('other_documents'),
      description: t('other_documents_description'),
      features: [t('rcmc_application'), t('meis_seis_claims'), t('epcg_license'), t('advance_authorization')],
      color: "from-orange-500 to-yellow-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ]

  return (
    <section id="services" className="relative overflow-hidden border-y border-slate-200 bg-slate-50 py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.09),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.65),_rgba(248,250,248,1))]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-800 shadow-sm">
            {t('our_services')}
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            {t('comprehensive_solutions')}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
            {t('services_description')}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => {
            const IconComponent = service.icon
            const isActive = activeService === index

            return (
              <div
                key={index}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 0.08}s` }}
                onMouseEnter={() => setActiveService(index)}
              >
                <div
                  className={`relative h-full overflow-hidden rounded-[1.75rem] border bg-white p-7 shadow-[0_14px_35px_rgba(15,23,42,0.06)] transition-all duration-300 ${isActive ? "border-emerald-200 shadow-[0_18px_45px_rgba(16,185,129,0.08)]" : "border-slate-200"}`}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-slate-200" />

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                    <IconComponent className="h-7 w-7 text-emerald-700" />
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>

                  <ul className="mt-6 space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3 text-sm text-slate-600">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`mt-7 w-full rounded-full border border-slate-200 bg-slate-900 text-white transition-all duration-300 hover:bg-slate-800 ${isActive ? "shadow-md" : "shadow-none"}`}
                  >
                    {t('learn_more')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-[0_14px_35px_rgba(15,23,42,0.05)] md:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">{t('ready_to_streamline')}</h3>
              <p className="mt-2 max-w-2xl text-slate-600">{t('join_thousands')}</p>
            </div>
            <Button className="rounded-full bg-emerald-600 px-8 py-6 text-base font-semibold text-white transition-all duration-300 hover:bg-emerald-700">
              {t('get_started_today')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
