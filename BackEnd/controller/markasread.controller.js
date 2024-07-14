const UnreadMessages = require("../model/unread.model");

async function markAsRead(req, res) {
  try {
    const senderId = req.user._id;
    const { userId } = req.body;
    await UnreadMessages.updateMany(
      { recieverId: senderId, senderId: userId },
      { $set: { read: true } }
    );
    return res.status(200).json({ respond: "MESSAGE READ" });
  } catch (error) {
    return res.status(400).json({
      error: "Message not able to markasread",
    });
  }
}

module.exports = markAsRead;
