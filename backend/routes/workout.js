const express=require("express");
const {createWorkout,getWorkout,getWorkouts,deleteWorkout,updateWorkout}=require("../controllers/workoutController")
const requireAuth=require('../middleware/requireAuth')
const router=express.Router();

router.use(requireAuth)
//get all workouts
router.get("/",getWorkouts)
// get single workouts
router.get("/:id",getWorkout)
//delete a workout
router.delete("/:id",deleteWorkout)
//update a workout
router.patch("/:id",updateWorkout)
router.post("/",createWorkout)
module.exports=router