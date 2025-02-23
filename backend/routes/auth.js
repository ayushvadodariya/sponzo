import { Router } from "express"
import { resendOtp, signinController, signupController, verifyExistingUserOtp, verifyOtpController } from "../controllers/auth.js"

const router = Router()

router.post('/signup', signupController)
router.post('/signin', signinController)
router.post('/verify-otp', verifyOtpController)
router.post('/resend-otp', resendOtp)
router.post('/verify-existing-user-otp', verifyExistingUserOtp)

export default router