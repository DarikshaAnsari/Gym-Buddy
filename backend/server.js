require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose');
const app=express()

app.get('/',(req,res)=>{
    res.json({msg:"welcome to the app"})
})
app.use(express.json());
app.use('/api/workouts',require("./routes/workout"));
app.use('/api/user',require("./routes/user"));
mongoose.connect(process.env.MONG_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('connected to db and listening on port',process.env.PORT);
    })
}).catch((err)=>{console.log(err);})