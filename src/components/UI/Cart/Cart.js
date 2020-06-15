import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Cart.module.css'

const Cart = props => {
	return (
		<Link to={`/${props.name.toLowerCase()}`} className={classes.Cart}>
			<div>
				<img alt={props.name}/>
				<h3>{props.name}</h3>
				<p>{props.description}</p>
			</div>
		</Link>
	)
}

export default Cart