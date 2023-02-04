const Workout=require("../models/Workoutmodel")
const mongoose=require("mongoose");
//get all workouts
const getWorkouts=async(req,res)=>{
     const workout=await Workout.find({}).sort({createdAt:-1})

     res.status(200).json(workout);
}

//get single workouts
const getWorkout=async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such workout"})
    }
    const workout=await Workout.findById(id)

    if(!workout){ 
        return res.status(400).json({error:"No such workout"})
    }
    res.status(200).json(workout)
}
//create new workouts
const createWorkout=async(req,res)=>{
    const {title,load,reps}=req.body
    let emptyFields=[]
    if(!title){
        emptyFields.push('title')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error:'Please fill in all the fields',emptyFields})
    }
    try {
        const workout= await Workout.create({title,load,reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
//delete a workouts
const deleteWorkout=async(req,res)=>{
    const {id}=req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such workout found"})
    }
    const workout=await Workout.findOneAndDelete({_id:id})
    if(!workout){
        return res.status(400).json({error:"No such workout found"})
    }
    res.status(200).json(workout)

}
//update a workouts

const updateWorkout=async(req,res)=>{
    const {id}=req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such workout found"})
    }
    const workout=await Workout.findOneAndUpdate({_id:id},{...req.body})
    if(!workout){
        return res.status(400).json({error:"No such workout found"})
    }
    res.status(200).json(workout)
}
module.exports={
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}
