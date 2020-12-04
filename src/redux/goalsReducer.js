const initialState = {
    metGoals: false
}

const GOALS = "GOALS"

export function goals(metGoals){
    return {
        type: GOALS,
        payload: metGoals
    }
}

export default function(state = initialState, action){
    switch(action.type){
        case GOALS:
            return {...state, metGoals: true} 
        default: 
            return state
    }
}