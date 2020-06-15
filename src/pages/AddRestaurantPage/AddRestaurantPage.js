import React, { useState } from 'react'
import axios from 'axios'
import classes from './AddRestaurantPage.module.css'
import Input from '../../components/UI/Input/Input'
import { createControl, validate, validateForm } from '../../utils/form/formFramework'
import Buttom from '../../components/UI/Button/Button'
import { connect } from 'react-redux'

const AddRestaurantPage = () => {
	const createFromControls = () => {
		return {
			name: createControl({
				type: 'text',
				label: 'Название',
				errorMessage: 'Введите название',
			}, { required: true }),
			description: createControl({
				type: 'text',
				label: 'Описание',
				errorMessage: 'Описание должно быть меньше 20 символов',
			}, { required: true, maxLength: 20 }),
			restaurateurId: createControl({
				type: 'text',
				label: 'Владелец',
				errorMessage: 'Введите владельца',
			}, { required: true }),
		}
	}
	const [state, setState] = useState({
		formControls: createFromControls(),
		isFormValid: false
	})
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
	const AddRestaurantHandler = async () => {
		try {
			const restaurant = {
				name: state.formControls.name.value,
				description: state.formControls.description.value,
				restaurateurId: state.formControls.restaurateurId.value
			}
			await axios.post('https://maxfood-4cbb5.firebaseio.com/restaurants.json', restaurant)
			setState({
				formControls: createFromControls(),
			})
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className={classes.AddRestaurantPage}>
			<div>
				<h1>Добавление ресторана</h1>
				<form onSubmit={submitHandler}>
					{renderInputs()}
					<Buttom
						onClick={AddRestaurantHandler}
						disabled={!state.isFormValid}
					>Добавить</Buttom>
				</form>
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return {

	}
}
function mapDispatchToProps(dispatch) {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRestaurantPage)