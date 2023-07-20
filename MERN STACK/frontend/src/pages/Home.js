import { useEffect } from "react"
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    // setWorkouts using workouts with initial state as null
    const {workouts, dispatch} = useWorkoutsContext()

    useEffect(() =>{
        const fetchWorkouts = async () => {

            // fetch array of json data from db and store in 'response'
            // remove local host 4000 so it will look at proxy at package.json
            // on live system all data should be pointed to correct port
            // instead of this workaround
            const response = await fetch('/api/workouts')

            // pass array of data to array of objects
            const json = await response.json()

            // only if response is ok
            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        // array of workout output
        fetchWorkouts()
    // only want to fetch once so use [], warning for missing dependency if not [dispatch], dependency array    
    }, [dispatch])
    return(
        <div className="home">
            <div className="workouts">
                {/* cycle through workouts only if setWorkout not null */}
                {workouts && workouts.map((workout) => (
                    // Id the unique workout and output the title, pass in all of {workout}
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home