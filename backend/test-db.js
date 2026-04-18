const mongoose = require('mongoose');
const dns = require('dns');

// Set DNS servers early to resolve MongoDB Atlas SRV records
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
  console.log("DNS servers set successfully");
} catch (e) {
  console.warn("Failed to set DNS servers:", e.message);
}

require('dotenv').config();

const uri = process.env.MONGO_URL;
console.log('Testing connection to URI Length:', uri ? uri.length : 0);

async function testConnection() {
  try {
    console.log("Attempting connect...");
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Successfully connected to MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('--- CONNECTION FAILURE ---');
    console.error('NAME:', err.name);
    console.error('MESSAGE:', err.message);
    console.error('CODE:', err.code);
    if (err.message.includes('ENOTFOUND')) {
      console.error('REASON: DNS resolution failed. SRV records not found.');
    }
    if (err.message.includes('ECONNREFUSED')) {
      console.error('REASON: Connection refused. Check if port 27017 is open and IP is whitelisted.');
    }
    process.exit(1);
  }
}

testConnection();

