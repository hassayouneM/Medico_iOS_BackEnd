const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const os = require("os")
const {User} = require('../Models/user');
const {Medicine}  =require('../Models/medicine')
const res = require("express/lib/response");
const { response } = require("express");
const { findOne } = require("../Models/medicine");




//**************************************** */


exports.register = async (req, res) => {

  // TODO  add photo
    const { name, email, password, phone, address, is_assistant, birthdate, blood_type, assistant_email, photo, emergency_num, medicines } = req.body;
    
    const verifUser = await User.findOne({ email })
    
    if (verifUser) {
      res.status(403).send({ message: "User already exist !" })
    } 
    if(verifAssistantemail(assistant_email)) {
      res.status(403).send({ message: "Invalid assistant email !" })
    }else {
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
        isVerified: false,
        medicines,
      }).save()


      // token creation
      const token = generateUserToken(user)
      
      sendConfirmationEmail(email, token);

      res.status(200).send({
        message: "success",
        user,
        Token: jwt.verify(token, process.env.JWT_KEY),
      })
      
    }
  }

exports.login = async (req, res) => {
    const { email, password } = req.body
  
    const user = await User.findOne({ email })
  
    if (user && (await bcrypt.compare(password, user.password))) {

      const token = generateUserToken(user)
  console.log(user.isVerified)
      if (!user.isVerified) {
      ////if (user.isVerified) {
        res.status(200).send({ user, message: "email non verifié" })
      } else {
        res.status(200).send({ token, user, message: "success" })
      }
    } else {
      res.status(403).send({ message: "mot de passe ou email incorrect" })
    }
  }
  
 exports.updateProfile = async (req, res) =>{
  // TODO: add photo
  const { name, email, phone, address, is_assistant, birthdate, blood_type, assistant_email, emergency_num, isVerified } = req.body

let user = await User.findOneAndUpdate(
  { email: email },
  {
    $set: {
      name,
      email,
      phone,
      address,
      is_assistant,
      birthdate,
      blood_type,
      assistant_email,
      emergency_num,
      ////pictureId: req.file.filename,
      isVerified
    },
  }
)

return res.send({ message: "Profile updated successfully", user})
}

exports.getPatients = async(req, res)=>{
  let assistant_email  =req.body.assistant_email
  User.find({
    assistant_email : assistant_email
  }).then(response =>{
    res.json({response})
  }).catch(console.error(response => res.json({message : "Could not show patients list"})))
}

// ! still not tested with medicines added
exports.getMedicines = async(req, res) =>{
 
  let patient = await User.findOne({email : req.body.email})
  medicines = patient.medicines

  res.status(200).send({  
    medicines : await patient.medicines
  }).catch(console.error(response => res.json({message : "Could not show medicines list"})))
  
}

// ! still not working
exports.AddMedecine = async(res,req)=>{
  let medecine = req.body.medecine
  User.findByIdAndUpdate(
    {_id :req.body.id},
    {$push:{medicines:medicine}},
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log(success);
      }
  }
  )

}

exports.confirmation = async (req, res) => {

  var token;
  try {
    token = jwt.verify(req.params.token, process.env.JWT_KEY)    
  } catch (e) {
    return res.status(400).send({ message: 'The verification link may have expired, please resend the email.' });
  }

  ////User.findById(tokenValue._id, function (err, use) {
    User.findById(token.user._id, function (err, user) {
    if (!user) {
      console.log(!user)
      return res.status(401).send({ message: 'User does not exist, please register.' });
    }
    else
     if (user.isVerified) {
      return res.status(200).send({ message: 'This user has already been verified, please login' });
    }
    else {
      user.isVerified = true;
      user.save(function (err) {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        else {
          return res.status(200).send({ message: 'Your account has been verified' });
        }
      });
    }
  });
}

exports.reSendConfirmationEmail = async (req, res) => {
 
  let user= await User.findOne( {email : req.body.email})

  
  if (user) {
    // token creation
     const token = generateUserToken(user)
      
     sendConfirmationEmail(req.body.email, token);

    res.status(200).send({ message: "Confirmation email is sent to " + user.email })
  } else {
    res.status(404).send({ message: "Utilisateur innexistant" })
  }
}

exports.forgetPass = async (req, res) => {
  const codeDeReinit = req.body.codeDeReinit
  console.log(codeDeReinit)
  const user = await User.findOne({ "email": req.body.email });

  if (user) {
    // token creation
    const token = generateUserToken(user)

    envoyerEmailReinitialisation(req.body.email, token, codeDeReinit);

    res.status(200).send({ "message": "reinitialisation code is sent to " + user.email })
  } else {
    res.status(404).send({ "message": "User not found" })
  }
}

exports.resetPass = async (req, res) => {
  console.log("0")
  const { email, newPassword } = req.body;
console.log("1")
  
  let user = await User.findOneAndUpdate(
    { email: email },
    {
      $set: {
        password : await bcrypt.hash(newPassword, 10)
      }
    }
  );
  console.log("3")
  res.send({ user });
}

exports.loginWithSocial = async (req, res) => {
  const { email, name } = req.body

  if (email === "") {
    res.status(403).send({ message: "error please provide an email" })
  } else {
    var user = await User.findOne({ email })
    if (user) {
      console.log("user exists, loging in")
    } else {
      console.log("The verification link may have expired, please resend the email")

      user = await new User({
        email,
        name,
        isVerified: true,
        
      }).save()
    }

    // token creation
    const token = generateUserToken(user)

    res.status(200).send({ message: "success", user, token: token })
  }
}

//************ GET USER BY SOMETHING ***********
//#region 
//get user by id
exports.get = async (req, res) => {
  res.send({ user: await User.findById(req.body.id) })
}

//get all users
exports.getAll = async (req, res) => {
  res.send({ users: await User.find() })
}

//get user by email
exports.getByEmail = async (req, res) => {
res.send({user: await User.findOne( {email : req.body.email})
})
}
//#endregion

// ********************* Functions *************
//#region 

function generateUserToken(user) {

    return jwt.sign({ user }, process.env.JWT_KEY, {
      expiresIn: "100000000", // in Milliseconds (3600000 = 1 hour)
      
    })
    
  }
  async function sendConfirmationEmail(email, token) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'MedicoAppTeam@gmail.com',
        pass: 'PIMMedicoTeam'
      }
    });
  
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        console.log("Server not ready");
      } else {
        console.log("Server is ready to take our messages");
      }
    });
  
    const urlDeConfirmation = "http://localhost:3000/users/confirmation/"+ token;
  
  
    const mailOptions = {
        from: 'MedicoTeam<MedicoAppTeam@gmail.com>',
      to: email,
      text: 'For clients with plaintext support only',
      subject: 'Confirm your email',
      html: "<h3>Please confirm your email using this  </h3><a href='" + urlDeConfirmation + "'>Link</a>"
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  
}

async function envoyerEmailReinitialisation(email, token, codeDeReinit) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'MedicoAppTeam@gmail.com',
      pass: 'PIMMedicoTeam'
    }
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
      console.log("Server not ready");
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  const mailOptions = {
    from: 'MedicoTeam<MedicoAppTeam@gmail.com>',
    to: email,
    subject: 'Change password - Medico',
    html: "<h3>You have requested to reset your password </h3><p>Your reset code is  : <b style='color : blue'>" + codeDeReinit + "</b></p>"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent : ' + info.response);
    }
  });
}

async function verifAssistantemail(email){
  const user = await User.findOne({email})
  if(user.is_assistant){
    return true
  }else{
    return false
  }
}
 //#endregion

