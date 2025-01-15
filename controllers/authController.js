import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ success: true, user, token });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

export const verify = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};
