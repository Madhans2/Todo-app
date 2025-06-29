// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import taskRoutes from './routes/tasks.js';
import authRoutes from './routes/auth.js'; // Google login route
import noteRoutes from './routes/notes.js';
import userRoutes from './routes/user.js';



dotenv.config(); // ✅ Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes); // POST /api/auth/google
app.use('/api/notes', noteRoutes);
app.use('/api/user', userRoutes);



// ✅ Default Route (optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});
