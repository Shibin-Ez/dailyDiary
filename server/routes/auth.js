import express from "express";
import { registerStudent, loginStudent } from "../controllers/auth.js";

const router = express.Router();

// CREATE
router.post("/register", registerStudent);

// GET
router.post("/login", loginStudent);

export default router;