const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const os = require("os")
const {User} = require('../Models/user');
const res = require("express/lib/response");

//_____________________________________________




exports.register = async (req, res) => {
    const { name, email, password, phone, address, is_assistant, birthdate, blood_type, assistant_email, photo, emergency_num, medicines } = req.body;
    
    if (await User.findOne({ email })) {
      res.status(403).send({ message: "User already exist !" })
    } else {
      let user = await new User({
        name ,
        email,
        password: await bcrypt.hash(password, 10),
        phone,
        address,
        is_assistant,
        birthdate,
        blood_type,
        assistant_email,
        photo,
        emergency_num,
        isVerified: true,
        medicines,
      }).save()


      // token creation
      const token = generateUserToken(user)
      
      
      
      res.status(200).send({
        message: "success",
        user,
        Token: jwt.verify(token, process.env.JWT_SECRET),
      })
      
      //doSendConfirmationEmail(email, token, req.protocol)
    }
  }
  //}

exports.login = async (req, res) => {
    const { email, password } = req.body
  
    const user = await User.findOne({ email })
  
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateUserToken(user)
  console.log(user.isVerified)
     // if (!user.isVerified) {
      if (user.isVerified) {
        res.status(403).send({ user, message: "email non verifié" })
      } else {
        res.status(200).send({ token, user, message: "success" })
      }
    } else {
      res.status(403).send({ message: "mot de passe ou email incorrect" })
    }
  }
  


  ///// FUNCTIONS ---------------------------------------------------------

function generateUserToken(user) {

    return jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "100000000", // in Milliseconds (3600000 = 1 hour)
      
    })
    
  }
  
  async function doSendConfirmationEmail(email, token, protocol) {
    let port = process.env.PORT || 5000
  
    sendEmail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Confirm your email",
      html:
        "<h3>Please confirm your email using this </h3><a href='" +
        protocol + "://" + os.hostname() + ":" + port + "/user/confirmation/" + token +
        "'>Link</a>",
    })
  }

  function sendEmail(mailOptions) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      user: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    })
  
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error)
        console.log("Server not ready")
      } else {
        console.log("Server is ready to take our messages")
      }
    })
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log("Email sent: " + info.response)
      }
    })
  }


//************ GET USER BY SOMETHING ***********

//get user by id
exports.get = async (req, res) => {
    res.send({ user: await User.findById(req.body._id) })
  }
  
//get all users
  exports.getAll = async (req, res) => {
    res.send({ users: await User.find() })
}

//get user by email
//exports.getByEmail = async (req, res) => {
  //res.send({user: await User.findByEmail( req.body.email)})
//}