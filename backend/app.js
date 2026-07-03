import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import queueRoutes from "./routes/queueRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

app.use(cors({
    origin: ["https://queue-brd.netlify.app/"]
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Queue Management API Running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/queues", queueRoutes);

app.use("/api/tokens", tokenRoutes);

app.use("/api/dashboard", dashboardRoutes);

export default app;
