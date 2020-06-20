import React, { useState, Fragment } from 'react'
import axios from 'axios'
import Input from '../../components/UI/Input/Input'
import { createControl, validate, validateForm } from '../../utils/form/formFramework'
import Buttom from '../../components/UI/Button/Button'
import Select from '../../components/UI/Select/Select'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import fecthSpecs from '../../store/actions/spec'

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
			errorMessage: 'Введите описание',
		}, { required: true }),
		restaurateurId: createControl({
			type: 'text',
			label: 'Владелец',
			errorMessage: 'Введите владельца',
		}, { required: true }),
		imageURL: createControl({
			type: 'text',
			label: 'URL картинки',
			errorMessage: 'Введите URL',
		}, { required: true })
	}
}

const Rests = () => {
	const [state, setState] = useState({
		restaurant: {},
		formControls: createFromControls(),
		isFormValid: false
	})
	const { specs } = useSelector(state => ({
		specs: state.specs.specs
	}), shallowEqual)
	const dispatch = useDispatch()
	dispatch(fecthSpecs())

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
	const addRestaurantHandler = async () => {
		try {
			const restaurant = {
				name: state.formControls.name.value,
				description: state.formControls.description.value,
				restaurateurId: state.formControls.restaurateurId.value,
				imageURL: state.formControls.imageURL.value
			}
			await axios.post('https://maxfood-4cbb5.firebaseio.com/restaurants.json', restaurant)
			setState({
				formControls: createFromControls(),
			})
		} catch (error) {
			console.log(error)
		}
	}
	console.log(specs)
	return (
		<Fragment>
			<div className={'row'}>
				<h1 className={'col-12 text-center mb-3 mt-5'}>Рестораны</h1>
			</div>
			<div className={'row'}>
				<h2 className={'col-12 text-center mb-3 mt-3'}>Добавить ресторан</h2>
			</div>
		</Fragment>
		// <div className={'row'}>
		// 	<h1 className={'col-12 text-center mb-3 mt-5'}>Добавление ресторана</h1>
		// 	<form onSubmit={submitHandler} className={'col-sm-12 col-md-8 col-lg-6 mx-auto'}>
		// 		{renderInputs()}
		// 		<Select
		// 			label={'Специализация'}
		// 			value={'Specs'}
		// 			options={specs}
		// 		/>
		// 		<Buttom
		// 			onClick={addRestaurantHandler}
		// 			disabled={!state.isFormValid}
		// 		>Добавить
		// 			</Buttom>
		// 	</form>
		// </div>
	)
}

export default Rests
