import mongoose, { Schema } from 'mongoose'
import crypto from 'crypto'

const creatorSchema = new Schema({
  name: { type: String },
  bio: { type: String },
  introVideo: { type: String },
  locationId: { type: Schema.Types.ObjectId, ref: 'Location' },
  socialmediaAccounts: [{ type: Schema.Types.ObjectId, ref: 'SocialMedia' }],
  keywords: { type: [String] },
  // Creator-specific fields
  niche: { type: String },
  contentTypes: [{ type: String }],
  socialMediaHandles: {
    instagram: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    youtube: { type: String },
  },
  audienceDemographics: {
    age: { type: String },
    gender: { type: String },
    location: { type: String }
  },
  publicId: {
    type: String,
    unique: true,
    default: () => `cre_${crypto.randomBytes(16).toString('hex')}`,
    immutable: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'BaseUser',
    required: true
  },
}, { timestamps: true })

// Method to safely return creator info
creatorSchema.methods.toPublicJSON = function() {
  return {
    id: this.publicId,
    bio: this.bio,
    niche: this.niche,
    contentTypes: this.contentTypes,
    socialMediaHandles: this.socialMediaHandles,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  }
}

const Creator = mongoose.model('Creator', creatorSchema)

export default Creator