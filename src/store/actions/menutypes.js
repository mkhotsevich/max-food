import axios from '../../axios/axios'
import { FETCH_MENUTYPES_START, FETCH_MENUTYPES_SUCCESS, FETCH_MENUTYPES_ERROR } from './actionTypes'

export function createMenuType(item) {
	return async dispatch => {
		await axios.post('/menutypes.json', item)
		dispatch(fetchMenuTypes())
	}
}
export function fetchMenuTypes() {
	return async dispatch => {
		dispatch(fetchMenuTypesStart())
		try {
			const response = await axios.get('/menutypes.json')
			const menutypes = []
			Object.keys(response.data).forEach((key) => {
				const menutype = response.data[key]
				menutypes.push({
					id: key,
					name: menutype.name,
				})
			})
			dispatch(fetchMenuTypesSuccess(menutypes))
		} catch (error) {
			dispatch(fetchMenuTypesError(error))
		}
	}
}
export function deleteMenuType(menutype) {
	return async dispatch => {
		try {
			await axios.delete(`/menutypes/${menutype.id}.json`)
			dispatch(fetchMenuTypes())
		} catch (error) {
			console.log(error)
		}
	}
}
export function fetchMenuTypesStart() {
	return {
		type: FETCH_MENUTYPES_START
	}
}
export function fetchMenuTypesSuccess(menutypes) {
	return {
		type: FETCH_MENUTYPES_SUCCESS,
		menutypes
	}
}
export function fetchMenuTypesError(error) {
	return {
		type: FETCH_MENUTYPES_ERROR,
		error
	}
}