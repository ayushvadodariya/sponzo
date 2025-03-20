import mongoose, { Schema } from 'mongoose';

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
  audienceDemographics: {
    age: { type: String },
    gender: { type: String },
    location: { type: String }
  },
  // References back to the base user
  user: {
    type: Schema.Types.ObjectId,
    ref: 'BaseUser',
    required: true
  }
}, { timestamps: true });

const Creator = mongoose.model('Creator', creatorSchema);

export default Creator;