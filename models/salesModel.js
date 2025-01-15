// models/Sales.js
import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  leadTime: {
    type: Date,
    required: true,
  },
  contactTime: {
    type: Date,
    required: true,
  },
  totalProcessTime: {
    type: Number,
    required: true,
  },
  creditPoints: {
    type: Number,
    required: true,
  },
});

const Sales = mongoose.model("Sales", salesSchema);

export default Sales;
