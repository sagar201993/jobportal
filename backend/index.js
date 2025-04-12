import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
const app = express();
configDotenv();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the backend server",
  });
});
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the backend project",
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
