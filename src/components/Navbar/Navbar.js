import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext"
import { useAuth } from "../../hooks/auth.hook"
import './Navbar.css'

export const Navbar = () => {
	const history = useHistory()
	const auth = useContext(AuthContext)
	const { token } = useAuth()
	const isAuthenticated = !!token
	const logoutHandler = event => {
		event.preventDefault()
		auth.logout()
		history.push('/')
	}

	return (
		<nav>
			<NavLink to={'/'} className="navbar-logo">MaxFood</NavLink>
			<div className="navbar-address">
				<i className="fas fa-map-marker-alt" />
				<input type="text" className="navbar-address-input" placeholder="Адрес доставки"></input>
			</div>
			{isAuthenticated ?
				<div className="navbar-profile navbar-profile-dropdown" id="navbar-profile-dropdown">
					<NavLink to={'/profile'} className="navbar-profile-dropdown-link"><i className="fas fa-user" />&nbsp;Профиль</NavLink>
					<div className="navbar-profile-dropdown-content">
						<a href="#">Link 1</a>
						<a href="#">Link 2</a>
						<a href="#" onClick={logoutHandler}>Выйти</a>
					</div>
				</div>
				:
				<div className="navbar-profile">
					<NavLink to={'/auth'}><i className="fas fa-user" />&nbsp;Войти</NavLink>
				</div>
			}
			<button className="navbar-cart"><i className="fas fa-shopping-cart" />&nbsp;Корзина</button>
		</nav>
	)
}
