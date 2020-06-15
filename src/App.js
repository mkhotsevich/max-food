import React from 'react'
import { Redirect, Route, Switch } from "react-router-dom"
import { ProfilePage } from "./pages/ProfilePage"
import { AuthPage } from "./pages/AuthPage/AuthPage"
import MainPage from "./pages/MainPage/MainPage"
import { AddDishPage } from "./pages/AddDishPage/AddDishPage"
import AddRestaurantPage from './pages/AddRestaurantPage/AddRestaurantPage'
import { RestaurantPage } from './pages/RestaurantPage/RestaurantPage'
import { Navbar } from "./components/Navbar/Navbar"

function App() {
	return (
		<div>
			<Navbar />
			<Switch>
				<Route path={'/'} exact component={MainPage} />
				<Route path={'/auth'} component={AuthPage} />
				<Route path={'/profile'} component={ProfilePage} />
				<Route path={'/adddish'} component={AddDishPage} />
				<Route path={'/addrestaurant'} component={AddRestaurantPage} />
				<Route path={'/restaurant/:name'} component={RestaurantPage} />
				<Redirect to={'/'} />
			</Switch>
		</div>
	)
}

export default App
