"use client"

import { useState, useEffect, useCallback } from "react"
import type React from "react"
import {
  ArrowLeft,
  Check,
  Upload,
  FileText,
  User,
  Building,
  MapPin,
  CreditCard,
  Clock,
  Eye,
  XCircle,
  Award,
  Shield,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { getDashboardData, submitRegistrationApplication, resubmitRegistrationApplication } from "@/app/actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/LanguageContext"

interface DocumentUploadState {
  name: string
  file: File | null
  uploaded: boolean
  url?: string
  status?: "pending" | "uploaded" | "verified" | "rejected"
  tempFile?: File | null
  tempUrl?: string
}

interface BankDetails {
  accountNumber: string
  bankName: string
  branchName: string
  ifscCode: string
  cancelledCheque: File | null
  cancelledChequeUrl?: string
  cancelledChequeStatus?: "pending" | "uploaded" | "verified" | "rejected"
  tempCancelledCheque?: File | null
  tempCancelledChequeUrl?: string
}

interface ProfileData {
  id: string
  dashboardId: string
  fullName: string
  email: string
  mobile: string
  businessType: string
  businessName: string
  panCardUrl: string
  aadharCardUrl: string
  photographUrl: string
  proofOfAddressUrl: string
  authorizationLetterUrl: string
  partnershipDeedUrl: string
  llpAgreementUrl: string
  certificateOfIncorporationUrl: string
  moaAoaUrl: string
  cancelledChequeUrl: string
  iecCertificate: string
  gstCertificate: string
  rentAgreementUrl: string
  electricityBillUrl: string
  nocUrl: string
  propertyProofUrl: string
  electricityBillOwnedUrl: string
  otherProofUrl: string
  dscCertificate: string
  adCodeLetterFromBankUrl: string
  bankDocumentUrl: string
}

// Helper component for document upload sections
const DocumentUploadSection = ({
  docType,
  label,
  description,
  required,
  currentDocState,
  onFileSelect,
  colorClass = "purple",
  registrationStatus,
  t,
}: {
  docType: string
  label: string
  description: string
  required: boolean
  currentDocState: DocumentUploadState
  onFileSelect: (file: File | null) => void
  colorClass?: "purple" | "orange" | "indigo" | "emerald" | "teal" | "blue"
  registrationStatus?: string
  t: (key: string) => string
}) => {
  const fileInputId = docType
  const displayUrl = currentDocState.tempUrl || currentDocState.url
  const hasTempFile = currentDocState.tempFile

  const getStatusDisplay = (status?: string, hasTemp?: boolean) => {
    if (status === "rejected") {
      return (
        <div className="flex items-center gap-1 text-red-600 text-xs">
          <XCircle className="h-3 w-3" />
          <span>{t("rejected_reupload_required")}</span>
        </div>
      )
    } else if (hasTemp) {
      return (
        <div className="flex items-center gap-1 text-amber-600 text-xs">
          <Clock className="h-3 w-3" />
          <span>{t("ready_for_upload")}</span>
        </div>
      )
    } else if (status === "uploaded" || status === "verified") {
      return (
        <div className="flex items-center gap-1 text-green-600 text-xs">
          <Check className="h-3 w-3" />
          <span>{t("uploaded_pending_verification")}</span>
        </div>
      )
    } else {
      return (
        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <Clock className="h-3 w-3" />
          <span>{t("not_uploaded")}</span>
        </div>
      )
    }
  }

  const handleContainerClick = () => {
    document.getElementById(fileInputId)?.click()
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    document.getElementById(fileInputId)?.click()
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={fileInputId}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div
        className={`border-2 border-dashed border-${colorClass}-300 rounded-lg p-4 text-center hover:border-${colorClass}-400 transition-colors cursor-pointer`}
        onClick={handleContainerClick}
      >
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
          className="hidden"
          id={fileInputId}
          disabled={!!currentDocState.url && currentDocState.status !== "rejected" && !hasTempFile}
        />
        {displayUrl ? (
          <div className="flex flex-col items-center justify-center gap-2">
            {getStatusDisplay(currentDocState.status, hasTempFile)}
            {currentDocState.url && !hasTempFile && currentDocState.status !== "rejected" && (
              <div className="flex items-center gap-1 text-blue-600 text-xs">
                <Check className="h-3 w-3" />
                <span>{t("shared_from_previous_registration")}</span>
              </div>
            )}
            {displayUrl && (
              <Button
                variant="link"
                className="p-0 h-auto text-primary text-xs"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(displayUrl, "_blank")
                }}
              >
                <Eye className="h-3 w-3 mr-1" /> {t("view")}
              </Button>
            )}
            {(registrationStatus === "pending" ||
              registrationStatus === "rejected" ||
              currentDocState.status === "rejected" ||
              hasTempFile ||
              !currentDocState.url) && (
              <Button
                variant="link"
                className={`p-0 h-auto text-${colorClass}-600 text-xs mt-1`}
                onClick={handleButtonClick}
              >
                <Upload className="h-3 w-3 mr-1" />
                {registrationStatus === "pending" ||
                registrationStatus === "rejected" ||
                currentDocState.status === "rejected"
                  ? t("reupload")
                  : t("change_reupload")}
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className={`h-8 w-8 text-${colorClass}-400 mx-auto`} />
            <div className="text-sm text-gray-600">
              <span className={`text-${colorClass}-600`}>{t("click_to_upload")}</span>
            </div>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ICEGATERegistration() {
  const { t } = useLanguage()
  const [profileData, setProfileData] = useState<ProfileData>({
    id: "",
    dashboardId: "",
    fullName: "",
    email: "",
    mobile: "",
    businessType: "",
    businessName: "",
    panCardUrl: "",
    aadharCardUrl: "",
    photographUrl: "",
    proofOfAddressUrl: "",
    authorizationLetterUrl: "",
    partnershipDeedUrl: "",
    llpAgreementUrl: "",
    certificateOfIncorporationUrl: "",
    moaAoaUrl: "",
    cancelledChequeUrl: "",
    iecCertificate: "",
    gstCertificate: "",
    rentAgreementUrl: "",
    electricityBillUrl: "",
    nocUrl: "",
    propertyProofUrl: "",
    electricityBillOwnedUrl: "",
    otherProofUrl: "",
    dscCertificate: "",
    adCodeLetterFromBankUrl: "",
    bankDocumentUrl: "",
  })
  const [businessDetails, setBusinessDetails] = useState({
    iecNumber: "",
    gstinNumber: "",
    dscNumber: "",
  })
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountNumber: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
    cancelledCheque: null,
    cancelledChequeUrl: "",
    cancelledChequeStatus: "pending",
    tempCancelledCheque: null,
    tempCancelledChequeUrl: undefined,
  })
  const [documents, setDocuments] = useState<Record<string, DocumentUploadState>>({})
  const [registrationStatus, setRegistrationStatus] = useState<string>("")
  const router = useRouter()
  const { toast } = useToast()

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getDashboardData()
        setProfileData({
          id: data.user.id,
          dashboardId: data.dashboard._id,
          fullName: data.user.fullName,
          email: data.user.email,
          mobile: data.user.mobileNo,
          businessType: data.user.businessType,
          businessName: data.user.businessName,
          panCardUrl: data.user.panCardUrl,
          aadharCardUrl: data.user.aadharCardUrl,
          photographUrl: data.user.photographUrl,
          proofOfAddressUrl: data.user.proofOfAddressUrl,
          authorizationLetterUrl: data.user.authorizationLetterUrl || "",
          partnershipDeedUrl: data.user.partnershipDeedUrl || "",
          llpAgreementUrl: data.user.llpAgreementUrl || "",
          certificateOfIncorporationUrl: data.user.certificateOfIncorporationUrl || "",
          moaAoaUrl: data.user.moaAoaUrl || "",
          cancelledChequeUrl: data.user.cancelledChequeUrl || "",
          iecCertificate: data.user.iecCertificate || "",
          gstCertificate: data.user.gstCertificate || "",
          rentAgreementUrl: data.user.rentAgreementUrl || "",
          electricityBillUrl: data.user.electricityBillUrl || "",
          nocUrl: data.user.nocUrl || "",
          propertyProofUrl: data.user.propertyProofUrl || "",
          electricityBillOwnedUrl: data.user.electricityBillOwnedUrl || "",
          otherProofUrl: data.user.otherProofUrl || "",
          dscCertificate: data.user.dscCertificate || "",
          adCodeLetterFromBankUrl: data.user.adCodeLetterFromBankUrl || "",
          bankDocumentUrl: data.user.bankDocumentUrl || "",
        })

        const icegateStep = data.registrationSteps.find((step) => step.id === 5)
        const icegateStepDocuments = icegateStep?.documents || []
        const icegateStepDetails = icegateStep?.details || {}
        setRegistrationStatus(icegateStep?.status || "")

        setBusinessDetails({
          iecNumber: icegateStepDetails.iecNumber || "",
          gstinNumber: icegateStepDetails.gstinNumber || "",
          dscNumber: icegateStepDetails.dscNumber || "",
        })
        setBankDetails((prev) => ({
          ...prev,
          accountNumber: icegateStepDetails.accountNumber || "",
          bankName: icegateStepDetails.bankName || "",
          branchName: icegateStepDetails.branchName || "",
          ifscCode: icegateStepDetails.ifscCode || "",
        }))

        const newDocumentsState: Record<string, DocumentUploadState> = {}
        const newBankDetailsState: BankDetails = { ...bankDetails }

        const getDocState = (docName: string, profileUrl: string | undefined) => {
          const dashboardDoc = icegateStepDocuments.find((d) => d.name === docName)
          const finalUrl = profileUrl || dashboardDoc?.url
          const finalStatus = profileUrl ? "uploaded" : dashboardDoc?.status
          return {
            name: docName,
            file: finalUrl ? ({} as File) : null,
            uploaded: !!finalUrl,
            url: finalUrl,
            status: finalStatus || "pending",
            tempFile: null,
            tempUrl: null,
          }
        }

        newDocumentsState.iecCertificate = getDocState("iecCertificate", data.user.iecCertificate)
        newDocumentsState.gstCertificate = getDocState("gstCertificate", data.user.gstCertificate)
        newDocumentsState.dscCertificate = getDocState("dscCertificate", data.user.dscCertificate)
        newDocumentsState.bankDocument = getDocState("bankDocument", data.user.bankDocumentUrl)
        newDocumentsState.authorizationLetter = getDocState("authorizationLetter", data.user.authorizationLetterUrl)

        newBankDetailsState.cancelledChequeUrl =
          data.user.cancelledChequeUrl || icegateStepDocuments.find((d) => d.name === "cancelledCheque")?.url
        newBankDetailsState.cancelledCheque = newBankDetailsState.cancelledChequeUrl ? ({} as File) : null
        newBankDetailsState.cancelledChequeStatus =
          (data.user.cancelledChequeUrl
            ? "uploaded"
            : icegateStepDocuments.find((d) => d.name === "cancelledCheque")?.status) || "pending"
        newBankDetailsState.tempCancelledCheque = null
        newBankDetailsState.tempCancelledChequeUrl = null

        setDocuments(newDocumentsState)
        setBankDetails(newBankDetailsState)
      } catch (error) {
        console.error("Failed to fetch profile data:", error)
      }
    }
    fetchProfileData()
  }, [])

  // Cleanup for temporary URLs
  useEffect(() => {
    return () => {
      Object.values(documents).forEach((doc) => {
        if (doc.tempUrl) URL.revokeObjectURL(doc.tempUrl)
      })
      if (bankDetails.tempCancelledChequeUrl) URL.revokeObjectURL(bankDetails.tempCancelledChequeUrl)
    }
  }, [documents, bankDetails.tempCancelledChequeUrl])

  const getBusinessTypeKey = (businessType: string) => {
    switch (businessType) {
      case "Proprietorship":
        return "individual"
      case "Partnership":
        return "partnership"
      case "LLP":
        return "llp"
      case "PVT LTD":
        return "pvt_ltd"
      default:
        return "individual"
    }
  }

  const isDocumentRequired = (docType: string) => {
    const businessTypeKey = getBusinessTypeKey(profileData.businessType)

    switch (docType) {
      case "panCard":
      case "proofOfAddress":
      case "photograph":
      case "aadhaarCard":
        return true
      case "authorizationLetter":
        return businessTypeKey !== "individual"
      case "iecCertificate":
      case "gstCertificate":
      case "dscCertificate":
      case "bankDocument":
        return true
      default:
        return false
    }
  }

  const calculateProgress = useCallback(() => {
    let completed = 0
    let total = 10

    if (profileData.panCardUrl) completed++
    if (profileData.aadharCardUrl) completed++
    if (profileData.photographUrl) completed++
    if (profileData.proofOfAddressUrl) completed++
    if (profileData.email.trim()) completed++
    if (profileData.mobile.trim()) completed++

    if (businessDetails.iecNumber.trim()) completed++
    if (businessDetails.gstinNumber.trim()) completed++
    if (businessDetails.dscNumber.trim()) completed++

    if (
      (documents.iecCertificate?.url || documents.iecCertificate?.tempFile || profileData.iecCertificate) &&
      documents.iecCertificate?.status !== "rejected"
    )
      completed++
    if (
      (documents.gstCertificate?.url || documents.gstCertificate?.tempFile || profileData.gstCertificate) &&
      documents.gstCertificate?.status !== "rejected"
    )
      completed++
    if (
      (documents.dscCertificate?.url || documents.dscCertificate?.tempFile || profileData.dscCertificate) &&
      documents.dscCertificate?.status !== "rejected"
    )
      completed++
    if (
      (documents.bankDocument?.url || documents.bankDocument?.tempFile) &&
      documents.bankDocument?.status !== "rejected"
    )
      completed++

    if (isDocumentRequired("authorizationLetter")) {
      total++
      if (
        (documents.authorizationLetter?.url ||
          documents.authorizationLetter?.tempFile ||
          profileData.authorizationLetterUrl) &&
        documents.authorizationLetter?.status !== "rejected"
      )
        completed++
    }

    return Math.round((completed / total) * 100)
  }, [profileData, businessDetails, documents])

  const handleDocumentSelect = (docType: string, file: File | null) => {
    if (!file) return

    if (file.size > 1024 * 1024) {
      toast({
        variant: "destructive",
        title: `❌ ${t("file_size_exceeded")}`,
        description: `${t("file_size_is")} ${(file.size / (1024 * 1024)).toFixed(2)}MB. ${t("file_upload_failed")}`,
      })
      return
    }

    if (documents[docType]?.tempUrl) {
      URL.revokeObjectURL(documents[docType].tempUrl!)
    }

    setDocuments((prev) => ({
      ...prev,
      [docType]: {
        ...prev[docType],
        name: file.name,
        tempFile: file,
        tempUrl: URL.createObjectURL(file),
        uploaded: false,
        status: "pending",
      },
    }))
  }

  const handleBankDocumentSelect = (file: File | null) => {
    if (!file) return

    if (file.size > 1024 * 1024) {
      toast({
        variant: "destructive",
        title: `❌ ${t("file_size_exceeded")}`,
        description: `${t("file_size_is")} ${(file.size / (1024 * 1024)).toFixed(2)}MB. ${t("file_upload_failed")}`,
      })
      return
    }

    if (bankDetails.tempCancelledChequeUrl) {
      URL.revokeObjectURL(bankDetails.tempCancelledChequeUrl)
    }

    setBankDetails((prev) => ({
      ...prev,
      cancelledCheque: file,
      tempCancelledCheque: file,
      tempCancelledChequeUrl: URL.createObjectURL(file),
      cancelledChequeStatus: "pending",
    }))
  }

  const handleSubmitApplication = async () => {
    if (progress < 100) {
      alert(t("complete_required_sections_icegate"))
      return
    }

    const detailsToSave = {
      iecNumber: businessDetails.iecNumber,
      gstinNumber: businessDetails.gstinNumber,
      dscNumber: businessDetails.dscNumber,
      accountNumber: bankDetails.accountNumber,
      bankName: bankDetails.bankName,
      branchName: bankDetails.branchName,
      ifscCode: bankDetails.ifscCode,
    }

    const filesToUpload: { docType: string; file: File }[] = []

    for (const key in documents) {
      const doc = documents[key]
      if (doc.tempFile && (!doc.url || doc.status === "rejected")) {
        filesToUpload.push({ docType: key, file: doc.tempFile })
      }
    }

    if (
      bankDetails.tempCancelledCheque &&
      (!bankDetails.cancelledChequeUrl || bankDetails.cancelledChequeStatus === "rejected")
    ) {
      filesToUpload.push({ docType: "cancelledCheque", file: bankDetails.tempCancelledCheque })
    }

    const currentRegistrationStatus = profileData.registrationSteps?.find((step) => step.stepId === 5)?.status
    const isResubmission = currentRegistrationStatus === "rejected"

    const result = isResubmission
      ? await resubmitRegistrationApplication({
          stepId: 5,
          details: detailsToSave,
          filesToUpload: filesToUpload,
          userId: profileData.id,
          dashboardId: profileData.dashboardId,
          registrationType: "ICEGATE Registration",
          registrationName: profileData.businessName || profileData.fullName,
        })
      : await submitRegistrationApplication({
          stepId: 5,
          details: detailsToSave,
          filesToUpload: filesToUpload,
          userId: profileData.id,
          dashboardId: profileData.dashboardId,
          registrationType: "ICEGATE Registration",
          registrationName: profileData.businessName || profileData.fullName,
        })

    if (result.success) {
      alert(result.message)
      router.push("/dashboard/progress")
    } else {
      alert(`${t("submit")}: ${result.message}`)
    }
  }

  const progress = calculateProgress()

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Link href="/dashboard/registration">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("icegate_registration_title")}</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">{t("icegate_registration_description")}</p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4">
            <h3 className="font-semibold text-blue-900 text-sm sm:text-base">{t("registration_progress")}</h3>
            <span className="text-blue-600 font-bold text-lg sm:text-xl">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 sm:h-3" />
          <p className="text-blue-700 text-xs sm:text-sm mt-2">{t("complete_required_sections_icegate")}</p>
        </CardContent>
      </Card>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600" />
            {t("business_information")}
          </CardTitle>
          <CardDescription>{t("information_fetched_from_profile")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label>{t("business_type")}</Label>
                <Input value={profileData.businessType} disabled className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>{t("business_name")}</Label>
                <Input value={profileData.businessName} disabled className="bg-gray-50" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificates from Other Registrations */}
      {(profileData.gstCertificate || profileData.iecCertificate || profileData.dscCertificate) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-600" />
              {t("available_certificates_from_other_registrations")}
            </CardTitle>
            <CardDescription>{t("certificates_from_other_registrations_description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-emerald-50 p-3 sm:p-4 rounded-lg border border-emerald-200">
              <h4 className="font-medium text-emerald-900 mb-3 text-sm sm:text-base">{t("available_certificates")}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {profileData.gstCertificate && (
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border">
                    <Award className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    <div className="flex-1">
                      <div className="text-xs sm:text-sm font-medium">{t("gst_certificate")}</div>
                      <div className="flex items-center gap-1 text-green-600 text-xs">
                        <Check className="h-3 w-3" />
                        <span>{t("from_gst_registration")}</span>
                      </div>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary text-xs mt-1"
                        onClick={() => window.open(profileData.gstCertificate, "_blank")}
                      >
                        <Eye className="h-3 w-3 mr-1" /> {t("view")}
                      </Button>
                    </div>
                  </div>
                )}

                {profileData.iecCertificate && (
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border">
                    <Award className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                    <div className="flex-1">
                      <div className="text-xs sm:text-sm font-medium">{t("iec_certificate")}</div>
                      <div className="flex items-center gap-1 text-purple-600 text-xs">
                        <Check className="h-3 w-3" />
                        <span>{t("from_iec_registration")}</span>
                      </div>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary text-xs mt-1"
                        onClick={() => window.open(profileData.iecCertificate, "_blank")}
                      >
                        <Eye className="h-3 w-3 mr-1" /> {t("view")}
                      </Button>
                    </div>
                  </div>
                )}

                {profileData.dscCertificate && (
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border">
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600" />
                    <div className="flex-1">
                      <div className="text-xs sm:text-sm font-medium">{t("dsc_certificate")}</div>
                      <div className="flex items-center gap-1 text-indigo-600 text-xs">
                        <Check className="h-3 w-3" />
                        <span>{t("from_dsc_registration")}</span>
                      </div>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary text-xs mt-1"
                        onClick={() => window.open(profileData.dscCertificate, "_blank")}
                      >
                        <Eye className="h-3 w-3 mr-1" /> {t("view")}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Basic Details Required */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-600" />
            {t("basic_details_required")} <span className="text-red-500">*</span>
          </CardTitle>
          <CardDescription>{t("information_fetched_from_profile")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900 mb-3 text-sm sm:text-base">{t("auto_filled_from_profile")}</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label>
                  {t("full_name")} <span className="text-red-500">*</span>
                </Label>
                <Input value={profileData.fullName} disabled className="bg-gray-50" />
                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <Check className="h-3 w-3" />
                  <span>{t("fetched_from_profile")}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>
                  {t("mobile_number")} <span className="text-red-500">*</span>
                </Label>
                <Input value={profileData.mobile} disabled className="bg-gray-50" />
                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <Check className="h-3 w-3" />
                  <span>{t("fetched_from_profile")}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>
                  {t("email_address")} <span className="text-red-500">*</span>
                </Label>
                <Input value={profileData.email} disabled className="bg-gray-50" />
                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <Check className="h-3 w-3" />
                  <span>{t("fetched_from_profile")}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4">
              {[
                { key: "panCardUrl", label: t("pan_card"), icon: FileText, completed: !!profileData.panCardUrl },
                {
                  key: "aadharCardUrl",
                  label: t("aadhaar_card"),
                  icon: FileText,
                  completed: !!profileData.aadharCardUrl,
                },
                { key: "photographUrl", label: t("photograph"), icon: User, completed: !!profileData.photographUrl },
                {
                  key: "proofOfAddressUrl",
                  label: t("proof_of_address"),
                  icon: MapPin,
                  completed: !!profileData.proofOfAddressUrl,
                },
              ].map((doc) => (
                <div key={doc.key} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border">
                  <doc.icon className={`h-3 w-3 sm:h-4 sm:w-4 ${doc.completed ? "text-green-600" : "text-gray-400"}`} />
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm font-medium">
                      {doc.label} <span className="text-red-500">*</span>
                    </div>
                    <div
                      className={`flex items-center gap-1 text-xs ${doc.completed ? "text-green-600" : "text-gray-500"}`}
                    >
                      {doc.completed ? <Check className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      <span>{doc.completed ? t("uploaded_in_profile") : t("pending_in_profile")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-purple-600" />
            {t("business_details")} <span className="text-red-500">*</span>
          </CardTitle>
          <CardDescription>{t("provide_business_information_icegate")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="iecNumber">
              {t("iec_number")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="iecNumber"
              placeholder={t("enter_iec_number")}
              value={businessDetails.iecNumber}
              onChange={(e) => setBusinessDetails((prev) => ({ ...prev, iecNumber: e.target.value }))}
              maxLength={10}
            />
            <p className="text-xs text-gray-500">{t("your_import_export_code")}</p>
          </div>

          <DocumentUploadSection
            docType="iecCertificate"
            label={t("iec_certificate")}
            description={t("upload_iec_certificate")}
            required={true}
            currentDocState={documents.iecCertificate || { name: "", file: null, uploaded: false }}
            onFileSelect={(file) => handleDocumentSelect("iecCertificate", file)}
            colorClass="purple"
            registrationStatus={registrationStatus}
            t={t}
          />

          <div className="space-y-2">
            <Label htmlFor="gstinNumber">
              {t("gstin_number")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="gstinNumber"
              placeholder={t("enter_gstin_number")}
              value={businessDetails.gstinNumber}
              onChange={(e) => setBusinessDetails((prev) => ({ ...prev, gstinNumber: e.target.value }))}
              maxLength={15}
            />
            <p className="text-xs text-gray-500">{t("your_gstin_help")}</p>
          </div>

          <DocumentUploadSection
            docType="gstCertificate"
            label={t("gst_certificate")}
            description={t("upload_gst_certificate")}
            required={true}
            currentDocState={documents.gstCertificate || { name: "", file: null, uploaded: false }}
            onFileSelect={(file) => handleDocumentSelect("gstCertificate", file)}
            colorClass="teal"
            registrationStatus={registrationStatus}
            t={t}
          />

          <div className="space-y-2">
            <Label htmlFor="dscNumber">
              {t("dsc_number")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dscNumber"
              placeholder={t("enter_dsc_number")}
              value={businessDetails.dscNumber}
              onChange={(e) => setBusinessDetails((prev) => ({ ...prev, dscNumber: e.target.value }))}
            />
            <p className="text-xs text-gray-500">{t("your_dsc_number_help")}</p>
          </div>

          <DocumentUploadSection
            docType="dscCertificate"
            label={t("dsc_certificate")}
            description={t("upload_dsc_certificate")}
            required={true}
            currentDocState={documents.dscCertificate || { name: "", file: null, uploaded: false }}
            onFileSelect={(file) => handleDocumentSelect("dscCertificate", file)}
            colorClass="indigo"
            registrationStatus={registrationStatus}
            t={t}
          />

          <DocumentUploadSection
            docType="bankDocument"
            label={t("bank_document_cancelled_cheque")}
            description={t("bank_document_description")}
            required={true}
            currentDocState={documents.bankDocument || { name: "", file: null, uploaded: false }}
            onFileSelect={(file) => handleDocumentSelect("bankDocument", file)}
            colorClass="emerald"
            registrationStatus={registrationStatus}
            t={t}
          />
        </CardContent>
      </Card>

      {/* Conditional Documents Based on Business Type */}
      {isDocumentRequired("authorizationLetter") && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              {t("authorization_letter_board_resolution")} <span className="text-red-500">*</span>
            </CardTitle>
            <CardDescription>
              {t("required_for_organization_dsc")} {profileData.businessType}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DocumentUploadSection
              docType="authorizationLetter"
              label={t("authorization_letter_board_resolution")}
              description={t("authorization_letter_icegate_description")}
              required={true}
              currentDocState={documents.authorizationLetter || { name: "", file: null, uploaded: false }}
              onFileSelect={(file) => handleDocumentSelect("authorizationLetter", file)}
              colorClass="orange"
              registrationStatus={registrationStatus}
              t={t}
            />
          </CardContent>
        </Card>
      )}

      {/* Bank Details (Optional) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-slate-600" />
            {t("bank_details_optional")}
          </CardTitle>
          <CardDescription>{t("bank_details_description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-medium text-slate-900 flex items-center gap-2">
              <Building className="h-4 w-4" />
              {t("bank_details_include")}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountNumber">{t("bank_account_number")}</Label>
                <Input
                  id="accountNumber"
                  placeholder={t("enter_account_number")}
                  value={bankDetails.accountNumber}
                  onChange={(e) => setBankDetails((prev) => ({ ...prev, accountNumber: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ifscCode">{t("ifsc_code")}</Label>
                <Input
                  id="ifscCode"
                  placeholder={t("enter_ifsc_code")}
                  value={bankDetails.ifscCode}
                  onChange={(e) => setBankDetails((prev) => ({ ...prev, ifscCode: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankName">{t("bank_name")}</Label>
                <Input
                  id="bankName"
                  placeholder={t("enter_bank_name")}
                  value={bankDetails.bankName}
                  onChange={(e) => setBankDetails((prev) => ({ ...prev, bankName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branchName">{t("branch_name")}</Label>
                <Input
                  id="branchName"
                  placeholder={t("enter_branch_name")}
                  value={bankDetails.branchName}
                  onChange={(e) => setBankDetails((prev) => ({ ...prev, branchName: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("cancelled_cheque_bank_statement")}</Label>
              <p className="text-sm text-gray-600 mb-2">{t("cancelled_cheque_description")}</p>
              <div
                className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors cursor-pointer"
                onClick={() => document.getElementById("bankCancelledCheque")?.click()}
              >
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleBankDocumentSelect(e.target.files?.[0] || null)}
                  className="hidden"
                  id="bankCancelledCheque"
                />
                {bankDetails.tempCancelledChequeUrl || bankDetails.cancelledChequeUrl ? (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex items-center gap-1 text-green-600 text-xs">
                      <Check className="h-3 w-3" />
                      <span>{t("document_selected")}</span>
                    </div>
                    {(bankDetails.tempCancelledChequeUrl || bankDetails.cancelledChequeUrl) && (
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary text-xs"
                        onClick={(e) => {
                          e.stopPropagation()
                          const url = bankDetails.tempCancelledChequeUrl || bankDetails.cancelledChequeUrl
                          if (url) window.open(url, "_blank")
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" /> {t("view")}
                      </Button>
                    )}
                    <Button
                      variant="link"
                      className="p-0 h-auto text-slate-600 text-xs mt-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        document.getElementById("bankCancelledCheque")?.click()
                      }}
                    >
                      <Upload className="h-3 w-3 mr-1" /> {t("change_reupload")}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto" />
                    <div className="text-sm text-gray-600">
                      <span className="text-slate-600">{t("click_to_upload")}</span>
                    </div>
                    <p className="text-xs text-gray-400">{t("supported_formats")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ICEGATE Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-emerald-600" />
            {t("icegate_information")}
          </CardTitle>
          <CardDescription>{t("important_information_dsc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-emerald-50 p-3 sm:p-4 rounded-lg border border-emerald-200">
            <h4 className="font-medium text-emerald-900 mb-3 text-sm sm:text-base">{t("what_is_icegate")}</h4>
            <ul className="text-emerald-800 text-xs sm:text-sm space-y-2">
              <li>{t("icegate_definition_1")}</li>
              <li>{t("icegate_definition_2")}</li>
              <li>{t("icegate_definition_3")}</li>
              <li>{t("icegate_definition_4")}</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-3 text-sm sm:text-base">{t("benefits_of_icegate")}</h4>
            <ul className="text-blue-800 text-xs sm:text-sm space-y-2">
              <li>{t("icegate_benefit_1")}</li>
              <li>{t("icegate_benefit_2")}</li>
              <li>{t("icegate_benefit_3")}</li>
              <li>{t("icegate_benefit_4")}</li>
              <li>{t("icegate_benefit_5")}</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-6 border-t">
        {registrationStatus === "in-progress" ? (
          <Card className="w-full bg-amber-50 border-amber-200 text-amber-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-900 flex items-center gap-2 text-sm sm:text-base">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                {t("application_submitted")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm">{t("icegate_application_submitted_processing")}</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/dashboard/registration">{t("save_continue_later")}</Link>
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              onClick={handleSubmitApplication}
              disabled={progress < 100}
            >
              {t("submit_icegate_application").replace("{{progress}}", progress.toString())}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
