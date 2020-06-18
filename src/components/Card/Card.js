import React from 'react'
import { Link } from 'react-router-dom'

export const Card = props => (
	<Link
		to={`/restaurant/${props.id}`}
		className={'card mb-4'}
	>
		<img
			src={props.imageURL}
			alt={props.name}
			className={'card-img-top'}
			style={{ height: '200px'}}
		/>
		<div className="card-body">
			<h5 class="card-title">{props.name}</h5>
			<h6 class="card-subtitle mb-2 text-muted">{props.type}</h6>
			<p className="card-text">
				{props.description}
			</p>
		</div>
	</Link>
)
