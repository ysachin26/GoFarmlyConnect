"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactUs() {
  const { t } = useLanguage()
  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-slate-50 py-20 text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.05),_transparent_28%)]" />

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-800 shadow-sm">
              {t('get_in_touch')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 animate-fadeInUp text-slate-900">{t('contact_us')}</h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed animate-fadeInUp animation-delay-200">
            {t('contact_description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8 animate-fadeInLeft">
            <div>
              <h3 className="text-2xl font-semibold mb-8 text-slate-900">{t('get_in_touch')}</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-200">
                    <Phone className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-slate-900">{t('helpdesk_24x7')}</p>
                    <p className="text-slate-600">1800-3010-1000 {t('toll_free')}</p>
                    <p className="text-slate-500 text-sm">{t('available_round_clock')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-200">
                    <Mail className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-slate-900">Email Support</p>
                    <p className="text-slate-600">help@gofarmlyconnect.com</p>
                    <p className="text-slate-500 text-sm">Response within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-200">
                    <MessageCircle className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-slate-900">WhatsApp Support</p>
                    <p className="text-slate-600">+91 98765 43210</p>
                    <p className="text-slate-500 text-sm">Quick assistance via chat</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-200">
                    <MapPin className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-slate-900">Head Office</p>
                    <p className="text-slate-600">
                      GoFarmlyConnect Technologies Pvt Ltd
                      <br />
                      Agricultural Innovation Hub
                      <br />
                      Sector 62, Noida - 201309
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-200">
                    <Clock className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-slate-900">Support Hours</p>
                    <p className="text-slate-600">24/7 Available</p>
                    <p className="text-slate-500 text-sm">Always here when you need us</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.06)] animate-fadeInRight">
            <h3 className="mb-8 text-2xl font-semibold text-slate-900">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">First Name</label>
                  <Input
                    placeholder="Enter your first name"
                    className="rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Last Name</label>
                  <Input
                    placeholder="Enter your last name"
                    className="rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Subject</label>
                <Input
                  placeholder="What can we help you with?"
                  className="rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
                <Textarea
                  placeholder="Tell us more about your requirements..."
                  rows={5}
                  className="resize-none rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-400"
                />
              </div>

              <Button className="w-full rounded-full bg-slate-900 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-emerald-700">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
