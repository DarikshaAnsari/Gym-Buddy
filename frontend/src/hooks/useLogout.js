import { useAuthContext } from "../context/AuthContext";
import { useWorkoutContext } from "../context/WorkoutContext";


export const useLogout =()=>{
    const {dispatch} =useAuthContext();
    const {dispatch:workoutsDispatch}=useWorkoutContext();
    const logout =()=>{
       localStorage.removeItem('user');
      
       workoutsDispatch({type:'SET_WORKOUTS',payload:null})
       dispatch({type:'LOGOUT'})
       
    }
    return {logout};
}