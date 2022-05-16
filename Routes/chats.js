const express = require("express")
const router = express.Router()

const MessageController = require("../Controllers/chatController")


//GET ALL CONVERSATIONS
/**
 * @swagger
 * /chat/:
 *  get:
 *      tags: [Get all conversations]
 *      description: get all the conversations
 */

router.get("/", MessageController.getAllConversations)


//GET ALL MESSAGES
/**
 * @swagger
 * /chat/tout-messages:
 *  get:
 *      tags: [Get all messages]
 *      description: get the user's messages
 */

router.get("/tout-messages", MessageController.getAllMessages)


//GET ALL MESSAGES
/**
 * @swagger
 * /chat/my-conversations:
 *  post:
 *      tags: [Get my conversation]
 *      description: get the user's conversations
 *      parameters:
 *          - in: body
 *            name: sender
 *            description: the sender's id
 *            required: true
 *      responses:
 *          200: 
 *              description: Conversation found successfuly
 *          403: 
 *              description: Could not found conversation
 */

router.post("/my-conversations", MessageController.getMyConversations)


// GET A USER'S MESSAGES
/**
 * @swagger
 * /chat/my-messages:
 *  post:
 *      tags: [Get my messages]
 *      description: get the user's messages
 *      parameters:
 *          - in: body
 *            name: senderConversation
 *            description: the sender conversation's id
 *            required: true
 *          - in: body
 *            name: receiverConversation
 *            description: the receiver Conversation's id
 *            required: true
 *      responses:
 *          200: 
 *              description: Messages found successfuly
 *          403: 
 *              description: Could not found messages
 */

router.post("/my-messages", MessageController.getMyMessages)


// CREATE A NEW CONVERSATION
/**
 * @swagger
 * /chat/creer-conversation:
 *  post:
 *      tags: [Create a conversation]
 *      description: create a new conversation
 *      parameters:
 *          - in: body
 *            name: sender
 *            description: the sender's id
 *            required: true
 *          - in: body
 *            name: receiver
 *            description: the receiver's id
 *            required: true
 *      responses:
 *          200: 
 *              description: Conversation created successfuly
 *          403: 
 *              description: Could not create conversation
 */

router.post("/creer-conversation", MessageController.creerNouvelleConversation)


// SEND A MESSAGE
/**
 * @swagger
 * /chat/envoyer-message:
 *  post:
 *      tags: [Send a message]
 *      description: send a new message
 *      parameters:
 *          - in: body
 *            name: sender
 *            description: the sender's id
 *            required: true
 *          - in: body
 *            name: receiver
 *            description: the receiver's id
 *            required: true
 *          - in: body
 *            name: description
 *            description: the message description
 *            required: true
 *      responses:
 *          200: 
 *              description: Message send successfuly
 *          403: 
 *              description: Could not send message
 */

router.post("/envoyer-message", MessageController.envoyerMessage)


// DELETE ALL MESSAGE
/**
 * @swagger
 * /chat/deleteAll:
 *  delete:
 *      tags: [Delete all conversations]
 *      description: delet all user's conversation
 */

router.delete("/deleteAll", MessageController.deleteAll)

module.exports = router