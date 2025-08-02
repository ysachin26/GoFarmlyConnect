import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GoFarmlyConnect - Export Registration Dashboard",
  description: "Track your export registration progress and manage your documents",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <SidebarProvider defaultOpen={true}>
            <div className="flex h-screen w-full overflow-hidden">
              <AppSidebar />
              <div className="flex-1 flex flex-col min-w-0">
                <TopNavbar />
                <main className="flex-1 bg-gray-50 overflow-auto">
                  <div className="h-full w-full">
                    {children}
                  </div>
                </main>
              </div>
            </div>
            <Toaster />
          </SidebarProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
