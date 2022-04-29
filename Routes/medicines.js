const express = require("express")
const router = express.Router()
const medicineController = require("../Controllers/medicineController");
const { route } = require("./users");

router.route("/").get(medicineController.getAll);
   
router.post("/addMed",medicineController.addMedicine);
router.post("/getById",medicineController.getById);

module.exports = router