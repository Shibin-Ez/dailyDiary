import Item from "../models/Item.js";
import Log from "../models/Log.js";
import Student from "../models/Student.js";

// CREATE
export const createLog = async (req, res) => {
  try {
    console.log(req.body);
    const { regNo, itemId, itemName, quantity } = req.body;
    const student = await Student.findOne({ regNo: regNo });
    // if(student) console.log("student found");
    // else console.log("student not found");
    const studentId = student._id;
    const item = await Item.findById(itemId);
    const price = item.price;
    const newLog = new Log({ studentId, itemId, itemName, quantity, price });
    const savedLog = await newLog.save();

    // also updating the balance from database student
    student.balance = student.balance - price * quantity;
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      {
        balance: student.balance,
      },
      { new: true }
    );

    res.status(201).json(savedLog);
  } catch (err) {
    res.status(409).json({ message: err.message });
    console.log(err);
  }
};

// READ
export const getLogs = async (req, res) => {
  try {
    const logs = await Log.find();
    res.status(200).json(logs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
