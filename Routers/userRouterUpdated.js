import express from 'express';
import jwt from "jsonwebtoken";
import User from "../models/User.js";   
import bcrypt from "bcrypt";
import { loginControllers, registerControllers, setAvatarController } from '../controllers/userController.js';

const router = express.Router();

router.post("/register", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    // Logic to save the user with hashedPassword
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}); // Closing the register route

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
};

// Add refresh token logic
router.post("/refresh-token", (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  });
});

// Other routes
router.route("/login").post(loginControllers);
router.route("/setAvatar/:id").post(setAvatarController);

export default router;
