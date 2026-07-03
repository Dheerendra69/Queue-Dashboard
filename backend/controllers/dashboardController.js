import Queue from "../models/Queue.js";
import Token from "../models/Token.js";

export const getDashboardStats = async (req, res) => {
  try {
    const queues = await Queue.find({
      manager: req.user._id,
    });

    const queueIds = queues.map((q) => q._id);

    const totalQueues = queues.length;

    const waitingTokens = await Token.countDocuments({
      queue: { $in: queueIds },
      status: "waiting",
    });

    const serving = await Token.countDocuments({
      queue: { $in: queueIds },
      status: "serving",
    });

    const completedToday = await Token.countDocuments({
      queue: { $in: queueIds },
      status: "completed",
      completedAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    });

    const completedTokens = await Token.find({
      queue: { $in: queueIds },
      status: "completed",
      startedAt: { $ne: null },
      completedAt: { $ne: null },
    });

    let averageWaitTime = 0;

    if (completedTokens.length) {
      const totalMinutes = completedTokens.reduce(
        (sum, token) => {
          return (
            sum +
            (token.completedAt - token.joinedAt) /
              (1000 * 60)
          );
        },
        0
      );

      averageWaitTime =
        totalMinutes / completedTokens.length;
    }

    res.json({
      totalQueues,
      waitingTokens,
      serving,
      completedToday,
      averageWaitTime: Number(
        averageWaitTime.toFixed(2)
      ),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getQueueTrends = async (req, res) => {
  try {
    const queues = await Queue.find({
      manager: req.user._id,
    });

    const result = [];

    for (const queue of queues) {
      const queueLength =
        await Token.countDocuments({
          queue: queue._id,
          status: "waiting",
        });

      result.push({
        date: queue.name,
        queueLength,
      });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};