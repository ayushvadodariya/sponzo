import { Router } from "express"
import { logoutController, resendOtpController, googleSigninController, googleSignupController, signinController, signupController, verifyOtpController } from "../controllers/auth.js"
import { signupSchema, googleSigninSchema, googleSignupSchema , resendOtpSchema, signinSchema, verifyOtpSchema,  } from "../validation/auth.js"
import { validateRequest, authMiddleware } from "../middlewares/index.js"

const router = Router()

router.post('/signup', validateRequest(signupSchema), signupController)
router.post('/signin', validateRequest(signinSchema), signinController)
router.post('/verify-otp', validateRequest(verifyOtpSchema), verifyOtpController)
router.post('/resend-otp', validateRequest(resendOtpSchema), resendOtpController)
router.post('/google/signup', validateRequest(googleSignupSchema), googleSignupController)
router.post('/google/signin',validateRequest(googleSigninSchema), googleSigninController)
router.post('/logout', authMiddleware, logoutController)

export default router