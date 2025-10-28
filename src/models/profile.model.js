import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brandName: { type: String, required: true },
  headline: { type: String, required: true },
  summary: { type: String, required: true },
  about: { type: String, required: true },
  about2: { type: String, required: true },
  about3: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  linkedin: { type: String, required: true },
  github: { type: String, required: true },
  cvUrl: { type: String, required: true },
  profilePhoto: { type: String, required: true },
});

// We will only have one profile, so we'll just use 'Profile'
export default mongoose.model('Profile', ProfileSchema);

