import React, { /*useContext, useEffect,*/ useState } from "react"
// import { useHttp } from "../../hooks/http.hook"
// import { useMessage } from "../../hooks/message.hook"
// import { AuthContext } from "../../context/AuthContext"
import classes from './AuthPage.module.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import is from 'is_js'

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


	// const auth = useContext(AuthContext)
	// const message = useMessage()
	// const { loading, request, error, clearError } = useHttp()
	// const [form, setForm] = useState({
	// 	email: '', password: ''
	// })
	// useEffect(() => {
	// 	message(error)
	// 	clearError()
	// }, [error, message, clearError])
	// const changeHandler = event => {
	// 	setForm({ ...form, [event.target.name]: event.target.value })
	// }



	const registerHandler = async () => {
		// try {
		// 	const data = await request('/api/auth/register', 'POST', { ...form })
		// 	message(data.message)
		// } catch (e) { }
	}
	const loginHandler = async () => {
		// try {
		// 	const data = await request('/api/auth/login', 'POST', { ...form })
		// 	auth.login(data.token, data.userId)
		// } catch (e) { }
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
