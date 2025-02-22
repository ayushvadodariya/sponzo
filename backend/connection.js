import mongoose from "mongoose"

async function connectMongoDb(uri){
  try{
    await mongoose.connect(uri, {
      connectTimeoutMS: 10000
    })
    console.log('Connected to MongoDB')
  } catch(error){
      console.error('Error connecting to MongoDB:', error)
      process.exit(1)
  }
}

export { connectMongoDb }