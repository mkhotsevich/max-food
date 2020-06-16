import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from "react-router-dom"
import { ProfilePage } from "./pages/ProfilePage"
import AuthPage from "./pages/AuthPage/AuthPage"
import MainPage from "./pages/MainPage/MainPage"
import { AddDishPage } from "./pages/AddDishPage/AddDishPage"
import AddRestaurantPage from './pages/AddRestaurantPage/AddRestaurantPage'
import { RestaurantPage } from './pages/RestaurantPage/RestaurantPage'
import { Navbar } from "./components/Navbar/Navbar"
import { connect } from 'react-redux'
import Logout from './components/Logout/Logout'
import { autoLogin } from './store/actions/auth'

function App(props) {

	useEffect(() => {
		props.autoLogin()
	}, [props])

	let routes = (
		<Switch>
			<Route path={'/'} exact component={MainPage} />
			<Route path={'/auth'} component={AuthPage} />
			<Route path={'/restaurant/:name'} component={RestaurantPage} />
			<Redirect to={'/'} />
		</Switch>
	)

	if (props.isAuthenticated) {
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

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.auth.token
	}
}
function mapDispatchToProps(dispatch) {
	return {
		autoLogin: () => dispatch(autoLogin())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
