import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Card.module.css'

export const Card = props => (
	<Link
		to={`/restaurant/${props.name}`}
		className={classes.Card}
	>
		<div>
			<img src={props.imageUrl} alt={props.name} />
			<h3>{props.name}</h3>
			<p>{props.description}</p>
		</div>
	</Link>
)
