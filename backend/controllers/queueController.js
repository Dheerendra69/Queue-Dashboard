import Queue from "../models/Queue.js";
import Token from "../models/Token.js";

export const createQueue = async (req, res) => {
  try {
    const { name } = req.body;

    const existingQueue = await Queue.findOne({
      name: name.trim(),
      manager: req.user._id,
    });

    if (existingQueue) {
      return res.status(409).json({
        success: false,
        message: "A queue with this name already exists.",
      });
    }

    const queue = await Queue.create({
      name: name.trim(),
      manager: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: queue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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