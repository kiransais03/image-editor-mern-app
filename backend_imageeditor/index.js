const express = require('express'); //Import express framework
const mongoose = require('mongoose');  //Import Mongoose ODM
const app = express();  //Calling the express function
require('dotenv').config(); //Import and initialising the dotenv package
const cors = require('cors')

app.use(express.json());  //Middleware to convert the response to JSON from HTTP format

app.use(cors({origin:'*'}));

const imageactions = require('./routes/imageactions');

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI)  //Connecting to MongoDB database
.then(()=>{console.log("MongoDB Database Connected")})
.catch((error)=>{console.log("Error in connecting to MongoDB Database",error)})


app.use('/imageactions',imageactions);  //Middleware for routing the requests from /imageactions

app.listen(PORT,()=>{
    console.log("Server running at PORT",PORT)
});