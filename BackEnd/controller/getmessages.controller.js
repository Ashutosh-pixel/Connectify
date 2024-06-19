const Message = require("../model/message.model");

async function getMessage(req, res) {
  try {
    const { recieverId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.findOne({ senderId, recieverId });
    if (messages) {
      return res.status(200).json({
        message: messages,
      });
    }

    return res.status(200).json({
      blankmessage: "Send a message to start the conversation",
    });
  } catch (error) {
    res.status(400).json({
      error: "Message not able to get",
    });
  }
}

module.exports = getMessage;
