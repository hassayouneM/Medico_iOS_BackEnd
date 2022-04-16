const mongoose = require('mongoose');
//
var bcrypt = require('bcrypt-nodejs');
const medicine = require('./medicine');
var pathFolder = './Public/Uploads/';


const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Phone: {
        type: Number,
        required: true,
    },
    Address: {
        type: String,
        default:'',
    },
    Is_assistant: {
        type: Boolean,
        default: false,
    },
    Age: {
        type: Number,
        default:'',
    },
    Blood_type: {
        type: String,
        default:'',
    },
    Assistant_email: {
        type: String,
        default:'',
    },
    Photo: {
        type: String,
        default:'',
    },
    Emergency_num: {
        type: Number,
        default:''
    },
    Medicines : {
        type : [medicine],
        default : [],
    }
},{
    toJSON:{virtuals:true}
});


//just trying something 
userSchema.methods.getUser=function () {
    return({
        _id: this._id,
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
        is_assistant: this.is_assistant,
        age: this.age,
        photo: this.photo,
        pictureProfile:this.pictureProfile,
        blood_type: this.blood_type,
        emergency_num: this.emergency_num
    })
};


userSchema.virtual('pictureProfile').get(function () {
    if (this.photo !== undefined) {
    return pathFolder + this.photo;
    }else{
        return pathFolder +'avatar.png';
    }
});
userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                if (user.password){
                user.password = hash;
                }
                next();
            });
        });
    } else {
        return next();
    }
});
userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

//exports.User = mongoose.model('User', userSchema);
//exports.userSchema = userSchema;
const User = module.exports = mongoose.model('User', userSchema);