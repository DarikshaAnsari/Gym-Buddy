require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose');
const app=express()

// disable CORS
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
app.use('/api/workouts',require("./routes/workout"));
app.use('/api/user',require("./routes/user"));
mongoose.connect(process.env.MONG_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('connected to db and listening on port',process.env.PORT);
    })
}).catch((err)=>{console.log(err);})