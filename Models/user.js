const mongoose = require('mongoose');
//
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
        borA : {
            type: String,
        },
        photo: {
            type: String,
           // default:'',
        },
        quantity : {
            type: Number,
            required: true,
        },
        until: {
            type:Date,
         //ref: "medicine",
        // default:[],
        // required : false,
    }}],
    isVerified : {
        type : Boolean,
        required : false,
   //     default:false,

    }

});

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;