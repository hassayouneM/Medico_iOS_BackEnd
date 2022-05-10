const res = require("express/lib/response");
const {response} = require("express");
const  Medicine  = require("../Models/medicine")

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

//get by id
exports.getById = async(req,res)=>{
    res.send({medicine : await Medicine.findById(req.body.id)})
}

//get all medication
exports.getAll = async(req, res) =>{
    res.send({medicines : await Medicine.find()})
}

// Delete medicine
exports.remove = async (req, res) => {
    let medicine = await Medicine.findById(req.body._id)
    if (medicine) {
      await medicine.remove()
      return res.status(200).send({ message: "Medicine " + medicine._id + " have been deleted" })
    } else {
      return res.status(404).send({ message: "Medicine does not exist" })
    }
  }

// Delete all medicine
exports.removeAll = async (req, res) => {
    await Medicine.remove({})
    res.send({ message: "All medicines have been deleted" })
  }

// Update medicine
exports.UpdateMedication = (req, res, next) => {
    let medicineID = req.body.medicineID

    let updateData = {
        name: req.body.name,
        category: req.body.category,
        notif_time: req.body.notif_time,
        photo: req.body.photo,
        quantity: req.body.quantity,
        until: req.body.until,
        borA: req.body.borA
    }
    Medicine.findByIdAndUpdate(medicineID, {
            $set: updateData
        })
        .then(() => {
            res.json({message: 'Medication updated successfully'})
        })
        .catch(error => {
            res.json({message: 'An error Occured',error})
        })
}
