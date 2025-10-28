import mongoose from 'mongoose';

// Define the schema for the NavLink
const NavLinkSchema = new mongoose.Schema({
  label: { type: String, required: true },
  fragment: { type: String, required: true },
  isContact: { type: Boolean, default: false },
});

// Create and export the Mongoose model
// 'NavLink' will be the name of the collection (pluralized to 'navlinks')
export default mongoose.model('NavLink', NavLinkSchema);

