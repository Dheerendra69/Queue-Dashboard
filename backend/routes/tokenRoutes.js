import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  addToken,
  getTokens,
  moveTokenUp,
  moveTokenDown,
  serveToken,
  completeToken,
  cancelToken,
} from "../controllers/tokenController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/queue/:queueId", getTokens);

router.post("/:queueId", addToken);

router.patch("/:id/up", moveTokenUp);

router.patch("/:id/down", moveTokenDown);

router.patch("/:id/serve", serveToken);

router.patch("/:id/complete", completeToken);

router.patch("/:id/cancel", cancelToken);

export default router;