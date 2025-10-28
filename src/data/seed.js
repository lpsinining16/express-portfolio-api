import mongoose from 'mongoose';
import 'dotenv/config'; // Make sure to import this to read .env

// Import all your models
import NavLink from '../models/navLink.model.js';
import Profile from '../models/profile.model.js';
import Project from '../models/project.model.js';
import Skill from '../models/skill.model.js';
import WorkExperience from '../models/workExperience.model.js';

// Import the mock data
import { mockData } from './mockData.js';

/**
 * Connects to MongoDB, wipes all existing data,
 * and inserts the mock data.
 */
const seedDatabase = async () => {
  try {
    // --- 1. CONNECT TO DB ---
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in .env file. Check your .env file.');
    }
    await mongoose.connect(mongoURI);
    console.log('🌱 Connected to MongoDB for seeding...');

    // --- 2. WIPE EXISTING DATA ---
    // This prevents duplicating data every time you run the seed
    console.log('🧹 Wiping existing data...');
    await NavLink.deleteMany({});
    await Profile.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await WorkExperience.deleteMany({});

    // --- 3. INSERT MOCK DATA ---
    // We insert data for each model
    console.log('🚚 Inserting NavLinks...');
    await NavLink.insertMany(mockData.navLinks);

    console.log('🚚 Inserting Profile...');
    // Note: Use .create for a single object, .insertMany for arrays
    await Profile.create(mockData.profile);

    console.log('🚚 Inserting Projects...');
    await Project.insertMany(mockData.projects);

    console.log('🚚 Inserting Skills...');
    await Skill.insertMany(mockData.skills);

    console.log('🚚 Inserting Work Experience...');
    await WorkExperience.insertMany(mockData.workExperience);

    console.log('\n✅ Database seeded successfully!');
  } catch (error) {
    console.error('\n❌ Error seeding database:', error.message);
  } finally {
    // --- 4. DISCONNECT ---
    // Always close the connection
    await mongoose.disconnect();
    console.log('🌱 Disconnected from MongoDB.');
  }
};

// Run the seeder function
seedDatabase();

