const mongoose = require("mongoose");

const unread = new mongoose.Schema(
  {
    unreadMessages: {
      type: String,
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const UnreadMessages = mongoose.model("UnreadMessages", unread);

module.exports = UnreadMessages;
