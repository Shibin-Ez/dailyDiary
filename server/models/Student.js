import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  regNo: {
    type: String,
    required: true,
    min: 9,
    max: 9,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  logs: {
    type: Array,
    default: [],
  },
  messCuts: {
    type: Array,
    default: [],
  },
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
