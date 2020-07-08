import React from 'react'
import { Link } from 'react-router-dom'

export const Card = props => (
	<Link
		to={`/restaurant/${props.id}`}
		className={'card text-decoration-none text-body'}
	>
		<img
			src={props.imageURL}
			alt={props.name}
			style={{ height: '200px', margin: '10px auto auto auto'}}
		/>
		<div className="card-body">
			<h3 className="card-title text-center">{props.name}</h3>
			<h6 className="card-subtitle mb-2 text-muted">{props.type}</h6>
		</div>
	</Link>
)
