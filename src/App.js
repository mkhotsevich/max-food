import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from "react-router-dom"
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { ProfilePage } from "./pages/ProfilePage/ProfilePage"
import AuthPage from "./pages/AuthPage/AuthPage"
import MainPage from "./pages/Main"
import Rests from './pages/admin/Rests'
import Specs from './pages/admin/Specs'
import MenuTypes from './pages/admin/MenuTypes'
import Orders from './pages/admin/Orders'
import Dashboard from './pages/admin/Dashboard'
import Restaurant from './pages/Restaurant'
import { Navbar } from "./components/Navbar/Navbar"
import Logout from './components/Logout/Logout'
import { autoLogin } from './store/actions/auth'
import Footer from './components/Footer/Footer'
import Dish from './pages/Dish'

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
			<Route path={'/restaurant/:id'} component={Restaurant} />
			<Redirect to={'/'} />
		</Switch>
	)

	if (isAuthenticated) {
		if (isAdmin) {
			routes = (
				<Switch>
					<Route path={'/admin/rests'} component={Rests} />
					<Route path={'/admin/specs'} component={Specs} />
					<Route path={'/admin/menutype'} component={MenuTypes} />
					<Route path={'/admin/orders'} component={Orders} />
					<Route path={'/admin/dashboard'} component={Dashboard} />
					<Route path={'/logout'} component={Logout} />
					<Redirect to={'/admin/rests'} />
				</Switch>
			)
		} else {
			routes = (
				<Switch>
					<Route path={'/'} exact component={MainPage} />
					<Route path={'/profile'} component={ProfilePage} />
					<Route path={'/dish/:id'} component={Dish}/>
					<Route path={'/restaurant/:id'} component={Restaurant} />
					<Route path={'/logout'} component={Logout} />
					<Redirect to={'/'} />
				</Switch>
			)
		}
	}

	return (
		<React.Fragment>
			<Navbar />
			<main role={'main'} className={'flex-shrink-0'}>
				<div className={'container pt-3'}>
					{routes}
				</div>
			</main>
			<Footer />
		</React.Fragment>
	)
}
