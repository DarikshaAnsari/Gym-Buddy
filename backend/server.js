require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose');
const app=express()
const cors = require("cors");
app.use(cors());
// disable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 })
app.use(express.json());
app.use('/api/workouts',require("./routes/workout"));
app.use('/api/user',require("./routes/user"));
mongoose.connect(process.env.MONG_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('connected to db and listening on port',process.env.PORT);
    })
}).catch((err)=>{console.log(err);})