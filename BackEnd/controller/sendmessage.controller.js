const Message = require("../model/message.model");
const { getUserSocketId } = require("../socket/socket");
const { io } = require("../socket/socket");

async function sendMessage(req, res) {
  try {
    const { message } = req.body;
    const { recieverId } = req.params;
    const senderId = req.user._id;

    console.log(message, recieverId, senderId);

    // const messagesarray = await Message.find({ senderId, recieverId });

    // console.log(messagesarray);

    // if (messagesarray) {
    //   const newmessage = messagesarray;
    //
    //   // await Message.updateOne(
    //   //   { recieverId, senderId },
    //   //   { message: newmessage }
    //   // );
    //
    //   //socket
    //   // const recieverSocketId = getUserSocketId(recieverId);
    //   // if (recieverSocketId) {
    //   //   io.to(recieverSocketId).emit("newmessage", message);
    //   // }
    //   // console.log("recieverSocketId = ",recieverSocketId)
    //
    //   // return res.status(200).json({
    //   //   message: newmessage,
    //   // });
    // }

    const messagedata = await Message.create({
      message,
      senderId,
      recieverId,
    });

    console.log("messagedata = ", messagedata);

    // //socket
    // const recieverSocketId = getUserSocketId(recieverId);
    // if (recieverSocketId) {
    //   io.to(recieverSocketId).emit("newmessage", message);
    // }
    // console.log("recieverSocketId = ",recieverSocketId)

    res.status(200).json({
      message: "message sent",
    });
  } catch (error) {
    res.status(400).json({
      error: "Message not able to send",
    });
  }
}

module.exports = sendMessage;
