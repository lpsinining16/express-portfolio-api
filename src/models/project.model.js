import mongoose from 'mongoose';

// We can embed schemas within other schemas
const CoreFunctionSchema = new mongoose.Schema({
  function: { type: String, required: true },
  description: { type: String, required: true },
});

const SystemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String },
  tags: [{ type: String }],
  link: { type: String },
  coreFunctions: [CoreFunctionSchema], // Embed the core function schema
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['professional', 'personal'], required: true },
  company: { type: String },
  link: { type: String },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  systems: [SystemSchema], // Embed the system schema
});

export default mongoose.model('Project', ProjectSchema);

