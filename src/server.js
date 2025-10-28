import 'dotenv/config'; // Load .env file
import app from './app.js';
import connectDB from './config/database.js'; // Import DB connection function

const PORT = process.env.PORT || 3000;

// --- THIS IS THE FIX ---
// We create a new function to start the server
// so we can use 'await'
const startServer = async () => {
  try {
    // 1. Wait for the database connection to be successful
    await connectDB();

    // 2. ONLY AFTER connecting, start the Express server
    app.listen(PORT, () => {
      console.log(`✅ Server is listening on http://localhost:${PORT}`);
      console.log(`📚 API docs available at http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error('❌ Failed to start server after DB connection failed.');
    console.error(err);
    process.exit(1);
  }
};

// Run the server start function
startServer();

