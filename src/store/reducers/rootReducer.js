import { combineReducers } from 'redux'
import restaurantReducer from './restaurant'
import authReducer from './auth'

export default combineReducers({
	restaurants: restaurantReducer,
	auth: authReducer
})
