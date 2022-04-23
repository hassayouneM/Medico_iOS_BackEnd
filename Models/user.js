const mongoose = require('mongoose');
//
const Medicine = require('./medicine');
var pathFolder = './Public/Uploads/';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default:'',
    
    },
    email: {
        type: String,
        default:'',
        //required: false,
    },
    password: {
        type: String,
        default:'',
        //required: false,
    },
    phone: {
        type: Number,
        default:'',
        //required: false,
    },
    address: {
        type: String,
        default:'',
        required : false,
    },
    is_assistant: {
        type: Boolean,
        default: false,
    },
    birthdate: {
        type: Date,
        required : false,

    },
    blood_type: {
        type: String,
        default:'',
        required : false,

    },
    assistant_email: {
        type: String,
        default:'',
        required : false,

    },
    photo: {
        type: String,
        default:'',
        required : false,

    },
    emergency_num: {
        type: Number,
        default:'',
        required : false,

    },
    medicines : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: "medicine",
        default:[],
        required : false,

    }],
    isVerfied : {
        type : Boolean,
        required : false,

    }

});

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;