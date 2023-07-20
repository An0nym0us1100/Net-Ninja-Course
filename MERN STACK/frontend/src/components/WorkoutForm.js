import {useState} from "react"
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
    // create inital states, and store user input
    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        //prevents reloading whole page form submitted
        e.preventDefault()
        // get variables to post back to db
        const workout = {title, load, reps}

        // POST TO: front end recognizes home '/' as '/api/workouts'
        const response = await fetch('/api/workouts', {
            method: 'POST',
            // change javascript values to json object
            body: JSON.stringify(workout),
            // header needs to know the application is in json
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
            setError('all gravy baby')
        }
    }

    // return values
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Exersize Title:</label>
            <input 
                type="text" 
                // e=event, target=selected field
                onChange={(e) => setTitle(e.target.value)}
                // two way binding- value can also = initial state title or external source
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load:</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>

    )
}

export default WorkoutForm