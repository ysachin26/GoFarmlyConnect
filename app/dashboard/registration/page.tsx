"use client"

import { ArrowRight, FileText, Lock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getDashboardData } from "@/app/actions"
import { useLanguage } from "@/contexts/LanguageContext"
import { ProfileCompletionModal } from "@/components/profile-completion-modal"

interface RegistrationStep {
  id: number
  name: string
  status: string
  icon: string
  completedAt: string | null
  documents: Array<{
    name: string
    uploadedAt: string | null
    status: string
    url: string
  }>
  details: Record<string, any>
}

interface DashboardData {
  user: {
    id: string
    fullName: string
    businessName: string
    businessType: string
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
    otherProofUrl: string
    adCodeLetterFromBankUrl: string
    bankDocumentUrl: string
  }
  hasStartedRegistration: boolean
  profileCompletion: number
  registrationSteps: RegistrationStep[]
  overallProgress: number
  notifications: Array<{
    id: string
    title: string
    message: string
    type: string
    read: boolean
    createdAt: string
  }>
  unreadNotificationCount: number
  isProfileComplete: boolean
}

const getRegistrations = (t: (key: string) => string) => [
  {
    id: "gst",
    stepId: 2,
    title: t("gst_registration"),
    description: t("gst_description"),
    required: true,
    href: "/dashboard/registration/gst",
  },
  {
    id: "iec",
    stepId: 3,
    title: t("iec_registration"),
    description: t("iec_description"),
    required: true,
    href: "/dashboard/registration/iec",
  },
  {
    id: "dsc",
    stepId: 4,
    title: t("dsc_registration"),
    description: t("dsc_description"),
    required: true,
    href: "/dashboard/registration/dsc",
  },
  {
    id: "icegate",
    stepId: 5,
    title: t("icegate_registration"),
    description: t("icegate_description"),
    required: true,
    href: "/dashboard/registration/icegate",
  },
  {
    id: "adcode",
    stepId: 6,
    title: t("adcode_registration"),
    description: t("adcode_description"),
    required: true,
    href: "/dashboard/registration/adcode",
  },
]

export default function Registration() {
  const { t } = useLanguage()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [mounted, setMounted] = useState(false)

  const fetchDashboardData = async () => {
    try {
      const data = await getDashboardData()
      setDashboardData(data)
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
    fetchDashboardData()
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("registration_applications")}</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">{t("manage_track_applications")}</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-sm sm:text-base">{t("get_started")}</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 h-5 sm:h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-5 sm:h-6 w-16 sm:w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-8 sm:h-10 w-24 sm:w-32 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const getRegistrationStatus = (stepId: number) => {
    const step = dashboardData?.registrationSteps?.find((s) => s.id === stepId)
    let status = t("not_started")
    let statusText = t("not_started_text")
    let badgeVariant: "default" | "secondary" | "destructive" | "outline" | null | undefined = "secondary"
    let badgeColorClass = "bg-gray-100 text-gray-600"

    if (step) {
      switch (step.status) {
        case "in-progress": // Fixed: using hyphen instead of underscore
          status = t("in_progress")
          statusText = t("in_progress_text")
          badgeVariant = "default"
          badgeColorClass = "bg-blue-100 text-blue-700"
          break
        case "completed":
          status = t("completed")
          statusText = t("completed_text")
          badgeVariant = "default"
          badgeColorClass = "bg-green-100 text-green-700"
          break
        case "pending":
          status = t("pending_review")
          statusText = t("pending_review_text")
          badgeVariant = "default"
          badgeColorClass = "bg-yellow-100 text-yellow-700"
          break
        case "rejected":
          status = t("rejected")
          statusText = t("rejected_text")
          badgeVariant = "destructive"
          badgeColorClass = "bg-red-100 text-red-700"
          break
        case "pending":
        default:
          status = t("not_started")
          statusText = t("not_started_text")
          badgeVariant = "secondary"
          badgeColorClass = "bg-gray-100 text-gray-600"
          break
      }
    }
    return { status, statusText, badgeVariant, badgeColorClass }
  }

  const registrations = getRegistrations(t)

  if (loading) {
    return (
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("registration_applications")}</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">{t("manage_track_applications")}</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-sm sm:text-base">{t("get_started")}</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {registrations.map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 h-5 sm:h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-5 sm:h-6 w-16 sm:w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-8 sm:h-10 w-24 sm:w-32 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("registration_applications")}</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">{t("manage_track_applications")}</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-sm sm:text-base">{t("get_started")}</Button>
      </div>

      {/* Profile Completion Check */}
      {!dashboardData || dashboardData.profileCompletion < 100 ? (
        <>
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="flex-1 space-y-2 sm:space-y-3">
                  <h3 className="font-semibold text-orange-900 flex items-center gap-2 text-sm sm:text-base">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    Registration Services Locked
                  </h3>
                  <p className="text-orange-700 text-xs sm:text-sm">
                    Complete your profile to unlock all registration services. Your profile is currently {dashboardData?.profileCompletion || 0}% complete.
                  </p>
                  <div className="space-y-2">
                    <Progress value={dashboardData?.profileCompletion || 0} className="h-2" />
                    <Button 
                      onClick={() => setShowProfileModal(true)}
                      className="bg-orange-500 hover:bg-orange-600 text-xs sm:text-sm w-full sm:w-auto"
                    >
                      Complete Profile
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Show locked registration cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {registrations.map((registration) => (
              <Card key={registration.id} className="opacity-50 cursor-not-allowed">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base sm:text-lg text-gray-500">{registration.title}</CardTitle>
                      <CardDescription className="mt-1 text-xs sm:text-sm">{registration.description}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-500 text-xs sm:text-sm">
                      <Lock className="h-3 w-3 mr-1" />
                      Locked
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-xs sm:text-sm text-gray-500">Complete profile to access</span>
                    </div>
                    <Button variant="outline" size="sm" disabled className="flex items-center gap-2 text-xs sm:text-sm w-full sm:w-auto">
                      <Lock className="h-3 w-3" />
                      Locked
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900 text-sm sm:text-base">{t("required_registrations_title")}</h3>
                  <p className="text-green-700 text-xs sm:text-sm mt-1">
                    {t("required_registrations_description")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {registrations.map((registration) => {
          const { status, statusText, badgeVariant, badgeColorClass } = getRegistrationStatus(registration.stepId)
          return (
            <Card key={registration.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base sm:text-lg">{registration.title}</CardTitle>
                    <CardDescription className="mt-1 text-xs sm:text-sm">{registration.description}</CardDescription>
                  </div>
                  <Badge variant={badgeVariant} className={`${badgeColorClass} text-xs sm:text-sm`}>
                    {status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-xs sm:text-sm text-gray-600">{statusText}</span>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent text-xs sm:text-sm w-full sm:w-auto" asChild>
                    <Link href={registration.href}>
                      {status === t("completed")
                        ? t("view_application")
                        : status === t("in_progress")
                          ? t("view_application")
                          : t("start_application")}
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
        </>
      )}
      
      <ProfileCompletionModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onUpdate={fetchDashboardData}
      />
    </div>
  )
}
