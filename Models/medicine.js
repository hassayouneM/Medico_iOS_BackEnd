const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    category : {
        type:String,
        required: true,
    },
    notif_time : {
        type: Date,
        required: true,
    },
    photo: {
        type: String,
        default:'',
    },
    quantity : {
        type: Number,
        required: true,
    },
    until: {
        type:Date,
        required : true
    },
    borA :{
        type: String,
        required:true
    }
},
{
    toJSON:{virtuals:true}
});

const Medicine = module.exports = mongoose.model('Medicine', medicineSchema);