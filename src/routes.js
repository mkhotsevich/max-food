import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { ProfilePage } from "./pages/ProfilePage"
import { AuthPage } from "./pages/AuthPage/AuthPage"
import { MainPage } from "./pages/MainPage/MainPage"
import { AddDishPage } from "./pages/AddDishPage/AddDishPage"
import { AddRestaurantPage } from './pages/AddRestaurantPage/AddRestaurantPage'
import { RestaurantPage } from './pages/RestaurantPage/RestaurantPage'

export const useRoutes = isAuthenticated => {
	return (
		<Switch>
			<Route path={'/'} exact component={MainPage} />
			{!isAuthenticated ? <Route path={'/auth'} component={AuthPage} /> : null}
			{isAuthenticated ? <Route path={'/profile'} component={ProfilePage} /> : null}
			<Route path={'/adddish'} component={AddDishPage} />
			<Route path={'/addrestaurant'} component={AddRestaurantPage} />
			<Route path={'/:name'} component={RestaurantPage} />
			<Redirect to={'/'} />
		</Switch>
	)
}
