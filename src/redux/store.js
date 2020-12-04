import {applyMiddleware, createStore, combineReducers} from 'redux';
import reducer from './reducer'
import goalsReducer from './goalsReducer'
import promiseMiddleware from 'redux-promise-middleware'

const rootReducer = combineReducers({
    userReducer: reducer,
    goalReducer: goalsReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))
// export default createStore(reducer, applyMiddleware(promiseMiddleware))