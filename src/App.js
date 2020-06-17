import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from "react-router-dom"
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { ProfilePage } from "./pages/ProfilePage/ProfilePage"
import AuthPage from "./pages/AuthPage/AuthPage"
import MainPage from "./pages/MainPage/MainPage"
import { AddDishPage } from "./pages/AddDishPage/AddDishPage"
import { AddRestaurantPage } from './pages/AddRestaurantPage/AddRestaurantPage'
import { RestaurantPage } from './pages/RestaurantPage/RestaurantPage'
import { Navbar } from "./components/Navbar/Navbar"
import Logout from './components/Logout/Logout'
import { autoLogin } from './store/actions/auth'

export const App = (props) => {

	const { isAuthenticated, isAdmin } = useSelector(state => ({
		isAuthenticated: !!state.auth.token,
		isAdmin: state.auth.userId === 'rxSgS3FlNBb3kfoO630c8JvJB6O2'
	}), shallowEqual)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(autoLogin())
	}, [dispatch])

	let routes = (
		<Switch>
			<Route path={'/'} exact component={MainPage} />
			<Route path={'/auth'} component={AuthPage} />
			<Route path={'/restaurant/:name'} component={RestaurantPage} />
			<Route path={'/addrestaurant'} component={AddRestaurantPage} /> 
			<Redirect to={'/'} />
		</Switch>
	)

	if (isAuthenticated) {
		console.log(isAuthenticated, isAdmin)
		if (isAdmin) {
			routes = (
				<Switch>
					<Route path={'/'} exact component={MainPage} />
					<Route path={'/profile'} component={ProfilePage} />
					<Route path={'/adddish'} component={AddDishPage} />
					<Route path={'/addrestaurant'} component={AddRestaurantPage} />
					<Route path={'/restaurant/:name'} component={RestaurantPage} />
					<Route path={'/logout'} component={Logout} />
					<Redirect to={'/'} />
				</Switch>
			)
		} else {
			routes = (
				<Switch>
					<Route path={'/'} exact component={MainPage} />
					<Route path={'/profile'} component={ProfilePage} />
					<Route path={'/restaurant/:name'} component={RestaurantPage} />
					<Route path={'/logout'} component={Logout} />
					<Redirect to={'/'} />
				</Switch>
			)
		}
	}

	return (
		<React.Fragment>
			<Navbar />
			<div className={'container'}>
				{routes}
			</div>
		</React.Fragment>
	)
}
