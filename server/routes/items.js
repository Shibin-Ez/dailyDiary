import express from "express";
import { getItems, createItem } from "../controllers/items.js";

const router = express.Router();

// CREATE
router.post("/", createItem);

// READ
router.get("/", getItems);

export default router;