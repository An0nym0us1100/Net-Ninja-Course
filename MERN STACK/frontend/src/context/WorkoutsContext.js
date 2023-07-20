import {createContext, useReducer} from 'react'


// create new context- these update local state without pulling from DB
// which is already updated
export const WorkoutsContext = createContext()
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        // pull all workouts
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        // create workout and add existing workouts with ...
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        // filter in the 'w' workouts that are not the payload id
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        // return state unchanged
        default:
            return state
        
    }
}

// provide context to component tree
// children component wraps the "Apps /" component from index.js
export const WorkoutsContextProvider = ({children}) => {
    // reducer - gets 
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })

    return(
        // provide state and dispatch to be available in other components
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
        
    )
}
