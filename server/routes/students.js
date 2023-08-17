import express from "express";
import {
  getStudents,
  getLast10Items,
  getMonthlyStatement,
  getMessCuts,
  requestMessCut,
  getAllMessCuts,
  approveMessCut
} from "../controllers/students.js";
const router = express.Router();

// CREATE
router.post("/:id/messcuts", requestMessCut);

// READ
router.get("/", getStudents);
router.get("/:id/last10", getLast10Items);
router.get("/:id/monthly", getMonthlyStatement);
router.get("/:id/messcuts", getMessCuts);
router.get("/messcuts", getAllMessCuts);

// UPDATE
router.patch("/:id/messcuts/:status", approveMessCut)

export default router;
