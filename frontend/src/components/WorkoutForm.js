import React, { useState } from 'react'
import { useWorkoutContext } from '../context/WorkoutContext';
import { useAuthContext } from '../context/AuthContext';
export default function WorkoutForm() {
  const {dispatch}=useWorkoutContext();
  const [title,setTitle]=useState('');
  const [reps,setReps]=useState('');
  const [load,setLoad]=useState('');
  const [emptyFields,setEmptyFields]=useState([])
  const [error,setError]=useState(null);
  const {user}=useAuthContext();
  const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!user){
            setError('You must be logged in')
            return
        }
        const workout={title,load,reps};
        const response=await fetch("/api/workouts",{
            method:'POST',
            body:JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json=await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log("new workout added",json)   
            dispatch({type:"CREATE_WORKOUT",payload:json})
        }

    }

  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add a new Workout</h3>
        <label>Exersize title:</label>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} className={emptyFields.includes('title')?'error':''}></input>
        <label>Load(in kg):</label>
        <input type='number' value={load} onChange={(e)=>setLoad(e.target.value)} className={emptyFields.includes('load')?'error':''}></input>
        <label>Reps</label>
        <input type='number' value={reps} onChange={(e)=>setReps(e.target.value)} className={emptyFields.includes('reps')?'error':''}></input>
        <button>Add Workout</button>
        {
            error && <div className='error'>{error}</div>
        }
    </form>
  )
}
