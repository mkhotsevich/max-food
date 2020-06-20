import { combineReducers } from 'redux'
import restaurantReducer from './restaurant'
import authReducer from './auth'
import specReducer from './spec'
import userReducer from './user'
import menutypesReducer from './menutypes'

export default combineReducers({
	restaurants: restaurantReducer,
	auth: authReducer,
	specs: specReducer,
	user: userReducer,
	menutypes: menutypesReducer
})
