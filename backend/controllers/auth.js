import { Otp, User }from "../models/index.js"
import { createToken} from "../services/authentication.js"
import { sendEmail } from "../utils/email.js"

async function signupController(req,res) {
  const { email } = req.body
  if(!email){
    return res.status(400).json({ message: "Provide email in body"})
  }

  try{
    const userRecord = await User.findOne({ email: email})
    if(userRecord) {
      return res.status(409).json({ message: "User already exists with provided email address"})
    }
    let otp = await Otp.findOne({ email: email}) 
    if(otp){
      await Otp.deleteOne({ email: email})
    }
    otp = await Otp.create({
      email
    })
    await sendEmail(email,"Your Otp Code", `Your OTP is : ${otp.otp}. It expires in 5 minutes` )
    return res.status(201).json({ message: "Otp has been send successfully. ", expireIn: "5 minutes"})
  } catch(error){
    console.error(error)
    return res.status(500).json({message: error.message})
  }
}

async function signinController(req, res){
  const { email, password } = req.body
  if(!email || !password){
    return res.status(400).json({ message: "Provide email and password in body"})
  }

  try{
    const user = await User.findOne({ email })
    if(!user || !(await user.authenticate( password))){
      return res.status(401).json({ message: "Invalid email or password"})
    }
    const token = await createToken(user._id)
    return res.status(200).json({token:token, message: "Login successful"} )
  } catch(error){
    return res.status(500).json({ message: error.message})
  }
}

async function verifyOtpController(req, res){
  try {
    const { email, password, otp } = req.body
    if(!email || !otp || !password){
      return res.status(400).json({ message: "Provide email, password and otp in body"})
    }   

    const otpRecord = await Otp.findOne({ email: email})
    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP. Request a new OTP." })
    }

    await Otp.deleteOne({ email: email})

    const user = await User.create({
      email,
      password,
      isVerified: true
    })
    
    const token = await createToken(user._id)
    return res.status(201).json({ token,  message: "User created successfully"})
  } catch(error) {
    return res.status(500).json({ message: error.message });
  }
}

async function resendOtp(req, res){
  const { email } = req.body
  if(!email){
    return res.status(400).json({ message: "Provide email in body"})
  }

  try {
    const userRecord = await User.findOne({ email })
    if(userRecord && userRecord.isVerified === true){
      return res.status(400).json({ message: "User is already verified."})
    }
    let otp = await Otp.findOne({ email: email }) 
    if(otp){
      await Otp.deleteOne({ email: email})
    }
    otp = await Otp.create({
      email
    })
    await sendEmail(email,"Your Otp Code", `Your OTP is : ${otp.otp}. It expires in 5 minutes` )
    return res.status(201).json({ message: "Otp has been send successfully. ", expireIn: "5 minutes"})
  } catch(error) {
      return res.status(500).json({ message: error.message });
  }
}

async function verifyExistingUserOtp(req, res){
  try {
    const { email, otp } = req.body
    if (!email || !otp) {
      return res.status(400).json({ message: "Provide email and OTP" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found. Please sign up first." })
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified." })
    }

    const otpRecord = await Otp.findOne({ email })
    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP. Request a new OTP." })
    }

    user.isVerified = true
    await user.save()

    await Otp.deleteOne({ email })

    return res.status(200).json({ message: "OTP verified successfully. User is now verified." })
  } catch(error) {
      return res.status(500).json({ message: error.message });
  }
}
export { signupController, signinController, verifyOtpController, resendOtp, verifyExistingUserOtp}