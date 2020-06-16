import { combineReducers } from 'redux'
import restaurantReducer from './restaurant'
import createReducer from './createReducer'

export default combineReducers({
	restaurants: restaurantReducer,
	createReducer: createReducer
})