import mongoose, { Schema } from 'mongoose'

const sponsorSchema = new Schema({
  companyName: { type: String },
  companyLogo: { type: String },
  industry: { type: String },
  companySize: { type: String },
  bio: { type: String },
  locationId: { type: Schema.Types.ObjectId, ref: 'Location' },
  website: { type: String },
  socialMediaLinks: {
    linkedin: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    facebook: { type: String },
  },
  targetAudience: {
    demographics: { type: String },
    interests: [{ type: String }]
  },
  campaignPreferences: {
    budgetRange: { type: String },
    preferredContentTypes: [{ type: String }]
  },
  // References back to the base user
  user: {
    type: Schema.Types.ObjectId,
    ref: 'BaseUser',
    required: true
  }
}, { timestamps: true })

const Sponsor = mongoose.model('Sponsor', sponsorSchema)

export default Sponsor
