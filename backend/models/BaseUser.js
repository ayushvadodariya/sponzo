import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const baseUserSchema = new Schema({
  email: { 
    type: String, 
    unique: true, 
    required: true,
    match: [emailRegex, 'Please provide a valid email address'] 
  },
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  authProvider: {
    providerName: { 
      type: String, 
      enum: ["google", "email"],
      required: true
    },
    password: { type: String } // Only used for "email" provider
  },
  userType: {
    type: String,
    enum: ["creator", "sponsor"], // Updated from "brand" to "sponsor"
    required: true
  },
  profilePicture: { type: String },
  // Reference to the specific profile (Creator or Sponsor)
  profile: {
    type: Schema.Types.ObjectId,
    refPath: 'userType' // Dynamic reference based on userType
  }
}, { timestamps: true })

// Authentication method
baseUserSchema.methods.authenticate = async function (enteredPassword) {
  if (this.authProvider.providerName !== "email" || !this.authProvider.password) return null

  const isMatch = await bcrypt.compare(enteredPassword, this.authProvider.password)
  return isMatch ? this : null
}

// Password hashing
baseUserSchema.pre("save", async function (next) {
  try {
    // Ensure authProvider exists
    if (!this.authProvider || !this.authProvider.providerName) {
      return next(new Error("AuthProvider is required"))
    }

    // If using email, ensure password is provided
    if (this.authProvider.providerName === "email" && !this.authProvider.password) {
      return next(new Error("Password is required for email sign-up"))
    }

    // Hash password only if modified and using email
    if (this.authProvider.providerName === "email" && 
        this.authProvider.password && 
        this.isModified("authProvider.password")) {
      const salt = await bcrypt.genSalt(10)
      this.authProvider.password = await bcrypt.hash(this.authProvider.password, salt)
    }

    next()
  } catch (error) {
    next(error)
  }
})

const BaseUser = mongoose.model('BaseUser', baseUserSchema)

export default BaseUser