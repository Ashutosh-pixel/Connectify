const UnreadMessages = require("../model/unread.model");
const { io, getUserSocketId } = require("../socket/socket");

async function unreadMessage(req, res) {
  try {
    const senderId = req.user._id;

    const newmessages = await UnreadMessages.find({
      recieverId: senderId,
      read: false,
    });

    // const recieverSocketId = getUserSocketId(senderId);
    // if (recieverSocketId) {
    //   io.to(recieverSocketId).emit("recievemessage", newmessages);
    // }

    if (newmessages.length > 0) {
      return res.status(200).json(newmessages);
    } else {
      return res.status(200).json(newmessages);
    }
  } catch (error) {
    return res.status(400).json({
      error: "error in fetching the new messages",
    });
  }
}

module.exports = unreadMessage;
