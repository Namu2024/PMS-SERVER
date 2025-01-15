import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  dep_name: {
    type: String,
    required: true, // Name is required
  },
  description: {
    type: String,
    required: false,  // Description is optional
    default: "", // Default to empty string if not provided
  },
});

const Department = mongoose.model("Department", departmentSchema);

export default Department;
