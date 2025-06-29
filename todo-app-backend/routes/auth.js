// routes/authRoutes.js (or /api/auth.js)

import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // ✅ .js required in ESM

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ✅ POST /api/auth/google
router.post('/google', async (req, res) => {
  const { token } = req.body;

  try {
    // ✅ Verify token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    // ✅ Check if user exists or create one
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        picture,
        googleId,
      });
      await user.save();
    }

    // ✅ Generate JWT token
    const authToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // ✅ Respond with token and user info
    res.status(200).json({
      success: true,
      token: authToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(401).json({ success: false, message: "Invalid Google token" });
  }
});

export default router;
