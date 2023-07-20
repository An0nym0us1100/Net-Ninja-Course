import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

import { format, formatDistance, formatDistanceToNow, formatRelative, subDays } from 'date-fns'

const WorkoutDetails = ({workout})=> {
    const {dispatch} = useWorkoutsContext()

    const handleClick = async () => {

        // fetch specific workout appending id to then end of URL
        // backend will then know it is a delete request
        const response = await fetch('/api/workouts/' + workout._id,{
            method: 'DELETE'
        })
        // when we get a response delete, we get the deleted file with this
        const json = await response.json()

        // dispatch action to delete workout
        // payload will be the deleting json above
        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }


    return(
        <div className= "workout-details">
            <h4>{workout.title}</h4>
            <p><strong> Load (lb): </strong>{workout.load}</p>
            <p><strong> Reps: </strong>{workout.reps}</p>
            {/* /* date-fns time, addsuffix true adds 'ago' relative to createdAt date */}
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails