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

export default Department;
