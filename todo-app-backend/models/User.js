// models/User.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  picture: String,
  googleId: String,
});

const User = mongoose.model('User', userSchema);

export default User;
