import React from 'react'
import classes from './Select.module.css'

const Select = props => {
	const htmlFor = `${props.label}-${Math.random()}`
	return (
		<div className={classes.Select}>
			<label htmlFor={htmlFor}>{props.label}</label>
			<select
				id={htmlFor}
				value={props.value}
				onChange={props.onChange}
			>
				{props.options.map((option, index) => {
					return (
						<option
							value={option.name || option.email}
							key={(option.name || option.email) + index}
						>
							{option.name || option.email}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default Select