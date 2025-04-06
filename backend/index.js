// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// utilities
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 4000;
connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));
