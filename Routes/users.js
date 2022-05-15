
const express = require("express")
const router = express.Router()
const userController = require("../Controllers/userController")
const multer = require('multer')


const storage = multer.diskStorage({
    destination(req,file, cb){
        cb(null,'uploads/')
    },
    filename(req,file,cb){
        cb(null,`${file.fildname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
const fileFilter = (req,file,cb)=>{
      if(file.mimetype==='image/jpeg' || file.mimetype ===  'image/jpg'){
            cb(null,true);
      }else{
            cb(null,false);
      }
}
const upload = multer({storage: storage,fileFilter: fileFilter
    })




router.route("/").get(userController.getAll);
   

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/findById",userController.get);
router.post("/getPatients", userController.getPatients);
router.post("/forgetPassword",userController.forgetPass);
router.post("/reSendConfirmationEmail",userController.reSendConfirmationEmail);
router.post("/addMedicine",userController.AddMedecine);
router.post("/editMedicine",userController.EditMedecine);
router.post("/deleteMedicine",userController.deleteMed);
router.post("/getAssistant",upload.single('image'),userController.getAssistant);
router.put("/updateProfile",userController.updateProfile);
router.put("/resetPass",userController.resetPass);
router.get("/confirmation/:token",userController.confirmation);


module.exports = router