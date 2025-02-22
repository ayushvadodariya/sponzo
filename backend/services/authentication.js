import jwt from 'jsonwebtoken'
import { User } from "../models/index.js"

async function createToken(userId){
  const secret = process.env.JWT_SECRET
  const user = await User.findById(userId, { password: 0})
  const payload = {
    userId: user._id
  }
  const token = await  jwt.sign(payload, secret)
  return token
}

async function validateToken(token){
  const secret = process.env.JWT_SECRET
  const payload = await jwt.decode(token, secret)
  return payload
}

export { createToken, validateToken}