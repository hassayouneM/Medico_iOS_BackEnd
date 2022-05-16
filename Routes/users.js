
const express = require("express")
const router = express.Router()
const userController = require("../Controllers/userController")


//GET ALL USER
/**
 * @swagger
 * /users:
 *  get:
 *      tags: [Get all users]
 *      description: get the users list
 */
router.route("/").get(userController.getAll);

   
//LOGIN
/**
 * @swagger
 * /users/login:
 *  post:
 *      tags: [Login]
 *      description: login using an email and a password
 *      parameters:
 *          - in: body
 *            name: email
 *            description: the user's email
 *            required: true
 *            example: user@esprit.com
 *          - in: body
 *            name: password
 *            description: the user's password
 *            required: true
 *      responses:
 *          200: 
 *              description: login successfuly
 *          403: 
 *              description: wrong password or email
 */
router.post("/login", userController.login);


//REGISTER
/**
 * @swagger
 * /users/register:
 *  post:
 *      tags: [Registration]
 *      description: if you're a new user you'll have to register
 *      parameters:
 *          - in: body
 *            name: name
 *            description: the user's name
 *            required: true
 *            example: user1
 *          - in: body
 *            name: email
 *            description: the user's email
 *            required: true
 *            example: user1@esprit.com
 *          - in: body
 *            name: password
 *            description: the user's password
 *            required: true
 *          - in: body
 *            name: phone
 *            description: the user's phone number
 *            required: false
 *            schema:
 *              type: integer
 *              default: 0
 *          - in: body
 *            name: address
 *            description: the user's address
 *            required: false
 *            schema:
 *              type: string 
 *          - in: body
 *            name: is_assistant
 *            description: if the user is assistant this is true
 *            required: true 
 *            schema:
 *              type: boolean
 *              default: false       
 *      responses:
 *          200: 
 *              description: Register successfuly
 *          403: 
 *              description: User already exist
 */

router.post("/register", userController.register);


//FIND USER BY ID
/**
 * @swagger
 * /users/findById:
 *  post:
 *      tags: [Find user by Id]
 *      description: finding user using an id
 *      parameters:
 *          - in: body
 *            name: id
 *            description: the user's id that we're trying to find
 *            required: true
 *      responses:
 *          200: 
 *              description: User found
 *          403: 
 *              description: User was not found
 */
router.post("/findById",userController.get);


// FIND USER BY EMAIL
/**
 * @swagger
 * /users/findByEmail:
 *  post:
 *      tags: [Find user by Email]
 *      description: finding user using an email
 *      parameters:
 *          - in: body
 *            name: email
 *            description: the user's email that we're trying to find
 *            required: true
 *      responses:
 *          200: 
 *              description: user found
 *          403: 
 *              description: user was not found
 */

router.post("/findByEmail",userController.getByEmail);


// GET PATIENTS LIST 
/**
 * @swagger
 * /users/getPatients:
 *  post:
 *      tags: [Get Patients]
 *      description: Get all patients for an assistant
 *      parameters:
 *          - in: body
 *            name: id
 *            description: the assistant's id that we're trying to find his/her patients
 *            required: true
 *      responses:
 *          200: 
 *              description: Patient list found
 *          403: 
 *              description: Could not show patients list
 */

router.post("/getPatients", userController.getPatients);


// GET ASSISTANT NAME FROM EMAIL
/**
 * @swagger
 * /users/getAssistantName:
 *  post:
 *      tags: [Get Assistant Name]
 *      description: Get the assistant' name for a patient from the assistant's email
 *      parameters:
 *          - in: body
 *            name: email
 *            description: the assistant's email that we're trying to get his/her name
 *            required: true
 *      responses:
 *          200: 
 *              description: Assistant name found
 *          403: 
 *              description: Could not get assistant name
 */

router.post("/getAssistantName",userController.getAssistantName);


// FORGET PASSWORD
/**
 * @swagger
 * /users/forgetPassword:
 *  post:
 *      tags: [Forget Password]
 *      description: forget password function
 *      parameters:
 *          - in: body
 *            name: codeDeReinit
 *            description: the code you'll recieve in an email to reset the pssword
 *            required: true
 *      responses:
 *          200: 
 *              description: reinitialisation code is sent to your email
 *          403: 
 *              description: User not found
 */

router.post("/forgetPassword",userController.forgetPass);


// RESEND CONFIRMATION EMAIL
/**
 * @swagger
 * /users/reSendConfirmationEmail:
 *  post:
 *      tags: [Resend Confirmation Email]
 *      description: resending a confirmation email to the user for resetting his/her password
 *      parameters:
 *          - in: body
 *            name: email
 *            description: the email that will receive the confirmation email
 *            required: true
 *      responses:
 *          200: 
 *              description: Confirmation email is sent to your email
 *          403: 
 *              description: User not found
 */
router.post("/reSendConfirmationEmail",userController.reSendConfirmationEmail);


router.post("/loginWithSocial",userController.loginWithSocial);


// ADD MEDICINE FOR A PATIENT
/**
 * @swagger
 * /users/addMedicine:
 *  post:
 *      tags: [Add Medicine]
 *      description: Adding a new medicine to a patient
 *      parameters:
 *          - in: body
 *            name: id
 *            description: the patient's id to whom will add a medication
 *            required: true
 *          - in: body
 *            name: name
 *            description: the medication's name
 *            required: true
 *            example: Doliprane 500mg
 *          - in: body
 *            name: category
 *            description: The medicine's categeory
 *            required: true
 *            example: Painkiller
 *          - in: body
 *            name: notif_time
 *            description: the notfication time
 *            required: true
 *          - in: body
 *            name: quantity
 *            description: The medicine's quantity required
 *            required: true
 *          - in: body
 *            name: until
 *            description: The period of time needed for thid medicine
 *            required: true  
 *          - in: body
 *            name: bouA
 *            description: Before or after meals
 *            required: true  
 *      responses:
 *          200: 
 *              description: Medicine added successfully
 *          403: 
 *              description: Could not add medicine
 */
router.post("/addMedicine",userController.AddMedecine);



// GET MEDICINES FOR A PATIENT
/**
 * @swagger
 * /users/getMedicines:
 *  post:
 *      tags: [Get Medicines]
 *      description: Get the medicines list for a patient
 *      parameters:
 *          - in: body
 *            name: id
 *            description: the patient's id
 *            required: true
 *      responses:
 *          200: 
 *              description: Medicines list found
 *          403: 
 *              description: Could not found medicines list
 */

router.post("/getMedicines", userController.getMedicines);


// UPDATE PROFILE
/**
 * @swagger
 * /users/updateProfile:
 *  put:
 *      tags: [Update Profile]
 *      description: Updating the user's profile
 *      parameters:
 *          - in: body
 *            name: name
 *            description: the user's name
 *            required: true
 *            example: user1
 *          - in: body
 *            name: email
 *            description: the user's email
 *            required: true
 *            example: user1@esprit.com
 *          - in: body
 *            name: password
 *            description: the user's password
 *            required: true
 *          - in: body
 *            name: phone
 *            description: the user's phone number
 *            required: false
 *            schema:
 *              type: integer
 *              default: 0
 *          - in: body
 *            name: address
 *            description: the user's address
 *            required: false
 *            schema:
 *              type: string 
 *          - in: body
 *            name: is_assistant
 *            description: if the user is assistant this is true
 *            required: true 
 *            schema:
 *              type: boolean
 *              default: false       
 *      responses:
 *          200: 
 *              description: User updated successfuly
 *          403: 
 *              description: Could not update user
 */

router.put("/updateProfile",userController.updateProfile);


// RESET PASSWORD
/**
 * @swagger
 * /users/resetPass:
 *  put:
 *      tags: [Reset Password]
 *      description: Resetting the user's password
 *      parameters:
 *          - in: body
 *            name: email
 *            description: the user's email that will reset his/her password
 *            required: true
 *          - in: body
 *            name: newPassword
 *            description: the user's new password
 *            required: true
 *      responses:
 *          200: 
 *              description: Password reset successfuly
 *          403: 
 *              description: Could not reset password
 */

router.put("/resetPass",userController.resetPass);


// GET CONFIRMATION EMAIL 
/**
 * @swagger
 * /users/confirmation/:token:
 *  post:
 *      tags: [Confirmation]
 *      description: Get the confirmation token
 *      parameters:
 *          - in: params
 *            name: token
 *            description: the confirmation token
 *            required: true
 *      responses:
 *          200: 
 *              description: Confirmation done
 *          403: 
 *              description: Confirmation not successuful
 */
router.get("/confirmation/:token",userController.confirmation);

//get assistant name by email
router.post("/getNameByEmail",userController.getNameByEmail);

//router.post("/getAssistantName",userController.getAssistantName);

//
//Grt all user for chartttt
router.get("/getusers",userController.index);



module.exports = router