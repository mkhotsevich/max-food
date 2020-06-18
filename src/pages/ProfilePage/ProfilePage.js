import React, { Fragment, useState, useEffect } from 'react'
import { createControl, validate, validateForm } from '../../utils/form/formFramework'
import Input from '../../components/UI/Input/Input'
import Buttom from '../../components/UI/Button/Button'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { fetchUsers } from '../../store/actions/user'


const createFromControls = () => {
	return {
		email: createControl({
			type: 'email',
			label: 'Email',
			errorMessage: 'Введите email',
			disabled: 'disabled'
		}, { required: true, email: true }),
		surname: createControl({
			type: 'text',
			label: 'Фамилия',
			errorMessage: 'Введите фимилию'
		}, { required: true }),
		name: createControl({
			type: 'text',
			label: 'Имя',
			errorMessage: 'Введите имя'
		}, { required: true }),
		patronymic: createControl({
			type: 'text',
			label: 'Отчество',
			errorMessage: 'Введите отчество'
		}, { required: true }),
		date: createControl({
			type: 'date',
			label: 'Дата рождения',
			errorMessage: 'Установите дату рождения'
		}, { required: true }),
	}
}

export const ProfilePage = props => {
	const [state, setState] = useState({
		formControls: createFromControls(),
	})
	const { userId, users } = useSelector(state => ({
		userId: state.auth.userId,
		users: state.user.users
	}), shallowEqual)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchUsers())
	}, [dispatch])

	const findUser = (userId, users) => {
		const user = users.find(user => user.userId === userId)
		return user
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
		findUser(userId, users)
		return Object.keys(state.formControls).map((controlName, index) => {
			const control = state.formControls[controlName]
			return (
				<div className={'row'} key={controlName + index}>
					<div className={'col-sm-12 col-md-8 col-lg-6 mx-auto'}>
						<Input
							value={control.value}
							type={control.type}
							label={control.label}
							errorMessage={control.errorMessage}
							valid={control.valid}
							touched={control.touched}
							shouldValidate={!!control.validation}
							disabled={control.disabled}
							onChange={event => onChangeHandler(event, controlName)}
						/>
					</div>
				</div>
			)
		})
	}
	const submitHandler = (event) => {
		event.preventDefault()
	}
	const saveUserHandler = () => {

	}
	return (
		<Fragment>
			<div className={'row'}>
				<h1 className={'col-12 text-center mb-4 mt-4'}>Профиль</h1>
			</div>
			<form onSubmit={submitHandler}>
				{renderInputs()}
				<div className={'row'}>
					<div className={'col-sm-12 col-md-8 col-lg-6 mx-auto'}>
						<Buttom
							onClick={saveUserHandler}
							disabled={!state.isFormValid}
						>Добавить
					</Buttom>
					</div>
				</div>
			</form>
		</Fragment>
	)
}
