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
//get all users
exports.getAll = async(req, res) =>{
    res.send({medicines : await Medicine.find()})
}


