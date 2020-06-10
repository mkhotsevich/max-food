import React, { useState } from 'react'
import classes from './AddDishPage.module.css'
import Input from '../../components/UI/Input/Input'
import { createControl, validate, validateForm} from '../../utils/form/formFramework'
import Select from '../../components/UI/Select/Select'
import Buttom from '../../components/UI/Button/Button'

function createFromControls() {
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
		structure: createControl({
			type: 'text',
			label: 'Состав',
			errorMessage: 'Введите состав',
		}, { required: true }),
		numberOfGrams: createControl({
			type: 'number',
			label: 'Количество грамм',
			errorMessage: 'Введите количество грамм',
		}, { required: true }),
		cost: createControl({
			type: 'number',
			label: 'Цена',
			errorMessage: 'Введите цену',
		}, { required: true }),
		restaurantId: createControl({
			type: 'text',
			label: 'Ресторан(УБРАТЬ)',
			errorMessage: 'Ресторан',
		}, { required: false }),
	}
}

export const AddDishPage = () => {

	const [state, setState] = useState({
		formControls: createFromControls(),
		isFormValid: false
	})


	const submitHandler = (event) => {
		event.preventDefault()
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
	const selectChangeHandler = event => {
		console.log(event.target.value);
	}
	const select = <Select
		label={'Тип блюда'}
		onChange={selectChangeHandler}
		options={[
			{text: '1', value: '1'},
			{text: '2', value: '2'},
			{text: '3', value: '3'},
			{text: '4', value: '4'}
		]}
	/>
	const addDishHandler = () => {
		
	}
	return (
		<div className={classes.AddDishPage}>
			<div>
				<h1>Добавление блюда</h1>
				<form onSubmit={submitHandler}>
					{renderInputs()}
					{select}
					<Buttom
						onClick={addDishHandler}
						disabled={!state.isFormValid}
					>Добавить</Buttom>
				</form>
			</div>
		</div>
	)
}