import mongoose, { Schema } from "mongoose"
import crypto from "crypto"

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const OtpSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    default: () => crypto.randomBytes(16).toString('hex')
  },
  
  email: { 
    type: String, 
    required: true,
    match: [emailRegex, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: false // Optional - only required for signup
  },
  userType: {
    type: String,
    enum: ['creator', 'sponsor'],
    required: false // Optional - only required for signup
  },
  
  otp: { 
    type: String,
  },
  
  regenerateOtp: {
    type: Boolean,
    default: false,
    select: false
  },
  
  purpose: {
    type: String,
    enum: ['signup', 'password-reset', 'email-verification'],
    required: true
  },
 
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
  }
}, { timestamps: true })

OtpSchema.pre('validate', function(next) {
  if (this.purpose === 'signup') {
    if (!this.password) {
      return next(new Error('Password is required for signup'))
    }
    if (!this.userType) {
      return next(new Error('User type is required for signup'))
    }
  }
  next()
})

OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

OtpSchema.pre('save', function(next) {
  if (this.isNew || this.regenerateOtp === true || this.otp == null) {
    this.otp = Math.floor(100000 + Math.random() * 900000).toString()
    this.expiresAt = new Date(Date.now() + 5 * 60 * 1000)
  }
  
  this.regenerateOtp = false
  
  next()
})

OtpSchema.methods.verifyOtp = function(inputOtp) {
  return this.otp === inputOtp && new Date() < this.expiresAt
}

OtpSchema.methods.requestNewOtp = function() {
  this.regenerateOtp = true
  return this.save()
}

const Otp = mongoose.model("Otp", OtpSchema)

export default Otp