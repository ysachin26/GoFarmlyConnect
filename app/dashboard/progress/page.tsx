"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { getDashboardData, updateRegistrationStep } from "@/app/actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Globe,
  Key,
  Truck,
  Code,
  UserPlus,
  Bell,
  Mail,
  Upload,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { format } from "date-fns"
import { useLanguage } from "@/contexts/LanguageContext" // Import useLanguage

// Map icon names to Lucide React components
const iconMap: { [key: string]: React.ElementType } = {
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Globe,
  Key,
  Truck,
  Code,
  UserPlus,
  Bell,
  Mail,
  Upload,
}

interface RegistrationStep {
  id: number
  name: string
  status: "pending" | "in-progress" | "completed" | "rejected"
  icon: string
  completedAt?: string | null
}

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
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
  notifications: Notification[]
  unreadNotificationCount: number
  isProfileComplete: boolean
}

export default function ProgressPage() {
  const { t } = useLanguage() // Initialize useLanguage hook
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboardData()
        if (data) {
          setDashboardData(data as DashboardData)
        } else {
          setError(t("failed_to_fetch_dashboard_data"))
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError(t("error_fetching_data"))
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [])

  const handleUpdateStepStatus = async (stepId: number, status: string) => {
    setLoading(true)
    try {
      const result = await updateRegistrationStep(stepId, status)
      if (result.success) {
        const updatedData = await getDashboardData() // Re-fetch to get latest state
        if (updatedData) {
          setDashboardData(updatedData as DashboardData)
        }
      } else {
        setError(result.message || t("something_went_wrong"))
      }
    } catch (err: any) {
      setError(t("failed_to_update_step", { message: err.message }))
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4">
        <p className="text-sm sm:text-base">{t("loading_progress")}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4">
        <p className="text-red-500 text-sm sm:text-base">{error}</p>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[calc(10vh-100px)] p-4">
        <p className="text-sm sm:text-base">{t("no_dashboard_data_available")}</p>
      </div>
    )
  }

  const { registrationSteps, overallProgress, notifications } = dashboardData

  const nextPendingStep = registrationSteps.find((step) => step.status === "pending" || step.status === "in-progress")

  // Define the mapping from step name to route
  const stepRoutes: { [key: string]: string } = {
    Registration: "/dashboard/profile", // Assuming registration is tied to profile completion
    "GST Registration": "/dashboard/registration/gst",
    "IEC Code": "/dashboard/registration/iec",
    "DSC Registration": "/dashboard/registration/dsc",
    "ICEGATE Registration": "/dashboard/registration/icegate",
    "AD Code": "/dashboard/registration/adcode",
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t("registration_progress")}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">{t("complete_all_steps_export_ready")}</p>

      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg md:text-xl">{t("overall_progress")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 sm:gap-4">
            <Progress value={overallProgress} className="flex-1" />
            <span className="text-base sm:text-lg font-semibold">{overallProgress}%</span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="journey" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-4 sm:mb-6">
          <TabsTrigger value="journey" className="text-xs sm:text-sm">{t("registration_journey")}</TabsTrigger>
          <TabsTrigger value="timeline" className="text-xs sm:text-sm">{t("timeline")}</TabsTrigger>
          <TabsTrigger value="next-steps" className="text-xs sm:text-sm">{t("next_steps")}</TabsTrigger>
        </TabsList>
        <TabsContent value="journey" className="mt-4 sm:mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg md:text-xl">{t("your_registration_journey")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
                {registrationSteps.map((step) => {
                  const IconComponent = iconMap[step.icon] || AlertCircle
                  const isCompleted = step.status === "completed"
                  const isInProgress = step.status === "in-progress"
                  const isPending = step.status === "pending"
                  const isRejected = step.status === "rejected"

                  return (
                    <div key={step.id}>
                      {isRejected ? (
                        <Link href={stepRoutes[step.name] || "#"}>
                          <div
                            className={cn(
                              "flex flex-col items-center p-3 sm:p-4 rounded-lg border transition-all duration-200 cursor-pointer",
                              "border-red-500 bg-red-50 dark:bg-red-950 dark:border-red-700",
                            )}
                          >
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-300">
                              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                            </div>
                            <p className="font-medium text-center text-xs sm:text-sm md:text-base">{step.name}</p>
                            <p className="text-xs text-red-600 dark:text-red-300">{t("rejected_click_to_reupload")}</p>
                          </div>
                        </Link>
                      ) : (
                        <Link href={stepRoutes[step.name] || "#"}>
                          <div
                            className={cn(
                              "flex flex-col items-center p-3 sm:p-4 rounded-lg border transition-all duration-200",
                              isCompleted && "border-green-500 bg-green-50",
                              isInProgress && "border-blue-500 bg-blue-50",
                              isPending && "border-gray-200 bg-gray-50 hover:border-gray-300",
                              "dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600",
                              isCompleted && "dark:bg-green-950 dark:border-green-700",
                              isInProgress && "dark:bg-blue-950 dark:border-blue-700",
                            )}
                          >
                            <div
                              className={cn(
                                "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2",
                                isCompleted && "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300",
                                isInProgress && "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300",
                                isPending && "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
                              )}
                            >
                              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                            </div>
                            <p className="font-medium text-center text-xs sm:text-sm md:text-base">{step.name}</p>
                            <p
                              className={cn(
                                "text-xs sm:text-sm",
                                isCompleted && "text-green-600 dark:text-green-300",
                                isInProgress && "text-blue-600 dark:text-blue-300",
                                isPending && "text-gray-500 dark:text-gray-400",
                              )}
                            >
                              {t(step.status)}
                            </p>
                          </div>
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="timeline" className="mt-4 sm:mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg md:text-xl">{t("activity_timeline")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 sm:pl-8">
                {registrationSteps
                  .filter((step) => step.completedAt)
                  .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
                  .map((step, index) => (
                    <div key={step.id} className="mb-4 sm:mb-6 flex items-start">
                      <div className="absolute left-0 flex h-full flex-col items-center">
                        <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-green-500 text-white">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                        </div>
                        {index < registrationSteps.filter((s) => s.completedAt).length - 1 && (
                          <div className="h-full w-px bg-gray-200 dark:bg-gray-700" />
                        )}
                      </div>
                      <div className="ml-3 sm:ml-4 flex-1">
                        <h3 className="font-semibold text-sm sm:text-base">
                          {step.name} {t("completed")}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {step.completedAt ? format(new Date(step.completedAt), "PPP") : t("n_a")}
                        </p>
                      </div>
                    </div>
                  ))}
                {notifications.length > 0 && (
                  <>
                    <Separator className="my-4" />
                    <h3 className="font-semibold mb-4 text-sm sm:text-base">{t("notifications")}</h3>
                    {notifications
                      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .map((notification) => {
                        const NotificationIcon =
                          iconMap[
                            notification.type === "success"
                              ? "CheckCircle"
                              : notification.type === "error"
                                ? "AlertCircle"
                                : "Bell"
                          ] || Bell
                        return (
                          <div key={notification.id} className="mb-4 flex items-start">
                            <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                              <NotificationIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                            </div>
                            <div className="ml-3 sm:ml-4 flex-1">
                              <h4 className="font-medium text-sm sm:text-base">{notification.title}</h4>
                              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{notification.message}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {format(new Date(notification.createdAt), "PPP p")}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                  </>
                )}
                {registrationSteps.filter((step) => step.completedAt).length === 0 && notifications.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">{t("no_activity_yet")}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="next-steps" className="mt-4 sm:mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg md:text-xl">{t("whats_next")}</CardTitle>
            </CardHeader>
            <CardContent>
              {nextPendingStep ? (
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-base sm:text-lg">
                    {t("your_next_step_is")} <span className="font-semibold">{nextPendingStep.name}</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    {t("continue_registration_journey_description", { stepName: nextPendingStep.name })}
                  </p>
                  <Link href={stepRoutes[nextPendingStep.name] || "#"}>
                    <Button className="mt-4 text-sm sm:text-base">{t("go_to_step_name", { stepName: nextPendingStep.name })}</Button>
                  </Link>
                  {/* Example of manually marking a step as complete for testing */}
                  {/* <Button
                    onClick={() => handleUpdateStepStatus(nextPendingStep.id, "completed")}
                    className="mt-4 ml-2"
                    variant="outline"
                  >
                    Mark as Completed (Dev Only)
                  </Button> */}
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-500 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{t("all_steps_completed")}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{t("congratulations_all_steps_completed")}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{t("export_ready_business_gofarmlyconnect")}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
