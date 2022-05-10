const express = require("express")
const router = express.Router()
const medicineController = require("../Controllers/medicineController");
const { route } = require("./users");

router.route("/").get(medicineController.getAll);
   
router.post("/addMed",medicineController.addMedicine);
router.post("/getById",medicineController.getById);

//Delete medicine
router.delete("/delete",medicineController.remove);
//Update medicine
router.post("/update",medicineController.UpdateMedication);


module.exports = router