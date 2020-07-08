import React, { Fragment } from 'react'
import classes from './Input.module.css'

function isInvalid({ valid, touched, shouldValidate }) {
	return !valid && touched && shouldValidate
}

const Input = props => {
	const inputType = props.type || 'text'
	const htmlFor = `${inputType}-${Math.random()}`
	return (
		<div className={classes.Input}>
			<input
				type={inputType}
				id={htmlFor}
				placeholder={props.label}
				value={props.value}
				onChange={props.onChange}
				disabled={props.disabled}
				required={props.mandatory}
			/>
			<label htmlFor={htmlFor}>{props.label}</label>
			{isInvalid(props) && <span>{props.errorMessage}</span>}
		</div>
	)
}

export default Input