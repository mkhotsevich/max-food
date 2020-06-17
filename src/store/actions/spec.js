import axios from '../../axios/axios'
import { FETCH_SPECS_START, FETCH_SPECS_SUCCESS, FETCH_SPECS_ERROR } from './actionTypes'

export default function fetchSpecs() {
	return async dispatch => {
		dispatch(fetchSpecsStart())
		try {
			const response = await axios.get('/specs.json')
			const specs = []
			Object.keys(response.data).forEach((key) => {
				const spec = response.data[key]
				specs.push({
					id: key,
					name: spec.name,
				})
			})
			dispatch(fetchSpecsSuccess(specs))
		} catch (error) {
			dispatch(fetchSpecsError(error))
		}
	}
}
export function fetchSpecsStart() {
	return {
		type: FETCH_SPECS_START
	}
}
export function fetchSpecsSuccess(specs) {
	return {
		type: FETCH_SPECS_SUCCESS,
		specs
	}
}
export function fetchSpecsError(error) {
	return {
		type: FETCH_SPECS_ERROR,
		error
	}
}