const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

const api = process.env.API_URL;

const port = process.env.PORT || 3000;

app.get(`/`,(req, res) => {
    res.send('HELLO');
})

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

//swagger


//Routes
//const usersRoutes = require('./Routes/users');
// allow to excutes url of web services in such rout
app.use("/users", require("./Routes/users"));

//
app.use('/uploads', express.static('uploads'))


//Connecting server
app.listen(port, ()=>{
    console.log('server is running on port 3000');
})

//Connecting DataBase
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'medico-DB',
    
})
.then(()=> {
    console.log('DATABASE CONNECTED')
})
.catch((err) => {
    console.log(err)
})