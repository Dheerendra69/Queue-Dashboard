import Queue from "../models/Queue.js";
import Token from "../models/Token.js";

// Create Queue
export const createQueue = async (req, res) => {
  try {
    const queue = await Queue.create({
      name: req.body.name,
      manager: req.user._id,
    });

    res.status(201).json(queue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Queues
export const getQueues = async (req, res) => {
  try {
    const queues = await Queue.find({
      manager: req.user._id,
    }).sort({
      createdAt: -1,
    });

    const data = await Promise.all(
      queues.map(async (queue) => {
        const waitingCount = await Token.countDocuments({
          queue: queue._id,
          status: "waiting",
        });

        return {
          ...queue.toObject(),
          waitingCount,
        };
      })
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Queue By Id
export const getQueue = async (req, res) => {
  try {
    const queue = await Queue.findOne({
      _id: req.params.id,
      manager: req.user._id,
    });

    if (!queue) {
      return res.status(404).json({
        message: "Queue not found",
      });
    }

    res.json(queue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Queue
export const updateQueue = async (req, res) => {
  try {
    const queue = await Queue.findOneAndUpdate(
      {
        _id: req.params.id,
        manager: req.user._id,
      },
      {
        name: req.body.name,
      },
      {
        new: true,
      }
    );

    if (!queue) {
      return res.status(404).json({
        message: "Queue not found",
      });
    }

    res.json(queue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Queue
export const deleteQueue = async (req, res) => {
  try {
    const queue = await Queue.findOne({
      _id: req.params.id,
      manager: req.user._id,
    });

    if (!queue) {
      return res.status(404).json({
        message: "Queue not found",
      });
    }

    await Token.deleteMany({
      queue: queue._id,
    });

    await queue.deleteOne();

    res.json({
      message: "Queue deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};