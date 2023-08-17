import jwt from "jsonwebtoken";
import Student from "../models/Student.js";

// REGISTER STUDENT
export const registerStudent = async (req, res) => {
  try {
    const { name, regNo, dateOfBirth, balance } = req.body.userData;
    const newStudent = new Student({ name, regNo, dateOfBirth, balance });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

// LOGIN STUDENT
export const loginStudent = async (req, res) => {
  try {
    const { regNo, dateOfBirth } = req.body;
    console.log(req.body);
    const studentFirst = await Student.findOne({ dateOfBirth: dateOfBirth });
    // console.log(student);
    if (!studentFirst) return res.status(400).json({ msg: "Student does not exist" });

    if (dateOfBirth !== studentFirst.dateOfBirth){
      console.log("getting null bruh");
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    
    // const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);

    const student = {
      _id: studentFirst._id,
      name: studentFirst.name,
      regNo: studentFirst.regNo,
      hostel: "MHB2",
      roomNo: "5A51",
      mess: "MHB2-II",
      
      balance: studentFirst.balance,
    };

    console.log(student);
    res.status(200).json({ student })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
