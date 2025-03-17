import mongoose from "mongoose";
import express from "express";
import { dbConnection } from "./src/services/db.config.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const port = 8000;
dbConnection();
app.use("/api", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comments", commentRoutes);
app.get("/", (req, res) => {
  res.send("App up and running...");
});
app.listen(port, () => {
  console.log(`🚀App running on port: ${port}`);
});
