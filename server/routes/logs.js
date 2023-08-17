import express from "express";
import { getLogs, createLog } from "../controllers/logs.js";

const router = express.Router();

// CREATE
router.post("/", createLog);

// READ
router.get("/", getLogs);

export default router;