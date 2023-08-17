import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import helmet from "helmet";
import path from "path";

import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import itemRoutes from "./routes/items.js";
import studentRoutes from "./routes/students.js";
import logsRoutes from "./routes/logs.js";
import cors from "cors";

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet()); // if not used with helmet, cors will not work
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));


// ROUTES
app.use("/auth", authRoutes);
app.use("/items", itemRoutes);
app.use("/students", studentRoutes);
app.use("/logs", logsRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

    // // ADD DATA ONE TIME
    // Product.insertMany(products);
  })
  .catch((err) => console.log(`${err} did not connect}`));