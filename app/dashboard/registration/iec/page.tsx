"use client"

import { useState, useEffect, useCallback } from "react"
import type React from "react"
import { useLanguage } from "@/contexts/LanguageContext"
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
import { getDashboardData, submitRegistrationApplication, resubmitRegistrationApplication } from "@/app/actions" // Import submitRegistrationApplication
import { useRouter } from "next/navigation" // Import useRouter
import { useToast } from "@/hooks/use-toast"

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
  id: string // Add user ID
  dashboardId: string // Add dashboard ID
  fullName: string
  email: string
  mobile: string
  businessType: string
  businessName: string
  panCardUrl: string
  aadharCardUrl: string
  photographUrl: string
  proofOfAddressUrl: string
  // ALL SHARED DOCUMENTS FROM ALL REGISTRATIONS
  authorizationLetterUrl: string
  partnershipDeedUrl: string
  llpAgreementUrl: string
  certificateOfIncorporationUrl: string
  moaAoaUrl: string
  cancelledChequeUrl: string
  // GST Registration Documents
  gstCertificate: string
  rentAgreementUrl: string
  electricityBillUrl: string
  nocUrl: string
  propertyProofUrl: string
  electricityBillOwnedUrl: string
  otherProofUrl: string
  // DSC Registration Documents
  dscCertificate: string
  // ICEGATE Registration Documents
  bankDocumentUrl: string
  // AD Code Registration Documents
  adCodeLetterFromBankUrl: string
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
    registrationStatus, // Add this prop
}: {
  docType: string
  label: string
  description: string
  required: boolean
  currentDocState: DocumentUploadState
  onFileSelect: (file: File | null) => void
  colorClass?: "purple" | "orange" | "indigo" | "emerald" | "teal" | "blue"
  registrationStatus?: string // Add this prop type
}) => {
  const fileInputId = docType
  const displayUrl = currentDocState.tempUrl || currentDocState.url
  const hasTempFile = currentDocState.tempFile

  const getStatusDisplay = (status?: string, hasTemp?: boolean) => {
    if (status === "rejected") {
      return (
        <div className="flex items-center gap-1 text-red-600 text-xs">
          <XCircle className="h-3 w-3" />
          <span>{t('rejected_reupload_required')}</span>
        </div>
      )
    } else if (hasTemp) {
      return (
        <div className="flex items-center gap-1 text-amber-600 text-xs">
          <Clock className="h-3 w-3" />
          <span>{t('ready_for_upload')}</span>
        </div>
      )
    } else if (status === "uploaded" || status === "verified") {
      return (
        <div className="flex items-center gap-1 text-green-600 text-xs">
          <Check className="h-3 w-3" />
          <span>{t('uploaded_pending_verification')}</span>
        </div>
      )
    } else {
      return (
        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <Clock className="h-3 w-3" />
          <span>{t('not_uploaded')}</span>
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
            {/* Add shared from previous registration message if applicable */}
            {currentDocState.url && !hasTempFile && currentDocState.status !== "rejected" && (
              <div className="flex items-center gap-1 text-blue-600 text-xs">
                <Check className="h-3 w-3" />
                <span>{t('shared_from_previous_registration')}</span>
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
                <Eye className="h-3 w-3 mr-1" /> {t('view')}
              </Button>
            )}
            {(registrationStatus === "pending" || registrationStatus === "rejected" || currentDocState.status === "rejected" || hasTempFile || !currentDocState.url) && (
              <Button
                variant="link"
                className={`p-0 h-auto text-${colorClass}-600 text-xs mt-1`}
                onClick={handleButtonClick}
              >
                <Upload className="h-3 w-3 mr-1" /> 
                {(registrationStatus === "pending" || registrationStatus === "rejected" || currentDocState.status === "rejected") ? t('re_upload') : t('change_re_upload')}
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className={`h-8 w-8 text-${colorClass}-400 mx-auto`} />
            <div className="text-sm text-gray-600">
              <span className={`text-${colorClass}-600`}>{t('click_to_upload')}</span>
            </div>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function IECRegistration() {
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
    gstCertificate: "",
    rentAgreementUrl: "",
    electricityBillUrl: "",
    nocUrl: "",
    propertyProofUrl: "",
    electricityBillOwnedUrl: "",
    otherProofUrl: "",
    dscCertificate: "",
    bankDocumentUrl: "",
    adCodeLetterFromBankUrl: "",
  })
  const [businessDetails, setBusinessDetails] = useState({
    businessAddress: "",
    natureOfBusiness: "",
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
  const [registrationStatus, setRegistrationStatus] = useState<string>("") // New state for registration status
  const router = useRouter() // Initialize useRouter
  const { toast } = useToast()

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getDashboardData()
        setProfileData({
          id: data.user.id, // Set user ID
          dashboardId: data.dashboard._id, // Set dashboard ID
          fullName: data.user.fullName,
          email: data.user.email,
          mobile: data.user.mobileNo,
          businessType: data.user.businessType,
          businessName: data.user.businessName,
          panCardUrl: data.user.panCardUrl,
          aadharCardUrl: data.user.aadharCardUrl,
          photographUrl: data.user.photographUrl,
          proofOfAddressUrl: data.user.proofOfAddressUrl,
          // 🔥 ALL SHARED DOCUMENTS FROM ALL REGISTRATIONS
          authorizationLetterUrl: data.user.authorizationLetterUrl || "",
          partnershipDeedUrl: data.user.partnershipDeedUrl || "",
          llpAgreementUrl: data.user.llpAgreementUrl || "",
          certificateOfIncorporationUrl: data.user.certificateOfIncorporationUrl || "",
          moaAoaUrl: data.user.moaAoaUrl || "",
          cancelledChequeUrl: data.user.cancelledChequeUrl || "",
          // GST Documents
          gstCertificate: data.user.gstCertificate || "",
          rentAgreementUrl: data.user.rentAgreementUrl || "",
          electricityBillUrl: data.user.electricityBillUrl || "",
          nocUrl: data.user.nocUrl || "",
          propertyProofUrl: data.user.propertyProofUrl || "",
          electricityBillOwnedUrl: data.user.electricityBillOwnedUrl || "",
          otherProofUrl: data.user.otherProofUrl || "",
          // DSC Documents
          dscCertificate: data.user.dscCertificate || "",
          // ICEGATE Documents
          bankDocumentUrl: data.user.bankDocumentUrl || "",
          // AD Code Documents
          adCodeLetterFromBankUrl: data.user.adCodeLetterFromBankUrl || "",
        })

        // Pre-fill registration-specific documents from dashboard data
        const iecStep = data.registrationSteps.find((step) => step.id === 3) // Corrected stepId for IEC
        const iecStepDocuments = iecStep?.documents || []
        const iecStepDetails = iecStep?.details || {} // Get stored details
        setRegistrationStatus(iecStep?.status || "") // Set registration status

        // Pre-fill text fields from dashboard details
        setBusinessDetails({
          businessAddress: iecStepDetails.businessAddress || "",
          natureOfBusiness: iecStepDetails.natureOfBusiness || "",
        })
        setBankDetails((prev) => ({
          ...prev,
          accountNumber: iecStepDetails.accountNumber || "",
          bankName: iecStepDetails.bankName || "",
          branchName: iecStepDetails.branchName || "",
          ifscCode: iecStepDetails.ifscCode || "",
        }))

        const newDocumentsState: Record<string, DocumentUploadState> = {}
        const newBankDetailsState: BankDetails = { ...bankDetails }

        // Helper to get document state, prioritizing profileData
        const getDocState = (docName: string, profileUrl: string | undefined) => {
          const dashboardDoc = iecStepDocuments.find((d) => d.name === docName)
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

        // Handle Authorization Letter (conditional, shared)
        newDocumentsState.authorizationLetter = getDocState("authorizationLetter", data.user.authorizationLetterUrl)

        // Handle Partnership Deed (conditional, shared)
        newDocumentsState.partnershipDeed = getDocState("partnershipDeed", data.user.partnershipDeedUrl)

        // Handle LLP Agreement (conditional, shared)
        newDocumentsState.llpAgreement = getDocState("llpAgreement", data.user.llpAgreementUrl)

        // Handle Certificate of Incorporation (conditional, shared)
        newDocumentsState.certificateOfIncorporation = getDocState(
          "certificateOfIncorporation",
          data.user.certificateOfIncorporationUrl,
        )

        // Handle MOA & AOA (conditional, shared)
        newDocumentsState.moaAoa = getDocState("moaAoa", data.user.moaAoaUrl)

        // Handle Cancelled Cheque (shared, optional)
        newBankDetailsState.cancelledChequeUrl =
          data.user.cancelledChequeUrl || iecStepDocuments.find((d) => d.name === "cancelledCheque")?.url
        newBankDetailsState.cancelledCheque = newBankDetailsState.cancelledChequeUrl ? ({} as File) : null
        newBankDetailsState.cancelledChequeStatus =
          (data.user.cancelledChequeUrl
            ? "uploaded"
            : iecStepDocuments.find((d) => d.name === "cancelledCheque")?.status) || "pending"
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

  // Map business types to document requirements
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

  // Check if document is required based on business type and registration type
  const isDocumentRequired = (docType: string) => {
    const businessTypeKey = getBusinessTypeKey(profileData.businessType)

    switch (docType) {
      case "panCard":
      case "proofOfAddress":
      case "photograph":
      case "aadhaarCard":
        return true // Required for all business types for IEC
      case "authorizationLetter":
        return businessTypeKey !== "individual" // Required for all except individual
      case "partnershipDeed":
        return businessTypeKey === "partnership"
      case "llpAgreement":
        return businessTypeKey === "llp"
      case "certificateOfIncorporation":
      case "moaAoa":
        return businessTypeKey === "pvt_ltd"
      default:
        return false
    }
  }

  const calculateProgress = useCallback(() => {
    let completed = 0
    let total = 8 // Base requirements for sole proprietorship: panCard, aadhaarCard, photograph, proofOfAddress, email, mobile, businessAddress, natureOfBusiness

    // Basic details (auto-filled from profile)
    if (profileData.panCardUrl) completed++
    if (profileData.aadharCardUrl) completed++
    if (profileData.photographUrl) completed++
    if (profileData.proofOfAddressUrl) completed++
    if (profileData.email.trim()) completed++
    if (profileData.mobile.trim()) completed++

    // Business details
    if (businessDetails.businessAddress.trim()) completed++
    if (businessDetails.natureOfBusiness.trim()) completed++

    // Documents: Check for either uploaded URL, temp file, or shared documents
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
    if (isDocumentRequired("partnershipDeed")) {
      total++
      if (
        (documents.partnershipDeed?.url || documents.partnershipDeed?.tempFile || profileData.partnershipDeedUrl) &&
        documents.partnershipDeed?.status !== "rejected"
      )
        completed++
    }
    if (isDocumentRequired("llpAgreement")) {
      total++
      if (
        (documents.llpAgreement?.url || documents.llpAgreement?.tempFile || profileData.llpAgreementUrl) &&
        documents.llpAgreement?.status !== "rejected"
      )
        completed++
    }
    if (isDocumentRequired("certificateOfIncorporation")) {
      total++
      if (
        (documents.certificateOfIncorporation?.url ||
          documents.certificateOfIncorporation?.tempFile ||
          profileData.certificateOfIncorporationUrl) &&
        documents.certificateOfIncorporation?.status !== "rejected"
      )
        completed++
    }
    if (isDocumentRequired("moaAoa")) {
      total++
      if (
        (documents.moaAoa?.url || documents.moaAoa?.tempFile || profileData.moaAoaUrl) &&
        documents.moaAoa?.status !== "rejected"
      )
        completed++
    }

    // Bank details are optional, so not included in progress calculation

    return Math.round((completed / total) * 100)
  }, [profileData, businessDetails, documents])

  const handleDocumentSelect = (docType: string, file: File | null) => {
    if (!file) return

    if (file.size > 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "❌ File Size Too Large",
        description: `File size is ${(file.size / (1024 * 1024)).toFixed(2)}MB. Please upload a file smaller than 1MB.`,
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
        title: "❌ File Size Too Large",
        description: `File size is ${(file.size / (1024 * 1024)).toFixed(2)}MB. Please upload a file smaller than 1MB.`,
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
      alert(t('complete_all_required_fields'))
      return
    }

    const detailsToSave = {
      businessAddress: businessDetails.businessAddress,
      natureOfBusiness: businessDetails.natureOfBusiness,
      accountNumber: bankDetails.accountNumber,
      bankName: bankDetails.bankName,
      branchName: bankDetails.branchName,
      ifscCode: bankDetails.ifscCode,
    }

    const filesToUpload: { docType: string; file: File }[] = []

    // General documents
    for (const key in documents) {
      const doc = documents[key]
      if (doc.tempFile && (!doc.url || doc.status === "rejected")) {
        filesToUpload.push({ docType: key, file: doc.tempFile })
      }
    }

    // Bank cancelled cheque (optional)
    if (
      bankDetails.tempCancelledCheque &&
      (!bankDetails.cancelledChequeUrl || bankDetails.cancelledChequeStatus === "rejected")
    ) {
      filesToUpload.push({ docType: "cancelledCheque", file: bankDetails.tempCancelledCheque })
    }

    // Check if this is a re-submission (registration status is rejected)
    const isResubmission = registrationStatus === "rejected"

    const result = isResubmission ?
      await resubmitRegistrationApplication({
        stepId: 3, // IEC step ID
        details: detailsToSave,
        filesToUpload: filesToUpload,
        userId: profileData.id,
        dashboardId: profileData.dashboardId,
        registrationType: "IEC Registration",
        registrationName: profileData.businessName || profileData.fullName,
      }) :
      await submitRegistrationApplication({
        stepId: 3, // IEC step ID
        details: detailsToSave,
        filesToUpload: filesToUpload,
        userId: profileData.id,
        dashboardId: profileData.dashboardId,
        registrationType: "IEC Registration",
        registrationName: profileData.businessName || profileData.fullName,
      })

    if (result.success) {
      alert(result.message)
      router.push("/dashboard/progress") // Redirect to progress page
    } else {
      alert(t('submission_failed', { message: result.message }))
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('iec_registration')}</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">{t('import_export_code_registration')}</p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4">
            <h3 className="font-semibold text-blue-900 text-sm sm:text-base">{t('registration_progress')}</h3>
            <span className="text-blue-600 font-bold text-lg sm:text-xl">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 sm:h-3" />
          <p className="text-blue-700 text-xs sm:text-sm mt-2">
            {t('complete_all_required_sections')}
          </p>
        </CardContent>
      </Card>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600" />
            {t('business_information')}
          </CardTitle>
          <CardDescription>{t('information_from_your_profile')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label>{t('business_type')}</Label>
                <Input value={profileData.businessType} disabled className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>{t('business_name')}</Label>
                <Input value={profileData.businessName} disabled className="bg-gray-50" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificates from Other Registrations */}
      {(profileData.gstCertificate || profileData.dscCertificate || profileData.adCodeLetterFromBankUrl) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-600" />
              {t('available_certificates_from_other_registrations')}
            </CardTitle>
            <CardDescription>{t('certificates_from_other_processes')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-emerald-50 p-3 sm:p-4 rounded-lg border border-emerald-200">
              <h4 className="font-medium text-emerald-900 mb-3 text-sm sm:text-base">📜 {t('available_certificates')}:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {profileData.gstCertificate && (
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border">
                    <Award className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    <div className="flex-1">
                      <div className="text-xs sm:text-sm font-medium">{t('gst_certificate')}</div>
                      <div className="flex items-center gap-1 text-green-600 text-xs">
                        <Check className="h-3 w-3" />
                        <span>{t('from_gst_registration')}</span>
                      </div>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary text-xs mt-1"
                        onClick={() => window.open(profileData.gstCertificate, "_blank")}
                      >
                        <Eye className="h-3 w-3 mr-1" /> {t('view')}
                      </Button>
                    </div>
                  </div>
                )}

                {profileData.dscCertificate && (
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border">
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600" />
                    <div className="flex-1">
                      <div className="text-xs sm:text-sm font-medium">{t('dsc_certificate')}</div>
                      <div className="flex items-center gap-1 text-indigo-600 text-xs">
                        <Check className="h-3 w-3" />
                        <span>{t('from_dsc_registration')}</span>
                      </div>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary text-xs mt-1"
                        onClick={() => window.open(profileData.dscCertificate, "_blank")}
                      >
                        <Eye className="h-3 w-3 mr-1" /> {t('view')}
                      </Button>
                    </div>
                  </div>
                )}

                {profileData.adCodeLetterFromBankUrl && (
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border">
                    <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                    <div className="flex-1">
                      <div className="text-xs sm:text-sm font-medium">{t('ad_code_letter')}</div>
                      <div className="flex items-center gap-1 text-blue-600 text-xs">
                        <Check className="h-3 w-3" />
                        <span>{t('from_ad_code_registration')}</span>
                      </div>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary text-xs mt-1"
                        onClick={() => window.open(profileData.adCodeLetterFromBankUrl, "_blank")}
                      >
                        <Eye className="h-3 w-3 mr-1" /> {t('view')}
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
            {t('basic_details_required')} <span className="text-red-500">*</span>
          </CardTitle>
          <CardDescription>{t('information_fetched_from_profile')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900 mb-3 text-sm sm:text-base">✅ {t('auto_filled_from_profile')}:</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label>
                  {t('full_name')} <span className="text-red-500">*</span>
                </Label>
                <Input value={profileData.fullName} disabled className="bg-gray-50" />
                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <Check className="h-3 w-3" />
                  <span>{t('fetched_from_profile')}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>
                  {t('mobile_number')} <span className="text-red-500">*</span>
                </Label>
                <Input value={profileData.mobile} disabled className="bg-gray-50" />
                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <Check className="h-3 w-3" />
                  <span>{t('fetched_from_profile')}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>
                  {t('email_address')} <span className="text-red-500">*</span>
                </Label>
                <Input value={profileData.email} disabled className="bg-gray-50" />
                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <Check className="h-3 w-3" />
                  <span>{t('fetched_from_profile')}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4">
              {[
                { key: "panCardUrl", label: t('pan_card'), icon: FileText, completed: !!profileData.panCardUrl },
                { key: "aadharCardUrl", label: t('aadhaar_card'), icon: FileText, completed: !!profileData.aadharCardUrl },
                { key: "photographUrl", label: t('photograph'), icon: User, completed: !!profileData.photographUrl },
                {
                  key: "proofOfAddressUrl",
                  label: t('proof_of_address'),
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
                      <span>{doc.completed ? t('uploaded_in_profile') : t('pending_in_profile')}</span>
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
            {t('business_details')} <span className="text-red-500">*</span>
          </CardTitle>
          <CardDescription>{t('provide_business_information')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessAddress">
              {t('business_address')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="businessAddress"
              placeholder={t('enter_complete_business_address')}
              value={businessDetails.businessAddress}
              onChange={(e) => setBusinessDetails((prev) => ({ ...prev, businessAddress: e.target.value }))}
            />
            <p className="text-xs text-gray-500">{t('complete_address_description')}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="natureOfBusiness">
              {t('nature_of_business')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="natureOfBusiness"
              placeholder={t('nature_of_business_placeholder')}
              value={businessDetails.natureOfBusiness}
              onChange={(e) => setBusinessDetails((prev) => ({ ...prev, natureOfBusiness: e.target.value }))}
            />
            <p className="text-xs text-gray-500">{t('specify_primary_nature_description')}</p>
          </div>
        </CardContent>
      </Card>

      {/* Conditional Documents Based on Business Type - HIDE for individual/sole proprietorship */}
      {isDocumentRequired("authorizationLetter") && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              {t('business_entity_documents')} <span className="text-red-500">*</span>
            </CardTitle>
            <CardDescription>{t('required_for_business_type', { businessType: profileData.businessType })}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <DocumentUploadSection
              docType="authorizationLetter"
              label={t('authorization_letter_board_resolution')}
              description={t('authorization_letter_description')}
              required={true}
              currentDocState={documents.authorizationLetter || { name: "", file: null, uploaded: false }}
              onFileSelect={(file) => handleDocumentSelect("authorizationLetter", file)}
              colorClass="orange"
               registrationStatus={registrationStatus}
            />

            {isDocumentRequired("partnershipDeed") && (
              <DocumentUploadSection
                docType="partnershipDeed"
                label={t('partnership_deed')}
                description={t('partnership_deed_description')}
                required={true}
                currentDocState={documents.partnershipDeed || { name: "", file: null, uploaded: false }}
                onFileSelect={(file) => handleDocumentSelect("partnershipDeed", file)}
                colorClass="purple"
                 registrationStatus={registrationStatus}
              />
            )}

            {isDocumentRequired("llpAgreement") && (
              <DocumentUploadSection
                docType="llpAgreement"
                label={t('llp_agreement')}
                description={t('llp_agreement_description')}
                required={true}
                currentDocState={documents.llpAgreement || { name: "", file: null, uploaded: false }}
                onFileSelect={(file) => handleDocumentSelect("llpAgreement", file)}
                colorClass="purple"
                 registrationStatus={registrationStatus}
              />
            )}

            {isDocumentRequired("certificateOfIncorporation") && (
              <DocumentUploadSection
                docType="certificateOfIncorporation"
                label={t('certificate_of_incorporation')}
                description={t('certificate_of_incorporation_description')}
                required={true}
                currentDocState={documents.certificateOfIncorporation || { name: "", file: null, uploaded: false }}
                onFileSelect={(file) => handleDocumentSelect("certificateOfIncorporation", file)}
                colorClass="emerald"
                 registrationStatus={registrationStatus}
              />
            )}

            {isDocumentRequired("moaAoa") && (
              <DocumentUploadSection
                docType="moaAoa"
                label={t('moa_aoa')}
                description={t('moa_aoa_description')}
                required={true}
                currentDocState={documents.moaAoa || { name: "", file: null, uploaded: false }}
                onFileSelect={(file) => handleDocumentSelect("moaAoa", file)}
                colorClass="emerald"
                 registrationStatus={registrationStatus}
              />
            )}
          </CardContent>
        </Card>
      )}

      {/* Bank Details (Optional) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-slate-600" />
            {t('bank_details_optional')}
          </CardTitle>
          <CardDescription>{t('bank_details_description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-medium text-slate-900 flex items-center gap-2">
              <Building className="h-4 w-4" />
              {t('bank_details_include')}:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountNumber">{t('bank_account_number')}</Label>
                <Input
                  id="accountNumber"
                  placeholder={t('enter_account_number')}
                  value={bankDetails.accountNumber}
                  onChange={(e) => setBankDetails((prev) => ({ ...prev, accountNumber: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ifscCode">{t('ifsc_code')}</Label>
                <Input
                  id="ifscCode"
                  placeholder={t('enter_ifsc_code')}
                  value={bankDetails.ifscCode}
                  onChange={(e) => setBankDetails((prev) => ({ ...prev, ifscCode: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankName">{t('bank_name')}</Label>
                <Input
                  id="bankName"
                  placeholder={t('enter_bank_name')}
                  value={bankDetails.bankName}
                  onChange={(e) => setBankDetails((prev) => ({ ...prev, bankName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branchName">{t('branch_name')}</Label>
                <Input
                  id="branchName"
                  placeholder={t('enter_branch_name')}
                  value={bankDetails.branchName}
                  onChange={(e) => setBankDetails((prev) => ({ ...prev, branchName: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t('cancelled_cheque_bank_statement')}</Label>
              <p className="text-sm text-gray-600 mb-2">
                {t('cancelled_cheque_description')}
              </p>
              <div
                className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors cursor-pointer"
                onClick={() => document.getElementById("bankDocument")?.click()}
              >
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleBankDocumentSelect(e.target.files?.[0] || null)}
                  className="hidden"
                  id="bankDocument"
                />
                {bankDetails.tempCancelledChequeUrl || bankDetails.cancelledChequeUrl ? (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex items-center gap-1 text-green-600 text-xs">
                      <Check className="h-3 w-3" />
                      <span>{t('document_selected')}</span>
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
                        <Eye className="h-3 w-3 mr-1" /> {t('view')}
                      </Button>
                    )}
                    <Button
                      variant="link"
                      className="p-0 h-auto text-slate-600 text-xs mt-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        document.getElementById("bankDocument")?.click()
                      }}
                    >
                      <Upload className="h-3 w-3 mr-1" /> {t('change_re_upload')}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto" />
                    <div className="text-sm text-gray-600">
                      <span className="text-slate-600">{t('click_to_upload')}</span>
                    </div>
                    <p className="text-xs text-gray-400">{t('supported_formats')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* IEC Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-emerald-600" />
            {t('iec_information')}
          </CardTitle>
          <CardDescription>{t('important_information_about_iec')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-emerald-50 p-3 sm:p-4 rounded-lg border border-emerald-200">
            <h4 className="font-medium text-emerald-900 mb-3 text-sm sm:text-base">🌍 {t('what_is_iec')}?</h4>
            <ul className="text-emerald-800 text-xs sm:text-sm space-y-2">
              <li>• {t('iec_description_1')}</li>
              <li>• {t('iec_description_2')}</li>
              <li>• {t('iec_description_3')}</li>
              <li>• {t('iec_description_4')}</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-3 text-sm sm:text-base">📋 {t('benefits_of_iec_registration')}:</h4>
            <ul className="text-blue-800 text-xs sm:text-sm space-y-2">
              <li>• {t('iec_benefit_1')}</li>
              <li>• {t('iec_benefit_2')}</li>
              <li>• {t('iec_benefit_3')}</li>
              <li>• {t('iec_benefit_4')}</li>
              <li>• {t('iec_benefit_5')}</li>
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
                {t('application_submitted')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm">
                {t('application_submitted_description')}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/dashboard/registration">{t('save_continue_later')}</Link>
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              onClick={handleSubmitApplication}
              disabled={progress < 100}
            >
              {t('submit_iec_application', { progress })}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
