import React, { useState } from "react"
import classes from './AuthPage.module.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { useDispatch, useSelector } from "react-redux"
import auth from '../../store/actions/auth'
import { createControl, validate, validateForm } from '../../utils/form/formFramework'

const createFromControls = () => {
	return {
		email: createControl({
			type: 'text',
			label: 'Email',
			errorMessage: 'Введите email',
			mandatory: false
		}, { required: true, email: true }),
		password: createControl({
			type: 'password',
			label: 'Пароль',
			errorMessage: 'Минимальная длина пароля 6 символов'
		}, { required: true, minLength: 6 })
	}
}

const AuthPage = props => {
	const [state, setState] = useState({
		isFormValid: false,
		formControls: createFromControls()
	})

	const { error } = useSelector(state => ({
		error: state.auth.error
	}))

	const dispatch = useDispatch()

	const registerHandler = () => {
		dispatch(auth(
			state.formControls.email.value,
			state.formControls.password.value,
			false,
			'user'
		))
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

	const onChangeHandler = (event, controlName) => {
		const formControls = { ...state.formControls }
		const control = { ...formControls[controlName] }

		control.value = event.target.value
		control.touched = true
		control.valid = validate(control.value, control.validation)

		formControls[controlName] = control

		setState({
			formControls,
			isFormValid: validateForm(formControls)
		})
	}

	const renderInputs = () => {
		return Object.keys(state.formControls).map((controlName, index) => {
			const control = state.formControls[controlName]
			return (
				<Input
					key={index}
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

export default AuthPage