const Message = require("../model/message.model");

async function getMessage(req, res) {
  try {
    const { recieverId } = req.params;
    const senderId = req.user._id;

    const messagesA = await Message.find({ senderId, recieverId });
    const messagesB = await Message.find({
      senderId: recieverId,
      recieverId: senderId,
    });

    console.log("messagesA = ", messagesA);
    console.log("messagesB = ", messagesB);

    if (messagesA.length > 0 || messagesB.length > 0) {
      return res.status(200).json({
        senderMessage: messagesA ? messagesA : null,
        recieverMessage: messagesB ? messagesB : null,
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
