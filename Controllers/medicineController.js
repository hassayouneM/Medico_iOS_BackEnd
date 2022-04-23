const {Medicine}  =require('../Models/medicine');
const res = require("express/lib/response");
const { response } = require("express");


// exports.Medicine= async(req, res)=>{
//     //TODO add photo
//     const{name, category, notif_time, quantity, until, borA} = req.body
    
//     let medicine = await new Medicine({
//         name,
//         category,
//         notif_time,
//         quantity,
//         until,
//         borA,
//     }).save()
//     res.status(200).send({
//         message : "medicine added successfully",
//         medicine,
//     })
// }

//get all users

//! still does not work
//? why i can't find find()
exports.getAll = async (req, res) => {
    res.send({medicines : Medicine.find()})
  }