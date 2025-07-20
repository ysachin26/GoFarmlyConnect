"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { useLanguage } from '@/contexts/LanguageContext'

export default function FAQ() {
  const { t } = useLanguage()
  const [openFAQ, setOpenFAQ] = useState(0)

  const faqs = [
    {
      question: t('faq_q1'),
      answer: t('faq_a1'),
    },
    {
      question: t('faq_q2'),
      answer: t('faq_a2'),
    },
    {
      question: t('faq_q3'),
      answer: t('faq_a3'),
    },
    {
      question: t('faq_q4'),
      answer: t('faq_a4'),
    },
    {
      question: t('faq_q5'),
      answer: t('faq_a5'),
    },
    {
      question: t('faq_q6'),
      answer: t('faq_a6'),
    },
    {
      question: t('faq_q7'),
      answer: t('faq_a7'),
    },
    {
      question: t('faq_q8'),
      answer: t('faq_a8'),
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full animate-float blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full animate-float-delayed blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              {t('got_questions')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent mb-6 animate-fadeInUp">
            {t('frequently_asked_questions')}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed animate-fadeInUp animation-delay-200">
            {t('faq_description')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 group"
                  onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-200">
                      <HelpCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800 group-hover:text-emerald-600 transition-colors duration-200">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      openFAQ === index ? "rotate-180 text-emerald-600" : ""
                    }`}
                  />
                </button>

                <div
                  className={`${
                    openFAQ === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden transition-all duration-300`}
                >
                  <div className="px-8 pb-6">
                    <div className="pl-14">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">{t('still_have_questions')}</h3>
                <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                  {t('support_team_help')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-emerald-600 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300">
                    {t('contact_support')}
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300">
                    {t('schedule_call')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
