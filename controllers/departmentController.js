import Department from "../models/Department.js";

// Get all departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find(); // Retrieve all documents
    res.status(200).json({ success: true, departments });
  } catch (error) {
    console.error("Error fetching departments:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Add a new department
export const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    if (!dep_name) {
      return res.status(400).json({ success: false, error: "Department name is required" });
    }

    const department = new Department({ dep_name, description: description || "" }); // Default empty description if not provided
    await department.save();

    res.status(201).json({ success: true, department });
  } catch (error) {
    console.error("Error adding department:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get a single department by ID
export const getDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }
    res.status(200).json({ success: true, department });
  } catch (error) {
    console.error("Error fetching department:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Edit a department
export const editDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { dep_name, description: description || "" }, // Ensure description is updated if provided
      { new: true }
    );
    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }
    res.status(200).json({ success: true, department });
  } catch (error) {
    console.error("Error editing department:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Delete a department
export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }
    res.status(200).json({ success: true, message: "Department deleted successfully" });
  } catch (error) {
    console.error("Error deleting department:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
