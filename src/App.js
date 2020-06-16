import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from "react-router-dom"
import { ProfilePage } from "./pages/ProfilePage"
import AuthPage from "./pages/AuthPage/AuthPage"
import MainPage from "./pages/MainPage/MainPage"
import { AddDishPage } from "./pages/AddDishPage/AddDishPage"
import AddRestaurantPage from './pages/AddRestaurantPage/AddRestaurantPage'
import { RestaurantPage } from './pages/RestaurantPage/RestaurantPage'
import { Navbar } from "./components/Navbar/Navbar"
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Logout from './components/Logout/Logout'
import { autoLogin } from './store/actions/auth'

export const App = () => {
	const { isAuthenticated } = useSelector(state => ({
		isAuthenticated: !!state.auth.token
	}), shallowEqual)

	const dispatch = useDispatch({
		autoLogin: () => dispatch(autoLogin())
	})

	useEffect(() => {
		autoLogin()
	}, [])

	let routes = (
		<Switch>
			<Route path={'/'} exact component={MainPage} />
			<Route path={'/auth'} component={AuthPage} />
			<Route path={'/restaurant/:name'} component={RestaurantPage} />
			<Redirect to={'/'} />
		</Switch>
	)

	if (isAuthenticated) {
		routes = (
			<Switch>
				<Route path={'/'} exact component={MainPage} />
				<Route path={'/profile'} component={ProfilePage} />
				<Route path={'/adddish'} component={AddDishPage} />
				<Route path={'/addrestaurant'} component={AddRestaurantPage} />
				<Route path={'/restaurant/:name'} component={RestaurantPage} />
				<Route path={'/logout'} component={Logout} />
				<Redirect to={'/'} />
			</Switch >
		)
	}

	return (
		<div>
			<Navbar />
			{routes}
		</div>
	)
}
