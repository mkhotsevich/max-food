import React, { useEffect, useState } from "react"
import axios from 'axios'
import classes from './MainPage.module.css'
import Cart from "../../components/UI/Cart/Cart"
import Loader from '../../components/UI/Loader/Loader'


export const MainPage = () => {

	const [state, setState] = useState({
		restaurants: [],
		loading: true
	});

	useEffect(() => {
		try {
			(async () => {
				const response = await axios.get('https://maxfood-4cbb5.firebaseio.com/restaurants.json')
				const restaurants = []
				Object.keys(response.data).forEach((key) => {
					const restaurant = response.data[key]
					restaurants.push({
						id: key,
						name: restaurant.name,
						description: restaurant.description,
						restaurateurId: restaurant.restaurateurId
					})
				})
				setState({ restaurants, loading: false })
				console.log(restaurants)
			})()
		} catch (error) {
			console.log(error)
		}
	}, [])
	const renderRestaurants = () => {
		return state.restaurants.map((restaurant, index) => {
			return (
				<Cart
					key={restaurant.id + index}
					name={restaurant.name}
					description={restaurant.description}
					id={restaurant.id}
				/>
			)
		})
	}
	return (
		<div className={classes.MainPage}>
			<div>
				<h1>Рестораны</h1>
				{state.loading ?
					<div className={classes.LoaderWrap}><Loader /></div> :
					<div className={classes.restaurants}>
						{renderRestaurants()}
					</div>}
			</div>
		</div>
	)
}
