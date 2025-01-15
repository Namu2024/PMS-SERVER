<<<<<<< HEAD
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
=======
import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
  {
    dep_name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    description: { 
      type: String, 
      required: true, 
      trim: true 
    },
  },
  { 
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const Department = mongoose.model('Department', departmentSchema);
>>>>>>> bd2da99899dd74910752bfc4d977a2a352625e55

export default Department;
