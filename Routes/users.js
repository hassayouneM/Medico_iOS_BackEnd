
const express = require("express")
const router = express.Router()
const userController = require("../Controllers/userController")
const multer = require('multer')
const upload    = require('../middleware/upload')




router.route("/").get(userController.getAll);
   

router.post("/login", userController.login);
router.post("/register", upload.single('image'),userController.register);
router.post("/findById",userController.get);
router.post("/getPatients", userController.getPatients);
router.post("/forgetPassword",userController.forgetPass);
router.post("/reSendConfirmationEmail",userController.reSendConfirmationEmail);
router.post("/addMedicine", upload.single('image'),userController.AddMedecine);
router.post("/editMedicine",userController.EditMedecine);
router.post("/deleteMedicine",userController.deleteMed);
router.post("/getAssistant",userController.getAssistant);
router.put("/updateProfile", upload.single('image'),userController.updateProfile);
router.put("/resetPass",userController.resetPass);
router.get("/confirmation/:token",userController.confirmation);


module.exports = router