import mongoose, { Schema, Document } from 'mongoose'

interface IOtp extends Document {
  mobileNo: string
  otp: string
  createdAt: Date
  expiresAt: Date
}

const OtpSchema = new Schema<IOtp>(
  {
    mobileNo: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      index: true,
    },
    otp: {
      type: String,
      required: [true, 'OTP is required'],
      minlength: [6, 'OTP must be at least 6 characters'],
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expireAfterSeconds: 0 }, // MongoDB will auto-delete after this date
    },
  },
  {
    timestamps: true,
  }
)

// Ensure index is created for automatic deletion
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export default mongoose.models.Otp || mongoose.model<IOtp>('Otp', OtpSchema)
