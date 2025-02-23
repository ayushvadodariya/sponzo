import mongoose, { Schema} from "mongoose"

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const OtpSchema= new Schema({
  email: { type: String, unique:true, match: [emailRegex, 'Please provide valid email addresses'] },
  otp: { type: String }
}, { timestamps: true })

OtpSchema.index({ createdAt: 1}, { expireAfterSeconds: 300})

OtpSchema.pre('save', function (next){
  this.otp = Math.floor(100000 + Math.random() * 900000).toString()
  if(!this.otp){
    return next(new Error("OTP generation failed"))
  }
  next()
})

const Otp = mongoose.model("Otp", OtpSchema)

export default Otp