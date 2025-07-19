"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ReceiptText, FileText, Fingerprint, Globe, Banknote, ArrowRight, CheckCircle } from "lucide-react"
import { useLanguage } from '@/contexts/LanguageContext'

export default function Services() {
  const { t } = useLanguage()
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      icon: ReceiptText,
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
      icon: Banknote,
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
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-emerald-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 rounded-full animate-float blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full animate-float-delayed blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              {t('our_services')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent mb-6 animate-fadeInUp">
            {t('comprehensive_solutions')}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed animate-fadeInUp animation-delay-200">
            {t('services_description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={index}
                className={`group cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fadeInUp`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setActiveService(index)}
              >
                <div
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-emerald-200 relative overflow-hidden ${activeService === index ? "ring-2 ring-emerald-400 ring-opacity-50" : ""}`}
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className={`w-8 h-8 ${service.textColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg transform hover:scale-105 transition-all duration-300 group`}
                  >
                    {t('learn_more')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.color} opacity-10 blur-xl`}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">{t('ready_to_streamline')}</h3>
              <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                {t('join_thousands')}
              </p>
              <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300">
                {t('get_started_today')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
