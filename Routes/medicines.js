const express = require("express")
const router = express.Router()
const medicineController = require("../Controllers/medicineController")

router.route("/").get(medicineController.getAll);
   

module.exports = router