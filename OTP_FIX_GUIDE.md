# OTP Functions - Exact Replacement Code

## File: `app/actions.ts`

### Step 1: Add Import at the Top
Replace this section at the top of `app/actions.ts`:

```typescript
// FIND THIS:
import { redirect } from "next/navigation"

// REPLACE WITH THIS:
import { redirect } from "next/navigation"
import Otp from "@/models/Otp"
```

---

### Step 2: Replace generateOtp Function
Find this function in `app/actions.ts`:

```typescript
// FIND THIS FUNCTION (around line 20-29):
export async function generateOtp(mobileNo: string) {
  // Simulate OTP generation
  const otp = Math.floor(100000 + Math.random() * 900000).toString() // 6-digit OTP
  otpStore[mobileNo] = otp
  console.log(`Generated OTP for ${mobileNo}: ${otp}`) // For demonstration purposes
  return { success: true, message: "OTP sent to your mobile number." }
}
```

Replace with:

```typescript
// REPLACE WITH THIS:
export async function generateOtp(mobileNo: string) {
  try {
    await connectDB()

    // Validate mobile number format (Indian format: 10 digits)
    const cleanNumber = mobileNo.replace(/\D/g, '')
    if (cleanNumber.length !== 10) {
      return { 
        success: false, 
        message: "Please enter a valid 10-digit mobile number." 
      }
    }

    // Delete any existing OTP for this number
    await Otp.deleteMany({ mobileNo: cleanNumber })

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Save to database with 10-minute expiration
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    await new Otp({ 
      mobileNo: cleanNumber, 
      otp, 
      expiresAt 
    }).save()

    // TODO: Send via SMS service (Twilio, MSG91, AWS SNS, etc.)
    // Example with Twilio:
    // const twilio = require('twilio')
    // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    // await client.messages.create({
    //   body: `Your GoFarmlyConnect OTP is ${otp}. Valid for 10 minutes.`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: '+91' + cleanNumber
    // })

    // For development only - DO NOT include in production
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ OTP for ${cleanNumber}: ${otp}`)
    }

    return { 
      success: true, 
      message: "OTP sent successfully to your mobile number. Valid for 10 minutes.",
      // REMOVE THIS LINE IN PRODUCTION - Only for testing in development
      ...(process.env.NODE_ENV === 'development' && { testOtp: otp })
    }
  } catch (error: any) {
    console.error("OTP generation error:", error)
    return { 
      success: false, 
      message: "Failed to send OTP. Please try again." 
    }
  }
}
```

---

### Step 3: Replace verifyOtp Function
Find this function in `app/actions.ts`:

```typescript
// FIND THIS FUNCTION (around line 31-36):
export async function verifyOtp(mobileNo: string, otp: string) {
  if ("123456" === otp) {  // ❌ CRITICAL VULNERABILITY
    delete otpStore[mobileNo] // OTP consumed
    return { success: true, message: "OTP verified successfully." }
  }
  return { success: false, message: "Invalid OTP." }
}
```

Replace with:

```typescript
// REPLACE WITH THIS:
export async function verifyOtp(mobileNo: string, otp: string) {
  try {
    await connectDB()

    // Validate inputs
    if (!mobileNo || !otp) {
      return { 
        success: false, 
        message: "Mobile number and OTP are required." 
      }
    }

    const cleanNumber = mobileNo.replace(/\D/g, '')

    // Find OTP record
    const otpRecord = await Otp.findOne({
      mobileNo: cleanNumber,
      otp: otp.trim(),
      expiresAt: { $gt: new Date() } // Only valid if not expired
    })

    if (!otpRecord) {
      return { 
        success: false, 
        message: "Invalid or expired OTP. Please request a new one." 
      }
    }

    // Delete OTP after successful verification (one-time use)
    await Otp.deleteOne({ _id: otpRecord._id })

    return { 
      success: true, 
      message: "OTP verified successfully." 
    }
  } catch (error: any) {
    console.error("OTP verification error:", error)
    return { 
      success: false, 
      message: "OTP verification failed. Please try again." 
    }
  }
}
```

---

### Step 4: Remove Old In-Memory OTP Store
Delete this line from the top of `app/actions.ts`:

```typescript
// DELETE THIS LINE:
const otpStore: Record<string, string> = {} // Stores OTPs by mobile number
```

---

## 🧪 Testing the Fix

### Local Testing:
```bash
# 1. Start dev server
npm run dev

# 2. Test OTP generation
# - Go to signup page
# - Enter: 9876543210 (any 10 digits)
# - Check terminal output for test OTP
# - Use that OTP to verify

# 3. Test OTP expiration
# - Generate OTP
# - Wait 10+ minutes
# - Try to use the OTP
# - Should fail with "Invalid or expired OTP"
```

### Before Production:
- [ ] Integrate real SMS service
- [ ] Remove `testOtp` from response (line with `...(process.env.NODE_ENV === 'development'...`)
- [ ] Change OTP expiration from 10 to 5 minutes (if desired)
- [ ] Add rate limiting to prevent brute force

---

## 🔐 Next Steps for Production

1. **Add Rate Limiting**:
```typescript
// In generateOtp function, after connectDB():
const recentAttempts = await Otp.countDocuments({
  mobileNo: cleanNumber,
  createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) } // Last hour
})

if (recentAttempts >= 3) {
  return { 
    success: false, 
    message: "Too many OTP requests. Please try again later." 
  }
}
```

2. **Integrate SMS Service** (Choose one):
   - **Twilio**: `npm install twilio`
   - **MSG91**: `npm install msg91`
   - **AWS SNS**: `npm install @aws-sdk/client-sns`

3. **Add Audit Logging**:
```typescript
// Log all OTP attempts for security audit
await AuditLog.create({
  action: 'OTP_GENERATED',
  mobileNo: cleanNumber,
  timestamp: new Date()
})
```

---

## ❓ FAQ

**Q: What if user clicks "Resend OTP"?**
A: The new `generateOtp` function automatically deletes old OTPs and creates a new one.

**Q: What if user enters wrong OTP?**
A: The OTP remains valid until expiration. They can try again.

**Q: What happens after 10 minutes?**
A: MongoDB automatically deletes the expired OTP record.

**Q: Can I change OTP validity period?**
A: Yes, modify: `new Date(Date.now() + 10 * 60 * 1000)` to desired milliseconds.

