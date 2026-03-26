require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Allows your HTML file to talk to this server

// Connect to MongoDB
console.log("Your URI is:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.error("❌ Connection error:", err));

// Define a simple Schema (Structure for your data)
const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});
const User = mongoose.model('User', UserSchema);

// API Route: Get all users
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// API Route: Add a user
app.post('/add-user', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ message: "User saved!" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));