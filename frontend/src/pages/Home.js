import React, { useEffect} from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutContext } from '../context/WorkoutContext'
export default function Home() {
   const {workouts,dispatch}=useWorkoutContext();
  useEffect(()=>{
      const fetchWorkouts=async()=>{
         const response=await fetch('/api/workouts')
         const json =await response.json();
         console.log(json)
         if(response.ok){
           dispatch({type:'SET_WORKOUTS',payload:json})
         }
      }
      fetchWorkouts();
  },[dispatch])
  return (
    <div className='home'>
       <div className='workouts'>
        {workouts && workouts.map((workout)=>{
           return <WorkoutDetails key={workout._id} workout={workout}/>
        })}
       </div>
        <WorkoutForm/>
    </div>
  )
}
