import { combineReducers } from 'redux'
import restaurantReducer from './restaurant'

export default combineReducers({
	restaurants: restaurantReducer
})