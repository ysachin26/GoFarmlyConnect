import { getDashboardData } from "@/app/actions"
import { FileText } from "lucide-react"
import Link from "next/link"
import DocumentCard from "./document-card"

// Prevent static generation at build time — this page requires a DB connection
export const dynamic = 'force-dynamic'

export default async function Documents() {
  const data = await getDashboardData()
  const user = data.user
  
  if (!user) {
    return (
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">My Documents</h1>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <p className="text-gray-600 text-sm sm:text-base">Unable to load user data.</p>
        </div>
      </div>
    )
  }

  const documents = [
    {
      title: "GST Certificate",
      registrationNumber: user.gstNumber || "",
      certificateUrl: user.gstCertificate || "",
      status: "verified" as const,
      type: "gst" as const,
    },
    {
      title: "IEC Certificate", 
      registrationNumber: user.iecNumber || "",
      certificateUrl: user.iecCertificate || "",
      status: "verified" as const,
      type: "iec" as const,
    },
    {
      title: "DSC Certificate",
      registrationNumber: user.dscNumber || "",
      certificateUrl: user.dscCertificate || "",
      status: "verified" as const,
      type: "dsc" as const,
    },
    {
      title: "ICEGATE Certificate",
      registrationNumber: user.icegateNumber || "",
      certificateUrl: user.icegateCertificate || "",
      status: "verified" as const,
      type: "icegate" as const,
    },
    {
      title: "AD Code Certificate",
      registrationNumber: user.adcodeNumber || "",
      certificateUrl: user.adcodeCertificate || "",
      status: "verified" as const,
      type: "adcode" as const,
    },
  ]

  // Filter out documents that don't have either a certificate or registration number
  const availableDocuments = documents.filter(doc => 
    (doc.certificateUrl && doc.certificateUrl.trim() !== "") || 
    (doc.registrationNumber && doc.registrationNumber.trim() !== "")
  )

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">My Documents</h1>
      
      {availableDocuments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {availableDocuments.map((doc, index) => (
            <DocumentCard
              key={index}
              title={doc.title}
              registrationNumber={doc.registrationNumber}
              certificateUrl={doc.certificateUrl}
              status={doc.status}
              type={doc.type}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 sm:p-8 text-center">
          <FileText className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-400 mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No Documents Available</h3>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            You don't have any registration documents yet. Complete your registrations to see your certificates here.
          </p>
          <Link 
            href="/dashboard/registration" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            <FileText className="w-4 h-4" />
            Start Registration
          </Link>
        </div>
      )}
    </div>
  )
}
