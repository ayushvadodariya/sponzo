import express from 'express'
import dotenv from 'dotenv'
import { authRouter } from './routes/index.js'
import { connectMongoDb } from './connection.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

await connectMongoDb(process.env.DB_URI)

app.use('/api/v1/auth', authRouter)

app.listen(PORT, ()=>{console.log(`Server started at PORT ${PORT}`)})