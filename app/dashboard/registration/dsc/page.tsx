"use client"

import { useState, useEffect, useCallback } from "react"
import type React from "react"
import { ArrowLeft, Check, Upload, FileText, User, Building, MapPin, Shield, Clock, Eye, XCircle, Award, CreditCard } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
  bankDocumentUrl: string
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
          <span>{t("rejected_re_upload_required")}</span>
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
          <span>{t("uploaded_and_pending_verification")}</span>
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
            {(registrationStatus === "pending" || registrationStatus === "rejected" || currentDocState.status === "rejected" || hasTempFile || !currentDocState.url) && (
              <Button
                variant="link"
                className={`p-0 h-auto text-${colorClass}-600 text-xs mt-1`}
                onClick={handleButtonClick}
              >
                <Upload className="h-3 w-3 mr-1" /> 
                {(registrationStatus === "pending" || registrationStatus === "rejected" || currentDocState.status === "rejected") ? t("re_upload") : t("change_re_upload")}
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

export default function DSCRegistration() {
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
    bankDocumentUrl: "",
    adCodeLetterFromBankUrl: "",
  })
  const [dscType, setDscType] = useState<"individual" | "organization" | "">("")
  const [businessDetails, setBusinessDetails] = useState({
    designation: "",
    organizationName: "",
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
          bankDocumentUrl: data.user.bankDocumentUrl || "",
          adCodeLetterFromBankUrl: data.user.adCodeLetterFromBankUrl || "",
        })

        const dscStep = data.registrationSteps.find((step) => step.id === 4)
        const dscStepDocuments = dscStep?.documents || []
        const dscStepDetails = dscStep?.details || {}
        setRegistrationStatus(dscStep?.status || "")

        setDscType(dscStepDetails.dscType || "")
        setBusinessDetails({
          designation: dscStepDetails.designation || "",
          organizationName: dscStepDetails.organizationName || data.user.businessName || "",
        })

        const newDocumentsState: Record<string, DocumentUploadState> = {}

        const getDocState = (docName: string, profileUrl: string | undefined) => {
          const dashboardDoc = dscStepDocuments.find((d) => d.name === docName)
          const finalUrl = profileUrl || dashboardDoc?.url
          const finalStatus = profileUrl ? "uploaded" : dashboardDoc?.status
          return {
            name: docName,
            file: finalUrl ? ({} as File) : null,
            uploaded: !!finalUrl,
            url: finalUrl,
            status: finalStatus || "pending",
            tempFile: null,
            tempUrl: undefined,
          }
        }

        newDocumentsState.authorizationLetter = getDocState("authorizationLetter", data.user.authorizationLetterUrl)
        setDocuments(newDocumentsState)
      } catch (error) {
        console.error("Failed to fetch profile data:", error)
      }
    }
    fetchProfileData()
  }, [])

  useEffect(() => {
    return () => {
      Object.values(documents).forEach((doc) => {
        if (doc.tempUrl) URL.revokeObjectURL(doc.tempUrl)
      })
    }
  }, [documents])

  const isDocumentRequired = (docType: string) => {
    switch (docType) {
      case "panCard":
      case "proofOfAddress":
      case "photograph":
      case "aadhaarCard":
        return true
      case "authorizationLetter":
        return dscType === "organization"
      default:
        return false
    }
  }

  const calculateProgress = useCallback(() => {
    let completed = 0
    let total = 6

    if (profileData.panCardUrl) completed++
    if (profileData.aadharCardUrl) completed++
    if (profileData.photographUrl) completed++
    if (profileData.proofOfAddressUrl) completed++
    if (profileData.email.trim()) completed++
    if (profileData.mobile.trim()) completed++

    if (dscType) {
      total += 1
      completed += 1
    }

    if (dscType === "organization") {
      total += 2
      if (businessDetails.designation.trim()) completed++
      if (businessDetails.organizationName.trim()) completed++
    }

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
  }, [profileData, dscType, businessDetails, documents])

  const handleDocumentSelect = (docType: string, file: File | null) => {
    if (!file) return

    if (file.size > 1024 * 1024) {
      toast({
        variant: "destructive",
        title: `❌ ${t("file_too_large")}`,
        description: `${t("file_size_is")} ${(file.size / (1024 * 1024)).toFixed(2)}MB. ${t("file_size_limit")}`,
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

  const handleSubmitApplication = async () => {
    if (progress < 100) {
      alert(t("complete_all_required_fields"))
      return
    }

    const detailsToSave: Record<string, any> = {
      dscType: dscType,
    }
    if (dscType === "organization") {
      detailsToSave.designation = businessDetails.designation
      detailsToSave.organizationName = businessDetails.organizationName
    }

    const documentsToUpload: { docType: string; file: File }[] = []

    for (const key in documents) {
      const doc = documents[key]
      if (doc.tempFile && (!doc.url || doc.status === "rejected")) {
        documentsToUpload.push({ docType: key, file: doc.tempFile })
      }
    }

    const isResubmission = registrationStatus === "rejected"

    const result = isResubmission ?
      await resubmitRegistrationApplication({
        stepId: 4,
        details: detailsToSave,
        filesToUpload: documentsToUpload,
        userId: profileData.id,
        dashboardId: profileData.dashboardId,
        registrationType: t("dsc_registration"),
        registrationName: profileData.businessName || profileData.fullName,
      }) :
      await submitRegistrationApplication({
        stepId: 4,
        details: detailsToSave,
        filesToUpload: documentsToUpload,
        userId: profileData.id,
        dashboardId: profileData.dashboardId,
        registrationType: t("dsc_registration"),
        registrationName: profileData.businessName || profileData.fullName,
      })

    if (result.success) {
      alert(result.message)
      router.push("/dashboard/progress")
    } else {
      alert(`${t("submission_failed")}: ${result.message}`)
    }
  }

  const progress = calculateProgress()

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/registration">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("dsc_registration_title")}</h1>
          <p className="text-gray-600 mt-1">{t("dsc_registration_description")}</p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-blue-900">{t("registration_progress")}</h3>
            <span className="text-blue-600 font-bold">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-blue-700 text-sm mt-2">
            {t("complete_required_sections_dsc")}
          </p>
        </CardContent>
      </Card>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600" />
            {t("business_information")}
          </CardTitle>
          <CardDescription>{t("information_from_your_profile")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      {(profileData.gstCertificate || profileData.iecCertificate || profileData.adCodeLetterFromBankUrl) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-600" />
              {t("available_certificates_from_other_registrations")}
            </CardTitle>
            <CardDescription>{t("certificates_obtained_from_other_registrations")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h4 className="font-medium text-emerald-900 mb-3">📜 {t("available_certificates")}:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profileData.gstCertificate && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                    <Award className="h-4 w-4 text-green-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("gst_certificate")}</div>
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
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                    <Award className="h-4 w-4 text-emerald-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("iec_certificate")}</div>
                      <div className="flex items-center gap-1 text-emerald-600 text-xs">
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

                {profileData.adCodeLetterFromBankUrl && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                    <CreditCard className="h-4 w-4 text-blue-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{t("ad_code_letter")}</div>
                      <div className="flex items-center gap-1 text-blue-600 text-xs">
                        <Check className="h-3 w-3" />
                        <span>{t("from_ad_code_registration")}</span>
                      </div>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary text-xs mt-1"
                        onClick={() => window.open(profileData.adCodeLetterFromBankUrl, "_blank")}
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
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900 mb-3">✅ {t("auto_filled_from_profile")}:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {[
                { key: "panCardUrl", label: t("pan_card"), icon: FileText, completed: !!profileData.panCardUrl },
                { key: "aadharCardUrl", label: t("aadhaar_card"), icon: FileText, completed: !!profileData.aadharCardUrl },
                { key: "photographUrl", label: t("photograph"), icon: User, completed: !!profileData.photographUrl },
                {
                  key: "proofOfAddressUrl",
                  label: t("proof_of_address"),
                  icon: MapPin,
                  completed: !!profileData.proofOfAddressUrl,
                },
              ].map((doc) => (
                <div key={doc.key} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <doc.icon className={`h-4 w-4 ${doc.completed ? "text-green-600" : "text-gray-400"}`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium">
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

      {/* DSC Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-600" />
            {t("dsc_type_selection")} <span className="text-red-500">*</span>
          </CardTitle>
          <CardDescription>{t("choose_dsc_type_description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>
              {t("select_dsc_type")} <span className="text-red-500">*</span>
            </Label>
            <RadioGroup value={dscType} onValueChange={(value) => setDscType(value as "individual" | "organization")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual">{t("individual_dsc")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="organization" id="organization" />
                <Label htmlFor="organization">{t("organization_dsc")}</Label>
              </div>
            </RadioGroup>
          </div>

          {dscType === "individual" && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">{t("individual_dsc_selected")}</h4>
              <p className="text-green-800 text-sm">
                {t("individual_dsc_description")}
              </p>
            </div>
          )}

          {dscType === "organization" && (
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-3">{t("organization_dsc_selected")}</h4>
              <p className="text-purple-800 text-sm mb-4">
                {t("organization_dsc_description")}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="designation">
                    {t("your_designation")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="designation"
                    placeholder={t("designation_placeholder")}
                    value={businessDetails.designation}
                    onChange={(e) => setBusinessDetails((prev) => ({ ...prev, designation: e.target.value }))}
                  />
                  <p className="text-xs text-gray-500">{t("designation_help_text")}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizationName">
                    {t("organization_name")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="organizationName"
                    placeholder={t("organization_name_placeholder")}
                    value={businessDetails.organizationName}
                    onChange={(e) => setBusinessDetails((prev) => ({ ...prev, organizationName: e.target.value }))}
                  />
                  <p className="text-xs text-gray-500">{t("organization_name_help_text")}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Conditional Documents Based on DSC Type */}
      {isDocumentRequired("authorizationLetter") && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              {t("authorization_letter")} <span className="text-red-500">*</span>
            </CardTitle>
            <CardDescription>{t("required_for_organization_dsc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <DocumentUploadSection
              docType="authorizationLetter"
              label={t("authorization_letter_board_resolution")}
              description={t("authorization_letter_description")}
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

      {/* DSC Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-600" />
            {t("dsc_information")}
          </CardTitle>
          <CardDescription>{t("important_information_dsc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
            <h4 className="font-medium text-emerald-900 mb-3">🔐 {t("what_is_dsc")}</h4>
            <ul className="text-emerald-800 text-sm space-y-2">
              <li>• {t("dsc_definition_1")}</li>
              <li>• {t("dsc_definition_2")}</li>
              <li>• {t("dsc_definition_3")}</li>
              <li>• {t("dsc_definition_4")}</li>
              <li>• {t("dsc_definition_5")}</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-3">📋 {t("uses_of_dsc")}</h4>
            <ul className="text-blue-800 text-sm space-y-2">
              <li>• {t("dsc_use_1")}</li>
              <li>• {t("dsc_use_2")}</li>
              <li>• {t("dsc_use_3")}</li>
              <li>• {t("dsc_use_4")}</li>
              <li>• {t("dsc_use_5")}</li>
            </ul>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h4 className="font-medium text-amber-900 mb-3">⚠️ {t("important_notes")}</h4>
            <ul className="text-amber-800 text-sm space-y-2">
              <li>• {t("dsc_note_1")}</li>
              <li>• {t("dsc_note_2")}</li>
              <li>• {t("dsc_note_3")}</li>
              <li>• {t("dsc_note_4")}</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t">
        {registrationStatus === "in-progress" ? (
          <Card className="w-full bg-amber-50 border-amber-200 text-amber-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-900 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {t("application_submitted")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                {t("dsc_application_submitted_processing")}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Button variant="outline" asChild>
              <Link href="/dashboard/registration">{t("save_continue_later")}</Link>
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmitApplication}
              disabled={progress < 100}
            >
              {t("submit_dsc_application").replace("{{progress}}", progress.toString())}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}