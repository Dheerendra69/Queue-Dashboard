import Queue from "../models/Queue.js";
import Token from "../models/Token.js";

// Add Person / Generate Token
export const addToken = async (req, res) => {
  try {
    const { customerName } = req.body;
    const queueId = req.params.queueId;

    const queue = await Queue.findOne({
      _id: queueId,
      manager: req.user._id,
    });

    if (!queue) {
      return res.status(404).json({
        message: "Queue not found",
      });
    }

    const lastToken = await Token.findOne({
      queue: queueId,
    }).sort({
      tokenNumber: -1,
    });

    const tokenNumber = lastToken
      ? lastToken.tokenNumber + 1
      : 1;

    const waitingCount = await Token.countDocuments({
      queue: queueId,
      status: "waiting",
    });

    const token = await Token.create({
      queue: queueId,
      customerName,
      tokenNumber,
      position: waitingCount + 1,
    });

    res.status(201).json(token);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Queue Tokens
export const getTokens = async (req, res) => {
  try {
    const tokens = await Token.find({
      queue: req.params.queueId,
    }).sort({
      position: 1,
    });

    res.json(tokens);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Move Token Up
export const moveTokenUp = async (req, res) => {
  try {
    const token = await Token.findById(req.params.id);

    if (!token) {
      return res.status(404).json({
        message: "Token not found",
      });
    }

    if (token.position === 1) {
      return res.json(token);
    }

    const previous = await Token.findOne({
      queue: token.queue,
      position: token.position - 1,
      status: "waiting",
    });

    if (!previous) {
      return res.json(token);
    }

    previous.position++;

    token.position--;

    await previous.save();

    await token.save();

    res.json(token);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Move Token Down
export const moveTokenDown = async (req, res) => {
  try {
    const token = await Token.findById(req.params.id);

    if (!token) {
      return res.status(404).json({
        message: "Token not found",
      });
    }

    const next = await Token.findOne({
      queue: token.queue,
      position: token.position + 1,
      status: "waiting",
    });

    if (!next) {
      return res.json(token);
    }

    next.position--;

    token.position++;

    await next.save();

    await token.save();

    res.json(token);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Serve Next Token
export const serveToken = async (req, res) => {
  try {
    const token = await Token.findById(req.params.id);

    if (!token) {
      return res.status(404).json({
        message: "Token not found",
      });
    }

    token.status = "serving";
    token.startedAt = new Date();

    await token.save();

    // Reorder remaining waiting tokens
    const waitingTokens = await Token.find({
      queue: token.queue,
      status: "waiting",
    }).sort({
      position: 1,
    });

    for (let i = 0; i < waitingTokens.length; i++) {
      waitingTokens[i].position = i + 1;
      await waitingTokens[i].save();
    }

    res.json(token);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Complete Service
export const completeToken = async (req, res) => {
  try {
    const token = await Token.findById(req.params.id);

    if (!token) {
      return res.status(404).json({
        message: "Token not found",
      });
    }

    token.status = "completed";
    token.completedAt = new Date();

    await token.save();

    res.json(token);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Cancel Token
export const cancelToken = async (req, res) => {
  try {
    const token = await Token.findById(req.params.id);

    if (!token) {
      return res.status(404).json({
        message: "Token not found",
      });
    }

    token.status = "cancelled";

    await token.save();

    // Reorder waiting tokens
    const waitingTokens = await Token.find({
      queue: token.queue,
      status: "waiting",
    }).sort({
      position: 1,
    });

    for (let i = 0; i < waitingTokens.length; i++) {
      waitingTokens[i].position = i + 1;
      await waitingTokens[i].save();
    }

    res.json(token);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};