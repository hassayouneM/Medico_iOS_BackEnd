const mongoose = require('mongoose');
//
var bcrypt = require('bcrypt-nodejs');
var pathFolder = './Public/Uploads/';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        default:'',
    },
    is_assistant: {
        type: Boolean,
        default: false,
    },
    age: {
        type: Number,
        default:'',
    },
    blood_type: {
        type: String,
        default:'',
    },
    assistant_email: {
        type: String,
        default:'',
    },
    photo: {
        type: String,
        default:'',
    },
    emergency_num: {
        type: Number,
        default:''
    },
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