import mongoose from 'mongoose';

const WorkExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  points: [{ type: String, required: true }],
  isDevRole: { type: Boolean, required: true },
});

export default mongoose.model('WorkExperience', WorkExperienceSchema);

