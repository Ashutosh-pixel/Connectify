const Message = require("../model/message.model");

async function getMessage(req, res) {
  try {
    const { recieverId } = req.params;
    const senderId = req.user._id;

    const messagesA = await Message.findOne({ senderId, recieverId });
    const messagesB = await Message.findOne({
      senderId: recieverId,
      recieverId: senderId,
    });

    if (messagesA || messagesB) {
      return res.status(200).json({
        senderMessage: messagesA ? messagesA.message : null,
        recieverMessage: messagesB ? messagesB.message : null,
      });
    }

    return res.status(200).json({
      blankmessage: "Send a message to start the conversation",
      senderMessage: null,
      recieverMessage: null,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Message not able to get",
    });
  }
}

module.exports = getMessage;
