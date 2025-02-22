import express from 'express'
import dotenv from 'dotenv'
import { authRouter } from './routes/index.js'
import { connectMongoDb } from './connection.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

await connectMongoDb(process.env.DB_URI)

app.use('/api/v1/auth', authRouter)

app.listen(PORT, ()=>{console.log(`Server started at PORT ${PORT}`)})