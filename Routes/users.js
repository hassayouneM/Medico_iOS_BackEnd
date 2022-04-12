const express = require('express');
const router = express.Router();
const User = require('../Models/user');
var jwt = require('jsonwebtoken');

// signup
router.post('/signUp', function (req, res) {
    try {
        User.findOne({'email': req.body.email}, function (err, user) {
            if (err) {
                res.json({
                    status: 0,
                    message: ('Error while saving') + err
                });
}
            if (user) {
                res.json({
                    status: 0,
                    message: ('Email already used')
                });
            } else {
                    var newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        phone: req.body.phone,
                        address: req.body.address,
                        is_assistant: req.body.is_assistant,
                        age: req.body.age,
                        blood_type: req.body.blood_type,
                        assistant_email: req.body.assistant_email,
                        photo: "avatar.png",
                        emergency_num: req.body.emergency_num
                    });
                    //save the user
                    newUser.save(function (err, savedUser) {
                        if (err) {
                            res.json({
                                status: 0,
                                message: err
                            });
                        } else {
                            var token = jwt.sign(savedUser.getUser(), 'MySecret', {expiresIn: 3600});
                            res.json({
                                status: 1,
                                message: 'signUp successfully',
                                data: {
                                    user: savedUser.getUser(),
                                    token: token                                }
                            })
                        }
                    });
            }
        });
    } catch (err) {
        console.log(err);
        res.json({
            status: 0,
            message: '500 Internal Server Error',
            data: {}
        })
    }
});

//signin  user
router.post('/signIn', function (req, res) {
    try {
        User.findOne({email: req.body.email}, function (err, user) {
            if (err) {
                res.json({
                    //status: 0,
                    message: ('erreur auth SignIn') + err
                });
            }
            if (!user) {
                res.json({
                    //status: 0,
                    message: 'Authentication failed. User not found.'
                });
            } else {
                // check if password matches
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.sign(user.getUser(), 'MySecret', {expiresIn: 3600});
                        res.json({
                            //status: 1,
                            message: 'Login successfully ',
                            data: {
                                user: user.getUser(),
                                token: token
                            }
                        });
                    } else {
                        res.json({
                            //status: 0,
                            message: 'Authentication failed. Wrong password.'
                        });
                    }
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.json({
            //status: 0,
            message: '500 Internal Server Error',
            data: {}
        })
    }
});

module.exports = router;