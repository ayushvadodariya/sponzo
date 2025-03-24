import { Otp, BaseUser }from "../models/index.js"
import { createToken} from "../services/authentication.js"
import { sendEmail } from "../utils/email.js"
import { getGoogleUserInfo } from "../config/google.js"


async function logoutController(req, res) {
  try {
    // Clear the authentication cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    })

    return res.status(200).json({
      status: "success",
      message: "Successfully logged out"
    })
  } catch (error) {
    return res.status(500).json({ 
      status: "error",
      message: "Server error",
      errors: [{ message: error.message }]
    })
  }
}

async function googleSigninController(req, res) {
  try {
    const { code } = req.body

    const userData = await getGoogleUserInfo(code)
    if (!userData || !userData.email) {
      return res.status(400).json({ 
        status: "error",
        message: "Failed to retrieve user information from Google",
        authAction: "retry"
      })
    }

    const user = await BaseUser.findOne({ email: userData.email })
    if (!user) {
      return res.status(401).json({ 
        status: "error",
        message: "User not found. Please sign up first.",
        authAction: "signup" // Hint for the frontend
      })
    }

    if (user.authProvider.providerName !== "google") {
      return res.status(403).json({ 
        status: "error",
        message: "This email is registered with a different login method. Please use email/password to sign in.",
        authAction: "signin-email" // Hint for the frontend
      })
    }

    const token = await createToken(user._id)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        token: token
      }
    })

  } catch (err) {
    console.error('Google auth error:', err.response?.data || err.message)
    console.error('Stack trace:', err.stack)
    return res.status(400).json({ 
      status: "error",
      message: "Invalid Google Token", 
      errors: [{ message: err.message }]
    })
  }
}

async function googleSignupController(req, res) {
  try {
    const { code, userType } = req.body

    const userData = await getGoogleUserInfo(code)
    if (!userData || !userData.email) {
      return res.status(400).json({ 
        status: "error",
        message: "Failed to retrieve user information from Google",
        authAction: "retry"
      })
    }

    const existingUser = await BaseUser.findOne({ email: userData.email })
    if (existingUser) {
      if (existingUser.authProvider.providerName === "google") {
        return res.status(409).json({ 
          status: "error",
          message: "User already exists with this Google account. Please sign in instead.",
          authAction: "signin"
        })
      }
      
      return res.status(409).json({ 
        status: "error",
        message: "An account already exists with this email. Please sign in with your password.",
        authAction: "signin-email"
      })
    }
    
    // Create new user
    const newUser = await BaseUser.create({
      email: userData.email,
      profilePicture: userData.profilePicture,
      authProvider: {
        providerName: "google"
      },
      isVerified: true,
      userType
    })
    
    // Generate token
    const token = await createToken(newUser._id)
    
    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
    
    return res.status(201).json({
      status: "success",
      message: "Account created successfully",
      data: {
        token: token,
        user: {
          email: newUser.email,
          name: newUser.name,
          picture: newUser.profilePicture
        }
      }
    })
    
  } catch (err) {
    console.error('Google signup error:', err.response?.data || err.message)
    console.error('Stack trace:', err.stack)
    return res.status(400).json({ 
      status: "error",
      message: "Failed to create account", 
      errors: [{ message: err.message }]
    })
  }
}


async function signupController(req,res) {
  const { email, password, userType } = req.body

  try{
    const userRecord = await BaseUser.findOne({ email: email})
    if(userRecord) {
      return res.status(409).json({ 
        status: "error",
        message: "User already exists with provided email address"
      })
    }

    await Otp.deleteMany({ email: email })

    const otpRecord = await Otp.create({
      email,
      password,
      userType,
      purpose: "signup"
    })

    await sendEmail({
      to: email,
      subject: 'Verify your Sponzo account',
      text: `Your verification code is: ${otpRecord.otp}. It will expire in 5 minutes.`,
      html: `<p>Your verification code is: <strong>${otpRecord.otp}</strong></p><p>It will expire in 5 minutes.</p>`
    })
    return res.status(200).json({
      status: 'success',
      message: 'Verification code sent to email',
      data: {
        sessionId: otpRecord.sessionId,
        email: otpRecord.email,
        expiresAt: otpRecord.expiresAt
      }
    })
  } catch(error){
    console.error(error)
    return res.status(500).json({
      status: "error",
      message: "Server error",
      errors: [{ message: error.message }]
    })
  }
}


async function signinController(req, res){
  const { email, password } = req.body

  try{
    const user = await BaseUser.findOne({ email })
    if(!user || !(await user.authenticate( password))){
      return res.status(401).json({ 
        status: "error",
        message: "Invalid email or password"
      })
    }
    const token = await createToken(user.publicId)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: { token: token }
    })
  } catch(error){
    return res.status(500).json({ 
      status: "error",
      message: "Server error",
      errors: [{ message: error.message }]
    })
  }
}

async function verifyOtpController(req, res) {
  try {
    const { sessionId, otp } = req.body

    const otpRecord = await Otp.findOne({ sessionId })
    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).json({ 
        status: "error",
        message: "Invalid or expired OTP. Request a new OTP." 
      })
    }
    
    const { email, password, userType } = otpRecord

    
    const user = await BaseUser.create({
      email,
      authProvider: {
        providerName: "email",
        password
      },
      isVerified: true,
      userType
    })
    await Otp.deleteOne({ sessionId })
    console.log(`user create ${user}`)
    console.log(`User created with public id: ${user.publicId}`);
    
    const token = await createToken(user.publicId)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
    
    return res.status(201).json({ 
      status: "success",
      message: "User created successfully",
      data: { token }
    })
  } catch (error) {
    return res.status(500).json({ 
      status: "error",
      message: "Server error",
      errors: [{ message: error.message }]
    })
  }
}

async function resendOtpController(req, res) {
  const { sessionId } = req.body

  try {
    const existingOtp = await Otp.findOne({ sessionId })
    
    if (!existingOtp) {
      return res.status(400).json({ 
        status: "error",
        message: "Invalid session ID or expired OTP."
      })
    }

    const newOtp = await existingOtp.requestNewOtp()
    
    await sendEmail({
      to: newOtp.email,
      subject: "Your New Verification Code",
      text: `Your new verification code is: ${newOtp.otp}. It will expire in 5 minutes.`,
      html: `<p>Your new verification code is: <strong>${newOtp.otp}</strong></p><p>It will expire in 5 minutes.</p>`
    })
    
    return res.status(201).json({ 
      status: "success",
      message: "New verification code sent successfully.",
      data: { 
        sessionId: newOtp.sessionId,
        email: newOtp.email,
        expiresAt: newOtp.expiresAt
      }
    })
  } catch (error) {
    return res.status(500).json({ 
      status: "error",
      message: "Server error",
      errors: [{ message: error.message }]
    })
  }
}

export { logoutController, googleSigninController, googleSignupController, signupController, signinController, verifyOtpController, resendOtpController }