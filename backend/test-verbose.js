const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URL;

async function testVerbose() {
  try {
    console.log("Connecting to:", uri.replace(/:([^@]+)@/, ":****@")); // Mask password
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected successfully!");
    process.exit(0);
  } catch (err) {
    console.error("ERROR NAME:", err.name);
    console.error("ERROR MESSAGE:", err.message);
    if (err.reason) console.error("REASON:", JSON.stringify(err.reason, null, 2));
    if (err.code) console.error("CODE:", err.code);
    process.exit(1);
  }
}

testVerbose();
