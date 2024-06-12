const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    sellerId: {
      type: String,
      required: true,
      unique: true,
    },
    buyerId: {
      type: String,
      required: true,
      unique: true,
    },
    readBySeller: {
      type: String,
      required: true,
    },
    readByBuyer: {
      type: String,
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports= mongoose.model("Conversation", conversationSchema);
