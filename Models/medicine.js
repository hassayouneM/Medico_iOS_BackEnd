const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true,
    },
    Catgory : {
        type:String,
        required: true,
    },
    Notif_time : {
        type: Date,
        required: true,
    },
    Photo: {
        type: String,
        default:'',
    },
    Quantity : {
        type: Number,
        required: true,
    },
    Until: {
        type:Date,
        required : true
    },
    BorA :{
        type: String,
        required:true
    }
},
{
    toJSON:{virtuals:true}
});

const Medicine = module.exports = mongoose.model('Medicine', medicineSchema);