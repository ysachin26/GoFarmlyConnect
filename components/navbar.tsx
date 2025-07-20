"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, X, ChevronDown, Users, Headphones, Play, Info, Globe } from "lucide-react"
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
    { code: "mr", name: "मराठी" },
  ]

  return (
    <nav className="bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900 shadow-2xl sticky top-0 z-50 backdrop-blur-sm border-b border-emerald-700/30 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 max-w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group flex-shrink-0 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
              <span className="text-white font-bold text-sm sm:text-lg">🌾</span>
            </div>
            <div className="text-sm sm:text-xl lg:text-2xl font-bold text-white group-hover:text-emerald-300 transition-all duration-500 transform group-hover:scale-105 truncate">
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
                    className="flex items-center space-x-2 px-4 py-2 text-white hover:text-emerald-300 hover:bg-white/10 rounded-xl transition-all duration-300 group transform hover:scale-105 hover:shadow-lg"
                  >
                    <IconComponent className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                    <span className="font-medium">{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                    )}
                  </Link>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
                </div>
              )
            })}
          </div>

          {/* Desktop Login Button and Language Selector */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0 min-w-fit">
            <Link href="/login" passHref>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-xl font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              {t('login_register')}
            </Button>
            </Link>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-emerald-300 hover:bg-white/10 rounded-xl transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">{language === 'en' ? 'ENG' : language === 'hi' ? 'हिं' : language === 'mr' ? 'मरा' : 'ENG'}</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                side="bottom"
                sideOffset={8}
                avoidCollisions={true}
                collisionPadding={10}
                className="w-48 max-h-[300px] overflow-y-auto dropdown-scroll bg-white rounded-xl shadow-2xl border border-gray-200"
              >
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    className="px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 cursor-pointer"
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
                  className="text-white hover:text-emerald-300 hover:bg-white/10 rounded-xl transition-all duration-300 flex items-center space-x-1 transform hover:scale-105"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-xs">{language === 'en' ? 'ENG' : language === 'hi' ? 'हिं' : language === 'mr' ? 'मरा' : 'ENG'}</span>
                  <ChevronDown className="w-3 h-3 transition-transform duration-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                side="bottom"
                sideOffset={8}
                avoidCollisions={true}
                collisionPadding={10}
                className="w-40 max-h-[300px] overflow-y-auto dropdown-scroll bg-white rounded-xl shadow-2xl border border-gray-200"
              >
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    className="px-3 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 cursor-pointer text-sm"
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
              className="text-white hover:text-emerald-300 hover:bg-white/10 rounded-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-emerald-800/95 backdrop-blur-sm border-t border-emerald-700 rounded-b-xl animate-slideDown">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 text-white hover:text-emerald-300 hover:bg-white/10 transition-all duration-300 py-3 px-4 rounded-xl group transform hover:scale-105"
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
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
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
