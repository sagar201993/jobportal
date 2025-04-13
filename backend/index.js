import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
const app = express();
configDotenv();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
connectDB();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
const PORT = process.env.PORT || 5000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
