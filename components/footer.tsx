"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, FileText, Shield, MapPin, Sprout } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"

export default function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="md:col-span-1 animate-fadeInUp">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-emerald-300">
                <Sprout className="h-6 w-6" />
              </div>
              <div className="text-3xl font-semibold text-white transition-transform duration-300 hover:scale-105">
                GoFarmlyConnect
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-400">
              {t('footer.description')}
            </p>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <MapPin className="w-4 h-4 text-emerald-300" />
              <span>{t('footer.location')}</span>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4 animate-fadeInUp animation-delay-200">
            <h3 className="mb-6 text-lg font-semibold text-white">{t('footer.legal')}</h3>
            <Link
              href="#"
              className="group flex items-center space-x-3 rounded-2xl p-3 text-slate-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
            >
              <FileText className="w-5 h-5 text-emerald-300 transition-transform duration-300 group-hover:scale-110" />
              <span className="group-hover:translate-x-1 transition-transform duration-300">{t('footer.terms')}</span>
            </Link>
            <Link
              href="#"
              className="group flex items-center space-x-3 rounded-2xl p-3 text-slate-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
            >
              <Shield className="w-5 h-5 text-emerald-300 transition-transform duration-300 group-hover:scale-110" />
              <span className="group-hover:translate-x-1 transition-transform duration-300">{t('footer.privacy')}</span>
            </Link>
          </div>

          {/* Contact Us */}
          <div className="space-y-4 animate-fadeInUp animation-delay-400">
            <h3 className="mb-6 text-lg font-semibold text-white">{t('footer.contactUs')}</h3>
            <div className="group flex items-center space-x-3 rounded-2xl p-3 text-slate-400 transition-colors duration-300 hover:bg-white/5 hover:text-white">
              <Phone className="w-5 h-5 text-emerald-300 transition-transform duration-300 group-hover:scale-110" />
              <span>1800-3010-1000</span>
            </div>
            <div className="group flex items-center space-x-3 rounded-2xl p-3 text-slate-400 transition-colors duration-300 hover:bg-white/5 hover:text-white">
              <Mail className="w-5 h-5 text-emerald-300 transition-transform duration-300 group-hover:scale-110" />
              <span>help@gofarmlyconnect.com</span>
            </div>
          </div>

          {/* Follow Us */}
          <div className="space-y-4 animate-fadeInUp animation-delay-600">
            <h3 className="mb-6 text-lg font-semibold text-white">{t('footer.followUs')}</h3>
            <div className="flex flex-col space-y-3">
              <Link
                href="#"
                className="group flex items-center space-x-3 rounded-2xl p-3 text-slate-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">{t('footer.facebook')}</span>
              </Link>
              <Link
                href="#"
                className="group flex items-center space-x-3 rounded-2xl p-3 text-slate-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
              >
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">{t('footer.twitter')}</span>
              </Link>
              <Link
                href="#"
                className="group flex items-center space-x-3 rounded-2xl p-3 text-slate-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">{t('footer.instagram')}</span>
              </Link>
              <Link
                href="#"
                className="group flex items-center space-x-3 rounded-2xl p-3 text-slate-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">{t('footer.linkedin')}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-slate-400 animate-fadeInUp">
              {t('footer.copyright')}
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-400 animate-fadeInUp animation-delay-200">
              <span>{t('footer.madeWithLove')}</span>
              <span>|</span>
              <span>{t('footer.proudlyIndian')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
