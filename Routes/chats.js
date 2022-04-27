const express = require("express")
const router = express.Router()
const chatController = require("../controllers/chatController")

router.get("/", chatController.getAllConversations)
router.get("/allMessages", chatController.getAllMessages)
router.post("/myConversations", chatController.getMyConversations)
router.post("/myMessages", chatController.getMyMessages)

module.exports = router