"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Clock, AlertCircle, FileText, TrendingUp, Bell, type LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ProfileCompletionModal } from "@/components/profile-completion-modal"
import { getDashboardData, markNotificationAsRead } from "@/app/actions"
import Link from "next/link"
import { useLanguage } from '@/contexts/LanguageContext'
import dynamic from "next/dynamic"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"

// Dynamically import carousel components to prevent hydration issues
const DynamicCarousel = dynamic(() => Promise.resolve(Carousel), { ssr: false })
const DynamicCarouselContent = dynamic(() => Promise.resolve(CarouselContent), { ssr: false })
const DynamicCarouselItem = dynamic(() => Promise.resolve(CarouselItem), { ssr: false })
const DynamicCarouselPrevious = dynamic(() => Promise.resolve(CarouselPrevious), { ssr: false })
const DynamicCarouselNext = dynamic(() => Promise.resolve(CarouselNext), { ssr: false })
import { cn } from "@/lib/utils"

// Map string icon names to Lucide React components (kept for Quick Stats)
const iconMap: { [key: string]: LucideIcon } = {
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  TrendingUp,
  Bell,
}

interface UserData {
  id: string
  fullName: string
  businessName: string
  businessType: "Proprietorship" | "Partnership" | "LLP" | "PVT LTD" | "Other"
  mobileNo: string
  email: string
  emailVerified: boolean
  aadharCardUrl: string
  panCardUrl: string
  photographUrl: string
  proofOfAddressUrl: string
  authorizationLetterUrl: string
  partnershipDeedUrl: string
  llpAgreementUrl: string
  certificateOfIncorporationUrl: string
  moaAoaUrl: string
  cancelledChequeUrl: string
  iecCertificate: string
  dscCertificate: string
  gstCertificate: string
  rentAgreementUrl: string
  electricityBillUrl: string
  nocUrl: string
  propertyProofUrl: string
  electricityBillOwnedUrl: string
  adCodeLetterFromBankUrl: string
  bankDocumentUrl: string
}

interface RegistrationStep {
  id: number
  name: string
  status: string
  icon: string
  completedAt?: string
}

interface Notification {
  id: string
  title: string
  message: string
  type: string
  read: boolean
  createdAt: string
}

interface DashboardData {
  user: UserData
  hasStartedRegistration: boolean
  profileCompletion: number
  registrationSteps: RegistrationStep[]
  overallProgress: number
  notifications: Notification[]
  isProfileComplete: boolean
}

export default function Dashboard() {
  const { t } = useLanguage()
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMounted, setHasMounted] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(Date.now())

  // Carousel state
  const [api, setApi] = useState<CarouselApi>()
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }
    api.on("select", () => {
      setCurrentVideoIndex(api.selectedScrollSnap())
    })
  }, [api])

  const videos = [
    {
      title: t('getting_started'),
      description: t('introduction_export_basics'),
      duration: `5 ${t('min_watch')}`,
      src: "/public1/haifam-video.mp4",
      poster: "/public1/modern-farming.png",
      category: t('getting_started_category'),
    },
    {
      title: t('complete_registration_guide'),
      description: t('step_by_step_registration'),
      duration: `12 ${t('min_watch')}`,
      src: "/public1/haifam-video.mp4",
      poster: "/public1/modern-farming.png",
      featured: true,
      category: t('getting_started_category'),
    },
    {
      title: t('document_preparation'),
      description: t('required_documents_preparation'),
      duration: `8 ${t('min_watch')}`,
      src: "/public1/haifam-video.mp4",
      poster: "/public1/modern-farming.png",
      category: t('getting_started_category'),
    },
    {
      title: "Understanding Regulations",
      description: "Key export regulations and compliance",
      duration: `10 ${t('min_watch')}`,
      src: "/public1/haifam-video.mp4",
      poster: "/placeholder.svg?height=225&width=400",
      category: "Advanced Topics",
    },
    {
      title: "Shipping & Logistics",
      description: "Navigating international shipping",
      duration: `7 ${t('min_watch')}`,
      src: "/public1/haifam-video.mp4",
      poster: "/placeholder.svg?height=225&width=400",
      category: "Advanced Topics",
    },
  ]

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const data = await getDashboardData()
      setDashboardData(data)

      if (data && data.profileCompletion < 100 && hasMounted) {
        const hasShownModal = localStorage.getItem("profileModalShown")
        if (!hasShownModal) {
          setShowProfileModal(true)
          localStorage.setItem("profileModalShown", "true")
        }
      }
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err)
      setError("Failed to load dashboard data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setHasMounted(true)
    fetchDashboardData()

    // Set up periodic refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      fetchDashboardData()
      setLastRefresh(Date.now())
    }, 30000)

    return () => clearInterval(refreshInterval)
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!hasMounted) {
    return (
      <div className="p-2 sm:p-3 md:p-4 space-y-3 md:space-y-4 w-full max-w-full mx-auto">
        <div className="animate-pulse">
          <div className="h-8 sm:h-10 lg:h-12 bg-gray-200 rounded w-2/3 sm:w-1/2 mb-3"></div>
          <div className="h-4 sm:h-5 lg:h-6 bg-gray-200 rounded w-3/4 sm:w-2/3"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-24 sm:h-32 lg:h-40 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const handleNotificationClick = async (notificationId: string) => {
    await markNotificationAsRead(notificationId)
    fetchDashboardData()
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      case "error":
        return "bg-red-50 border-red-200"
      default:
        return "bg-teal-50 border-teal-200"
    }
  }

  if (loading) {
    return (
      <div className="p-2 sm:p-3 md:p-4 space-y-3 md:space-y-4 w-full max-w-full mx-auto">
        <div className="animate-pulse">
          <div className="h-8 sm:h-10 lg:h-12 bg-gray-200 rounded w-2/3 sm:w-1/2 mb-3"></div>
          <div className="h-4 sm:h-5 lg:h-6 bg-gray-200 rounded w-3/4 sm:w-2/3"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-24 sm:h-32 lg:h-40 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-2 sm:p-3 md:p-4 text-center w-full max-w-full mx-auto">
        <div className="text-red-600 mb-4 sm:mb-6 text-sm sm:text-base">{error}</div>
        <Button onClick={fetchDashboardData} size="sm" className="text-xs sm:text-sm px-4 sm:px-6 py-2">{t('try_again')}</Button>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="p-2 sm:p-3 md:p-4 text-gray-600 text-center w-full max-w-full mx-auto">
        <p className="text-sm sm:text-base">{t('no_dashboard_data')}</p>
      </div>
    )
  }

  const {
    user,
    hasStartedRegistration,
    profileCompletion,
    registrationSteps,
    overallProgress,
    notifications,
    isProfileComplete,
  } = dashboardData

  return (
    <>
      <div className="p-2 sm:p-3 md:p-4 space-y-3 md:space-y-4 w-full max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:justify-between md:items-start">
          <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight break-words">
              {t('welcome')}, {user.fullName}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base break-words">
              {user.businessName} • {t('track_progress_description')}
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Badge variant="outline" className="text-xs sm:text-sm px-2 sm:px-3 py-1">
              {user.mobileNo}
            </Badge>
          </div>
        </div>

        {/* Profile Completion Alert */}
        {!isProfileComplete && (
          <Card className="border-yellow-200 bg-yellow-50 shadow-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1 min-w-0 flex-1">
                    <h3 className="font-semibold text-yellow-900 text-sm sm:text-base break-words">{t('complete_profile')}</h3>
                    <p className="text-xs sm:text-sm text-yellow-700 break-words">
                      {t('complete_profile')} ({profileCompletion}% done)
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => setShowProfileModal(true)}
                  className="bg-yellow-600 hover:bg-yellow-700 w-full sm:w-auto text-xs sm:text-sm px-4 sm:px-6 py-2 flex-shrink-0"
                >
                  {t('complete_profile')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

                 {/* Quick Stats */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
           <Card className="hover:shadow-md transition-shadow duration-200">
             <CardContent className="p-2 sm:p-3">
               <div className="flex items-center justify-between">
                 <div className="space-y-1 min-w-0 flex-1">
                   <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{t('profile')}</p>
                   <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{profileCompletion}%</p>
                 </div>
                 <div className="h-6 w-6 sm:h-8 sm:w-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                   <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-teal-600" />
                 </div>
               </div>
             </CardContent>
           </Card>

           <Card className="hover:shadow-md transition-shadow duration-200">
             <CardContent className="p-2 sm:p-3">
               <div className="flex items-center justify-between">
                 <div className="space-y-1 min-w-0 flex-1">
                   <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{t('progress')}</p>
                   <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{overallProgress}%</p>
                 </div>
                 <div className="h-6 w-6 sm:h-8 sm:w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                   <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                 </div>
               </div>
             </CardContent>
           </Card>

           <Card className="hover:shadow-md transition-shadow duration-200">
             <CardContent className="p-2 sm:p-3">
               <div className="flex items-center justify-between">
                 <div className="space-y-1 min-w-0 flex-1">
                   <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{t('completed_steps')}</p>
                   <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                     {registrationSteps.filter((s) => s.status === "completed").length}/{registrationSteps.length}
                   </p>
                 </div>
                 <div className="h-6 w-6 sm:h-8 sm:w-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                   <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                 </div>
               </div>
             </CardContent>
           </Card>

           <Card className="hover:shadow-md transition-shadow duration-200">
             <CardContent className="p-2 sm:p-3">
               <div className="flex items-center justify-between">
                 <div className="space-y-1 min-w-0 flex-1">
                   <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{t('notifications')}</p>
                   <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{notifications.filter((n) => !n.read).length}</p>
                 </div>
                 <div className="h-6 w-6 sm:h-8 sm:w-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                   <Bell className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600" />
                 </div>
               </div>
             </CardContent>
           </Card>
         </div>

        {!hasStartedRegistration ? (
          <Card className="border-2 border-dashed border-gray-300 bg-gray-50 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12 lg:py-16">
              <FileText className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 text-gray-400 mb-4 sm:mb-6" />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 text-center">{t('get_started_title')}</h3>
              <p className="text-gray-600 text-center mb-4 sm:mb-6 max-w-md text-sm sm:text-base px-4">
                {t('get_started_description')}
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3">
                {t('start_registration_process')}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
                         {/* Overall Registration Progress Bar */}
             <Card className="shadow-sm">
               <CardHeader className="pb-3 sm:pb-4">
                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
                   <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
                     <CardTitle className="text-base sm:text-lg md:text-xl break-words">{t('overall_registration_progress')}</CardTitle>
                     <CardDescription className="text-xs sm:text-sm break-words">{t('export_ready_journey')}</CardDescription>
                   </div>
                   <Link href="/dashboard/progress" className="flex-shrink-0">
                     <Button
                       variant="outline"
                       size="sm"
                       className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 w-full sm:w-auto text-xs sm:text-sm px-4 sm:px-6 py-2"
                     >
                       {t('track_your_progress')}
                     </Button>
                   </Link>
                 </div>
               </CardHeader>
               <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4">
                 <div className="space-y-3 sm:space-y-4">
                   <div className="flex items-center justify-between">
                     <span className="text-xs sm:text-sm font-medium truncate">{t('overall_progress')}</span>
                     <span className="text-xs sm:text-sm text-gray-600 font-semibold flex-shrink-0 ml-2">{overallProgress}%</span>
                   </div>
                   <Progress value={overallProgress} className="h-2 sm:h-3 w-full" />
                 </div>
               </CardContent>
             </Card>

                         {/* Video Tutorial Section */}
             <Card className="bg-gray-50 border-gray-200 shadow-sm">
               <CardHeader className="pb-3 sm:pb-4">
                 <div className="space-y-1 sm:space-y-2">
                   <CardTitle className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 break-words">
                     📚 {t('learn_exporter_title')}
                   </CardTitle>
                   <CardDescription className="text-gray-600 text-xs sm:text-sm break-words">
                     {t('tutorial_description')}
                   </CardDescription>
                 </div>
               </CardHeader>
                               <CardContent className="px-2 sm:px-3 md:px-4">
                  <DynamicCarousel setApi={setApi} className="w-full max-w-full mx-auto">
                    <DynamicCarouselContent className="-ml-1 sm:-ml-2 md:-ml-4">
                      {videos.map((video, index) => (
                        <DynamicCarouselItem key={index} className="pl-1 sm:pl-2 md:pl-3 basis-full sm:basis-1/2 lg:basis-1/3">
                         <div
                           className={cn(
                             "bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out shadow-sm",
                             index === currentVideoIndex
                               ? "scale-105 opacity-100 shadow-lg border-teal-200"
                               : "scale-95 opacity-70 blur-[0.5px]",
                           )}
                         >
                           <div className="relative">
                             <video
                               className="w-full h-24 sm:h-32 md:h-40 object-cover"
                               poster={video.poster}
                               muted
                               controls={index === currentVideoIndex}
                             >
                               <source src={video.src} type="video/mp4" />
                             </video>
                             {index !== currentVideoIndex && (
                               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                 <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                                   <div className="w-0 h-0 border-l-2 sm:border-l-3 md:border-l-4 border-l-gray-700 border-t-1 sm:border-t-2 md:border-t-3 border-t-transparent border-b-1 sm:border-b-2 md:border-b-3 border-b-transparent ml-0.5 sm:ml-1"></div>
                                 </div>
                               </div>
                             )}
                           </div>
                           <div className="p-2 sm:p-3 md:p-4">
                             <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base break-words">{video.title}</h3>
                             <p className="text-xs sm:text-sm text-gray-600 mb-3 break-words">{video.description}</p>
                             <div className="flex items-center justify-between">
                               <span className="text-xs text-gray-500 truncate">{video.duration}</span>
                               {video.featured && (
                                 <Badge variant="secondary" className="bg-teal-100 text-teal-700 text-xs flex-shrink-0 ml-2">
                                   {t('featured')}
                                 </Badge>
                               )}
                             </div>
                           </div>
                         </div>
                                               </DynamicCarouselItem>
                      ))}
                    </DynamicCarouselContent>
                    <DynamicCarouselPrevious className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
                    <DynamicCarouselNext className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
                  </DynamicCarousel>

                 <div className="mt-4 sm:mt-6 text-center">
                   <Link href="/dashboard/tutorials">
                     <Button
                       variant="outline"
                       className="text-gray-700 border-gray-300 hover:bg-gray-100 bg-transparent text-xs sm:text-sm px-4 sm:px-6 py-2"
                     >
                       {t('view_all_tutorials')}
                     </Button>
                   </Link>
                 </div>
               </CardContent>
             </Card>
          </>
        )}
      </div>

      <ProfileCompletionModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onUpdate={fetchDashboardData}
      />
    </>
  )
}
