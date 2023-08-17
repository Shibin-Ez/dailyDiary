import Student from "../models/Student.js";
import Log from "../models/Log.js";
import Item from "../models/Item.js";

// CREATE
export const requestMessCut = async (req, res) => {
  try {
    const studentId = req.params.id;
    console.log(req.body);
    const { dateRange, noOfDays, reason } = req.body;
    const messCut = {
      startDate: dateRange.slice(0, 10),
      endDate: dateRange.slice(14, 24),
      noOfDays: parseInt(noOfDays),
      requestedTime: new Date().toLocaleString(),
      reason,
      status: "pending",
    };

    const student = await Student.findById(studentId);
    student.messCuts.push(messCut);

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { messCuts: student.messCuts },
      { new: true }
    );

    res.status(201).json("mess cut requested successfully");
  } catch (err) {
    console.log(err);
    res.status(409).json({ message: err.message });
  }
};

// READ
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getLast10Items = async (req, res) => {
  try {
    const studentId = req.params.id;
    const logs = await Log.find({ studentId: studentId })
      .sort({ createdAt: -1 })
      .limit(10);

    let netAmount = 0;
    const newLogs = [];
    logs.forEach((log) => {
      netAmount += log.price * log.quantity;
      const newLog = {
        id: log._id,
        name: "anything",
        price: log.price,
        quantity: log.quantity,
        createdAt: log.createdAt,
      };

      newLogs.push(newLog);
    });

    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    res.status(200).json({ logs: newLogs, netAmount, date: formattedDate });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getMonthlyStatement = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    let logs = await Log.find({ studentId: studentId });

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentDay = currentDate.getDate();
    const numberOfDays = getDaysInMonth(currentYear, currentMonth);
    let offDays = 0;
    student.messCuts.forEach((date) => {
      // const dateObj = new Date(date);
      const dateMonth = date.getMonth();
      const dateYear = date.getFullYear();
      if (dateMonth === currentMonth && dateYear === currentYear) {
        offDays++;
      }
    });
    const dayCount = currentDay - offDays;

    let netAmount = 0;
    const monthlyLogs = [];
    logs.forEach((log) => {
      netAmount += log.price * log.quantity;

      const itemName = log.itemName ? log.itemName : "no buddy";
      let newLog = {
        id: log._id,
        name: itemName,
        price: log.price,
        quantity: log.quantity,
        createdAt: log.createdAt,
      };

      // console.log(log);

      const logDate = new Date(log.createdAt);
      const logMonth = logDate.getMonth();
      const logYear = logDate.getFullYear();
      if (logMonth === currentMonth && logYear === currentYear)
        monthlyLogs.push(newLog);
    });

    const totalMessFee = dayCount * 150;
    netAmount += totalMessFee;

    res.status(200).json({ monthlyLogs, dayCount, totalMessFee, netAmount });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getMessCuts = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    const formattedMessCuts = [];
    student.messCuts.forEach((messCut) => {
      formattedMessCuts.push({
        dateOfRange: messCut.startDate + " to " + messCut.endDate,
        status: messCut.status,
      });
    });
    const reversedMessCuts = formattedMessCuts.reverse();

    res.status(200).json(reversedMessCuts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllMessCuts = async (req, res) => {
  try {
    const students = await Student.find();
    const pendingMessCuts = [];
    students.forEach((student) => {
      const messCuts = student.messCuts;
      messCuts.forEach((messCut) => {
        if (messCut.status == "pending") {
          // console.log(messCut);
          pendingMessCuts.push({
            startDate: messCut.startDate,
            endDate: messCut.endDate,
            noOfDays: messCut.noOfDays,
            requestedTime: messCut.requestedTime,
            reason: messCut.reason,
            studentName: student.name,
            studentId: student._id,
            regNo: student.regNo,
          });
        }
      });
    });
    res.status(200).json(pendingMessCuts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE
export const approveMessCut = async (req, res) => {
  try { 
    const { id, status } = req.params;
    const student = await Student.findById(id);
    let messCuts = [...student.messCuts];
    console.log(messCuts.length);
    for (let i = messCuts.length - 1; i >= 0; i--) {
      console.log(messCuts[i].status);
      if (messCuts[i].status == "pending") {
        messCuts[i].status = status;
        break;
      }
    }

    

    student.messCuts = messCuts;
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { messCuts: student.messCuts },
      { new: true }
    );
    // console.log(messCuts);

    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

function getDaysInMonth(year, month) {
  // Note that month is 0-based (0 = January, 11 = December)
  return new Date(year, month + 1, 0).getDate();
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
