const Message = require("../model/message.model");

async function sendMessage(req, res) {
  try {
    const { message } = req.body;
    const { recieverId } = req.params;
    const senderId = req.user._id;

    console.log(message, recieverId, senderId);

    const messagedata = await Message.create({
      message: message,
      senderId: senderId,
      recieverId: recieverId,
    });

    console.log(messagedata);

    res.status(200).json({
      message: "data send👍👍",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
}

module.exports = sendMessage;
