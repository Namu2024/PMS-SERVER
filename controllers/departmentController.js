import Department from "../models/Department.js";

// Get all departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json({ success: true, departments });
  } catch (error) {
    console.error(`Error fetching departments: ${error.message}`);
    res.status(500).json({ success: false, error: "Server error while fetching departments." });
  }
};

// Add a new department
export const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    if (!dep_name?.trim() || !description?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Both department name and description are required.",
      });
    }

    const newDepartment = new Department({ dep_name: dep_name.trim(), description: description.trim() });
    await newDepartment.save();

    res.status(201).json({
      success: true,
      department: newDepartment,
      message: "Department added successfully!",
    });
  } catch (error) {
    console.error(`Error adding department: ${error.message}`);
    res.status(500).json({ success: false, error: "Server error while adding the department." });
  }
};

// Get a single department by ID
export const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found." });
    }

    res.status(200).json({ success: true, department });
  } catch (error) {
    console.error(`Error fetching department: ${error.message}`);
    res.status(500).json({ success: false, error: "Server error while fetching the department." });
  }
};

// Edit an existing department
export const editDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;

    if (!dep_name?.trim() || !description?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Both department name and description are required.",
      });
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { dep_name: dep_name.trim(), description: description.trim() },
      { new: true, runValidators: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({ success: false, error: "Department not found." });
    }

    res.status(200).json({
      success: true,
      department: updatedDepartment,
      message: "Department updated successfully!",
    });
  } catch (error) {
    console.error(`Error updating department: ${error.message}`);
    res.status(500).json({ success: false, error: "Server error while updating the department." });
  }
};

// Delete an existing department
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByIdAndDelete(id);

    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found." });
    }

    res.status(200).json({
      success: true,
      message: "Department deleted successfully!",
    });
  } catch (error) {
    console.error(`Error deleting department: ${error.message}`);
    res.status(500).json({ success: false, error: "Server error while deleting the department." });
  }
};
