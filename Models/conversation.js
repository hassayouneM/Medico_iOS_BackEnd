const mongoose = require("mongoose")

const ConversationSchema = new mongoose.Schema(
  {
    lastMessage : {type: String}, 
    lastMessageDate : {type: Date}, 
    sender : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    receiver : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)
module.exports = mongoose.model("Conversation", ConversationSchema)