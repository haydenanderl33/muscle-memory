const initialState = {
    metGoals: false
}

const GOALS = "GOALS"
const RESET_GOALS = "RESET_GOALS"

export function goals(metGoals){
    return {
        type: GOALS,
        payload: metGoals
    }
}
export function resetgoals(){
    // console.log('hit')
    return {
        type: RESET_GOALS,
        payload: initialState
    }
}

export default function(state = initialState, action){
    switch(action.type){
        case GOALS:
            return {...state, metGoals: true} 
        case RESET_GOALS:
            return initialState
        default: 
            return state
    }
}