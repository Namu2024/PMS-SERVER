import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

// Multer config for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

const addEmployee = async (req, res) => {
  try {
    const { name, email, employeeId, department, salary, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !employeeId || !department || !salary || !password || !role) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists." });

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage: req.file?.filename || null, // Save uploaded image filename
    });

    // Create employee record
    await Employee.create({
      userId: newUser._id,
      employeeId,
      department,
      salary,
      profileImage: req.file?.filename || null,
    });

    res.status(201).json({ success: true, message: "Employee added successfully." });
  } catch (error) {
    console.error("Error in addEmployee:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export { addEmployee, upload };
