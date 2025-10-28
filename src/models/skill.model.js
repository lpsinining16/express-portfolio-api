import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  technologies: [{ type: String, required: true }],
});

export default mongoose.model('Skill', SkillSchema);

