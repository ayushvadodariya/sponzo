import mongoose, { Schema } from 'mongoose'

const LocationSchema = new Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  area: { type: String }
}, { timestamps: true })

const Location = mongoose.model('Location', LocationSchema)
export default Location