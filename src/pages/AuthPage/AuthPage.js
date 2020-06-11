import React, { useState } from "react"
import classes from './AuthPage.module.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import is from 'is_js'
import axios from 'axios'

export const AuthPage = () => {
	const [state, setState] = useState({
		isFormValid: false,
		formControls: {
			email: {
				value: '',
				type: 'email',
				label: 'Email',
				errorMessage: 'Введите email',
				valid: false,
				touched: false,
				validation: {
					required: true,
					email: true
				}
			},
			password: {
				value: '',
				type: 'password',
				label: 'Пароль',
				errorMessage: 'Минимальная длина пароля 6 символов',
				valid: false,
				touched: false,
				validation: {
					required: true,
					minLength: 6
				}
			}
		}
	})
	const registerHandler = async () => {
		const authData = {
			email: state.formControls.email.value,
			password: state.formControls.password.value,
			returnSecureToken: true
		}
		try {
			const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhXnChN06UbNjWgiv1pymVb-uJvjadlvg', authData)
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	}
	const loginHandler = async () => {
		const authData = {
			email: state.formControls.email.value,
			password: state.formControls.password.value,
			returnSecureToken: true
		}
		try {
			const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhXnChN06UbNjWgiv1pymVb-uJvjadlvg', authData)
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	}
	const submitHandler = (event) => {
		event.preventDefault()
	}
	const validateControl = (value, validation) => {
		if (!validation) {
			return true
		}
		let isValid = true
		if (validation.required) {
			isValid = value.trim() !== '' && isValid
		}
		if (validation.email) {
			isValid = is.email(value) && isValid
		}
		if (validation.minLength) {
			isValid = value.length >= validation.minLength && isValid
		}
		return isValid
	}
	const onChangeHandler = (event, controlName) => {
		const formControls = { ...state.formControls }
		const control = { ...formControls[controlName] }
		let isFormValid = true
		control.value = event.target.value
		control.touched = true
		control.valid = validateControl(control.value, control.validation)
		formControls[controlName] = control
		Object.keys(formControls).forEach(name => {
			isFormValid = formControls[name].valid && isFormValid
		})
		setState({ formControls, isFormValid })
	}
	const renderInputs = () => {
		return Object.keys(state.formControls).map((controlName, index) => {
			const control = state.formControls[controlName]
			return (
				<Input
					key={controlName + index}
					value={control.value}
					type={control.type}
					label={control.label}
					errorMessage={control.errorMessage}
					valid={control.valid}
					touched={control.touched}
					shouldValidate={!!control.validation}
					onChange={event => onChangeHandler(event, controlName)}
				/>
			)
		})
	}
	return (
		<div className={classes.AuthPage}>
			<div>
				<h1>Авторизация</h1>
				<form onSubmit={submitHandler} className={classes.AuthForm}>
					{renderInputs()}
					<div>
						<Button
							onClick={loginHandler}
							disabled={!state.isFormValid}
						>Войти</Button>
						<Button
							onClick={registerHandler}
							disabled={!state.isFormValid}
						>Регистрация</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
