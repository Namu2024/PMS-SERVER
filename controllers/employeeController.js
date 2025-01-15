<<<<<<< HEAD
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import Department from "../models/Department.js";

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const isValidMime = allowedTypes.test(file.mimetype);
    if (isValidExt && isValidMime) {
      return cb(null, true);
    } else {
      cb(new Error("Only JPEG, JPG, and PNG files are allowed"));
    }
  },
});

// Async error handling wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Validation rules for adding an employee
const employeeValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

// Add Employee
const addEmployee = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const {
    name,
    email,
    employeeId,
    dob,
    gender,
    maritalStatus,
    designation,
    department,
    salary,
    password,
    role,
  } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, error: "User already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
    profileImage: req.file ? req.file.filename : "",
  });
  const savedUser = await newUser.save();

  const newEmployee = new Employee({
    userId: savedUser._id,
    employeeId,
    dob,
    gender,
    maritalStatus,
    designation,
    department,
    salary,
  });
  await newEmployee.save();

  res.status(201).json({ success: true, message: "Employee created successfully" });
});

// Get all employees
const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find()
    .populate("userId", "-password") // Exclude password field
    .populate("department");

  if (!employees || employees.length === 0) {
    return res.status(404).json({ success: false, error: "No employees found" });
  }

  res.status(200).json({ success: true, employees });
});

// Get a specific employee by ID
const getEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findById(id)
    .populate("userId", "-password")
    .populate("department");

  if (!employee) {
    return res.status(404).json({ success: false, error: "Employee not found" });
  }

  res.status(200).json({ success: true, employee });
});

// Update an employee
const updateEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, maritalStatus, designation, department, salary } = req.body;

  const employee = await Employee.findById(id);
  if (!employee) {
    return res.status(404).json({ success: false, error: "Employee not found" });
  }

  await User.findByIdAndUpdate(employee.userId, { name });
  await Employee.findByIdAndUpdate(id, { maritalStatus, designation, department, salary });

  res.status(200).json({ success: true, message: "Employee updated successfully" });
});

// Delete an employee
const deleteEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const employee = await Employee.findByIdAndDelete(id);
  if (!employee) {
    return res.status(404).json({ success: false, error: "Employee not found" });
  }

  await User.findByIdAndDelete(employee.userId);
  res.status(200).json({ success: true, message: "Employee deleted successfully" });
});

// Fetch employees by department ID
const fetchEmployeesByDepId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const employees = await Employee.find({ department: id }).populate("userId", "-password");

  if (!employees || employees.length === 0) {
    return res.status(404).json({ success: false, error: "No employees found in this department" });
  }

  res.status(200).json({ success: true, employees });
});

export {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
  deleteEmployee,
};
=======
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
>>>>>>> bd2da99899dd74910752bfc4d977a2a352625e55
