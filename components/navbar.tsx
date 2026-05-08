"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, X, ChevronDown, Users, Headphones, Play, Info, Globe, Sprout } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const navItems = [
    { name: t('about_us'), href: "#about", icon: Info, hasDropdown: true },
    { name: t('services'), href: "#services", icon: Users, hasDropdown: true },
    { name: t('video_tutorial'), href: "#tutorials", icon: Play, hasDropdown: true },
    { name: t('support'), href: "#support", icon: Headphones, hasDropdown: true },
  ]

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी" },
    { code: "bn", name: "বাংলা" },
    { code: "te", name: "తెలుగు" },
    { code: "mr", name: "मराठी" },
    { code: "ta", name: "தமிழ்" },
    { code: "gu", name: "ગુજરાતી" },
    { code: "kn", name: "ಕನ್ನಡ" },
    { code: "ml", name: "മലയാളം" },
    { code: "pa", name: "ਪੰਜਾਬੀ" },
    { code: "or", name: "ଓଡ଼ିଆ" },
    { code: "as", name: "অসমীয়া" },
    { code: "ur", name: "اردو" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 overflow-x-hidden border-b border-slate-200/80 bg-white/85 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 max-w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group flex-shrink-0 min-w-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm transition-all duration-300 group-hover:scale-105 sm:h-10 sm:w-10">
              <Sprout className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="truncate text-sm font-semibold text-slate-900 transition-all duration-300 group-hover:text-emerald-700 sm:text-xl lg:text-2xl">
              <span className="hidden sm:inline">GoFarmlyConnect</span>
              <span className="sm:hidden">GoFarmly</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon
              return (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className="group flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <IconComponent className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-medium">{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                    )}
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Desktop Login Button and Language Selector */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0 min-w-fit">
            <Link href="/login" passHref>
              <Button className="rounded-full bg-slate-900 px-6 py-2 font-medium text-white shadow-sm transition-all duration-300 hover:bg-emerald-700 hover:shadow-md">
              {t('login_register')}
            </Button>
            </Link>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 rounded-full text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-emerald-700"
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {language === 'en' ? 'ENG' : 
                     language === 'hi' ? 'हिं' : 
                     language === 'mr' ? 'मरा' : 
                     language === 'pa' ? 'ਪੰ' : 
                     language === 'bn' ? 'বাং' : 
                     language === 'te' ? 'తె' : 
                     language === 'ta' ? 'த' : 
                     language === 'gu' ? 'ગુ' : 
                     language === 'kn' ? 'ಕ' : 
                     language === 'ml' ? 'മ' : 
                     language === 'or' ? 'ଓ' : 
                     language === 'as' ? 'অ' : 
                     language === 'ur' ? 'اردو' : 'ENG'}
                  </span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                side="bottom"
                sideOffset={8}
                avoidCollisions={true}
                collisionPadding={10}
                className="w-48 max-h-[300px] overflow-y-auto dropdown-scroll rounded-2xl border border-slate-200 bg-white shadow-xl"
              >
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    className="cursor-pointer px-4 py-2 text-slate-700 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700"
                    onClick={() => setLanguage(lang.code)}
                  >
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Elements */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Language Selector for Mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 rounded-full text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-emerald-700"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-xs">
                    {language === 'en' ? 'ENG' : 
                     language === 'hi' ? 'हिं' : 
                     language === 'mr' ? 'मरा' : 
                     language === 'pa' ? 'ਪੰ' : 
                     language === 'bn' ? 'বাং' : 
                     language === 'te' ? 'తె' : 
                     language === 'ta' ? 'த' : 
                     language === 'gu' ? 'ગુ' : 
                     language === 'kn' ? 'ಕ' : 
                     language === 'ml' ? 'മ' : 
                     language === 'or' ? 'ଓ' : 
                     language === 'as' ? 'অ' : 
                     language === 'ur' ? 'اردو' : 'ENG'}
                  </span>
                  <ChevronDown className="w-3 h-3 transition-transform duration-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                side="bottom"
                sideOffset={8}
                avoidCollisions={true}
                collisionPadding={10}
                className="w-40 max-h-[300px] overflow-y-auto dropdown-scroll rounded-2xl border border-slate-200 bg-white shadow-xl"
              >
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    className="cursor-pointer px-3 py-2 text-sm text-slate-700 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700"
                    onClick={() => setLanguage(lang.code)}
                  >
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-emerald-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="animate-slideDown border-t border-slate-200 bg-white/95 backdrop-blur-xl lg:hidden">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center space-x-3 rounded-2xl px-4 py-3 text-slate-700 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
              
              {/* Login Button in Mobile Menu */}
              <div className="pt-4 border-t border-emerald-700">
                <Link href="/login" passHref>
                  <Button 
                    className="w-full rounded-full bg-slate-900 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-emerald-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('login_register')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
