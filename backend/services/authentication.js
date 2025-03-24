import jwt from 'jsonwebtoken'

async function createToken(userId){
  const secret = process.env.JWT_SECRET
  const payload = {
    userId 
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