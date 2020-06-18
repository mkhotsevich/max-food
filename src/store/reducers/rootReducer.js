import { combineReducers } from 'redux'
import restaurantReducer from './restaurant'
import authReducer from './auth'
import specReducer from './spec'
import userReducer from './user'

export default combineReducers({
	restaurants: restaurantReducer,
	auth: authReducer,
	specs: specReducer,
	user: userReducer
})
