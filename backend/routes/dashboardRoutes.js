import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getDashboardStats,
  getQueueTrends,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getDashboardStats);

router.get("/trends", getQueueTrends);

export default router;