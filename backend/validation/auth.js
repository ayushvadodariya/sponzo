import { z } from 'zod'

const emailSchema = z.string({
  required_error: "Email is required",
  invalid_type_error: "Email must be a string"
}).email({
  message: "Invalid email format"
})

const userTypeSchema = z.enum(['creator', 'sponsor'], {
  required_error: "User type is required",
  invalid_type_error: "User type must be either 'creator' or 'sponsor'"
})

// Basic schemas for authentication
const signinSchema = z.object({
  email: emailSchema,
  password: z.string({
    required_error: "Password is required"
  }).min(6, "Password must be at least 6 characters")
})

const signupSchema = z.object({
  email: emailSchema,
  password: z.string({
    required_error: "Password is required"
  }).min(6, "Password must be at least 6 characters"),
  userType: userTypeSchema
})

const verifyOtpSchema = z.object({
  sessionId: z.string({
    required_error: "Session ID is required"
  }),
  otp: z.string({
    required_error: "OTP is required"
  }).length(6, "OTP must be exactly 6 characters"),

})

const resendOtpSchema = z.object({
  sessionId: z.string({
    required_error: "Session ID is required"
  })
})

const googleSignupSchema = z.object({
  code: z.string({
    required_error: "Authorization code is required"
  }),
  userType: userTypeSchema
})

const googleSigninSchema = z.object({
  code: z.string({
    required_error: "Authorization code is required"
  })
})

export {
  signinSchema,
  signupSchema,
  verifyOtpSchema,
  resendOtpSchema,
  googleSigninSchema,
  googleSignupSchema
}