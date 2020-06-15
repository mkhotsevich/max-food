import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../UI/Input/Input'
import classes from './Navbar.module.css'

export const Navbar = () => {
	return (
		<div className={classes.Navbar}>
			<Link to={'/'} className={classes.logo}>
				<i className="fas fa-hamburger" />
				&nbsp;
				<span>MaxFood</span>
			</Link>
			<div className={classes.address}>
				<i className="fas fa-map-marker-alt" />
				<Input
					type={'text'}
					placeholder={'Введите адрес'}
				/>
			</div>
			<Link to={'/auth'} className={classes.profile}>
				<i className="fas fa-user" />
				<span>Войти</span>
			</Link>
			<Link to={'/cart'} className={classes.cart}>
				<i className="fas fa-shopping-cart" />
				<span>Корзина</span>
			</Link>
		</div>
	)
}
