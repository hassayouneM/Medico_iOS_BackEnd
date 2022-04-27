const Message = require("../models/message")
const Conversation = require("../models/conversation")

// Get All conversations
exports.getAllConversations = async (req, res) => {
    res.send({ conversations: await Conversation.find() })
}

// Get All Messages
exports.getAllMessages = async (req, res) => {
    res.send({ messages: await Message.find() })
}

// Get My Conversations
exports.getMyConversations = async (req, res) => {
    res.send({ conversations: await Conversation.find({ "sender": req.body.sender }).populate("sender receiver") })
}

// Get My messages
exports.getMyMessages = async (req, res) => {
    res.send({
        messages: await Message.find(
            {
                $or: [{ 'senderConversation': req.body.conversation }, { 'receiverConversation': req.body.conversation }]
            }
        ).populate("senderConversation receiverConversation")
    })
}



