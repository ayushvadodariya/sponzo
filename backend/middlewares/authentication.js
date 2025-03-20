import { validateToken } from "../services/authentication.js"
import { z } from 'zod'

// Define validation schema for JWT tokens
const tokenSchema = z.string({
  required_error: "Authentication token is required",
  invalid_type_error: "Authentication token must be a string"
}).min(1, "Token cannot be empty")

async function authMiddleware(req, res, next) {
  try {
    if (!req.cookies?.token) {
      return res.status(401).json({ 
        status: "error",
        message: "Authentication required",
        authenticated: false
      });
    }
    
    const cookieResult = tokenSchema.safeParse(req.cookies.token);
    if (!cookieResult.success) {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      });
      
      return res.status(401).json({ 
        status: "error",
        message: "Invalid authentication token format",
        authenticated: false
      });
    }
    
    try {
      const user = await validateToken(cookieResult.data);
      req.user = user;
      next();
    } catch (error) {
      // Clear the invalid token cookie
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      });
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          status: "error",
          message: "Session expired. Please sign in again.",
          authenticated: false
        });
      } else {
        return res.status(401).json({ 
          status: "error",
          message: "Invalid authentication token",
          authenticated: false
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Server error during authentication",
      errors: [{ message: error.message }]
    });
  }
}

export default authMiddleware