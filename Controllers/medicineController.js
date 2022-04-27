const res = require("express/lib/response");
const {response} = require("express");
const  Medicine  = require("../Models/medicine");
const { User } = require("../Models/user");

exports.addMedicine= async(req, res)=>{
    //TODO add photo
    const{name, category, notif_time, quantity, until, borA} = req.body
    
    let medicine = await new Medicine({
        name,
        category,
        notif_time,
        quantity,
        until,
        borA,
    }).save()
    res.status(200).send({
        message : "medicine added successfully",
        medicine,
    })
}

//get all users
exports.getAll = async(req, res) =>{
    res.send({medicines : await Medicine.find()})
}

//NEW******
//GET Medicines by user
exports.getMedByUser = async (req, res) => {
    let userID = req.body.userID
    const user = await User.findById(userID).select('medicines')
    
    if (!user) {
        res.status(500).json({message:"no medicines"})
    }
    res.status(200).send(user.medicines)
  }

//Get medicine by id
exports.getMedById = async (req, res) => {
    res.send({ medicine: await Medicine.findById(req.body.id) })
  }


//Delete Medicine tested
exports.delete = async (req, res) => {
    let medicine = await Medicine.findById(req.body._id)
    if (medicine) {
      await medicine.remove()
      return res.send({ message: "Medicines" + medicine._id + " have been deleted" })
    } else {
      return res.status(404).send({ message: "medicine does not exist" })
    }
  }


