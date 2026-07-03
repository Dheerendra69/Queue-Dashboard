import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createQueue,
  deleteQueue,
  getQueue,
  getQueues,
  updateQueue,
} from "../controllers/queueController.js";

const router = express.Router();

router.use(authMiddleware);

router.route("/")
  .get(getQueues)
  .post(createQueue);

router.route("/:id")
  .get(getQueue)
  .put(updateQueue)
  .delete(deleteQueue);

export default router;