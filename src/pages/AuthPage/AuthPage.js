import React, { useState } from "react"
import classes from './AuthPage.module.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import is from 'is_js'
import { connect } from "react-redux"
import auth from '../../store/actions/auth'

const AuthPage = props => {
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
	const registerHandler = () => {
		props.auth(
			state.formControls.email.value,
			state.formControls.password.value,
			false
		)
	}
	const loginHandler = () => {
		props.auth(
			state.formControls.email.value,
			state.formControls.password.value,
			true
		)
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

function mapDispathToProps(dispatch) {
	return {
		auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
	}
}

export default connect(null, mapDispathToProps)(AuthPage)