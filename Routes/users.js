
const express = require("express")
const router = express.Router()
const userController = require("../Controllers/userController")

router.route("/").get(userController.getAll);
   

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/findById",userController.get);
router.post("/findByEmail",userController.getByEmail);
router.post("/getPatients", userController.getPatients);
router.post("/getAssistantName",userController.getAssistantName);
router.post("/forgetPassword",userController.forgetPass);
router.post("/reSendConfirmationEmail",userController.reSendConfirmationEmail);
router.post("/loginWithSocial",userController.loginWithSocial);
router.post("/addMedicine",userController.AddMedecine);
router.post("/getMedicines", userController.getMedicines);
router.put("/updateProfile",userController.updateProfile);
router.put("/resetPass",userController.resetPass);
router.get("/confirmation/:token",userController.confirmation);

//get assistant name by email
router.post("/getNameByEmail",userController.getNameByEmail);

//router.post("/getAssistantName",userController.getAssistantName);


module.exports = router