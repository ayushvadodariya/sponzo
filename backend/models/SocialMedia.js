import mongoose, { Schema } from 'mongoose'

const SocialMediaSchema = new Schema({
  platform: { type: String, required: true },
  link: { type: String, unique: true, required: true }
}, { timestamps: true })

const SocialMedia = mongoose.model('SocialMedia', SocialMediaSchema)
export default SocialMedia
