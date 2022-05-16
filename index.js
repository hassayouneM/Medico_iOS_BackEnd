const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

//Swagger implementation
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
app.use("/medicines", require("./Routes/medicines"));
app.use("/chat", require("./Routes/chats"));

//
var publicDir = require('path').join(__dirname,'/Public/Uploads');
app.use('/Public/Uploads', express.static(publicDir));


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

//swagger
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "MEDICO",
            description: "MEDICO: mobile application to assist elder people in reminding them to have their medication.",
            version: "2.0.0",
            contact: {
                name: "us via email",
                email: "medico.for.health@gmail.com"
            },
            server: ["http://localhost:3000"],
        }
    },
    apis: ["./Routes/users.js","./Routes/chats.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));