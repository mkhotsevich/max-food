import axios from 'axios' 

export default axios.create({
	baseURL: 'https://maxfood-4cbb5.firebaseio.com'
})