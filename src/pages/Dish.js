import React, { useState, Fragment, useEffect } from 'react'
import Input from '../components/UI/Input/Input'
import { createControl, validate, validateForm } from '../utils/form/formFramework'
import Select from '../components/UI/Select/Select'
import Buttom from '../components/UI/Button/Button'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { fetchRestaurantById, createDish, deleteDish } from '../store/actions/restaurant'
import { fetchMenuTypes } from '../store/actions/menutypes'
import Loader from '../components/UI/Loader/Loader'

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
		}, { required: true })
	}
}

const Dish = props => {
	const [state, setState] = useState({
		formControls: createFromControls(),
		isFormValid: false,
		menutype: ''
	})
	const { rest, menutypes, loading } = useSelector(state => ({
		rest: state.restaurants.restaurant,
		menutypes: state.menutypes.menutypes,
		loading: state.restaurants.loading
	}), shallowEqual)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchMenuTypes())
		dispatch(fetchRestaurantById(props.match.params.id))
	}, [])

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
		setState({
			...state,
			menutype: event.target.value
		})
	}
	const select = <Select
		label={'Тип блюда'}
		onChange={selectChangeHandler}
		value={state.menutype}
		options={menutypes}
	/>
	const addDishHandler = () => {
		const dish = {
			name: state.formControls.name.value,
			description: state.formControls.description.value,
			structure: state.formControls.structure.value,
			numberOfGrams: state.formControls.numberOfGrams.value,
			cost: state.formControls.cost.value,
			menutype: state.menutype,
		}

		dispatch(createDish(dish, props.match.params.id))
		// dispatch(fetchRestaurants())
		setState({
			formControls: createFromControls(),
			isFormValid: false
		})
	}
	const renderDishes = () => {
		try {
			return Object.values(rest.dishes).map((dish, index) => {
				return (
					<div className={'row'} key={index}>
						<div className={'col-sm-12 col-md-8 col-lg-6 mx-auto mb-2 d-flex justify-content-between'}>
							<span>{dish.name}</span>
							<button
								style={{
									outline: 'none',
									background: 'none',
									border: 'none'
								}}
								onClick={() => deleteHandler(dish)}
							>
								&#65794;
						</button>
						</div>
					</div>
				)
			})
		} catch (error) {
		}
	}
	const deleteHandler = (dish) => {
		dispatch(deleteDish(dish, props.match.params.id))
	}
	return (
		<Fragment>
			<div className={'row'}>
				<h1 className={'col-12 text-center mb-3 mt-5'}>Блюда ресторана {rest.name}</h1>
			</div>
			<div className={'row'}>
				<h2 className={'col-12 text-center mb-3 mt-3'}>Добавить блюдо</h2>
			</div>
			<div className={'row'}>
				<form onSubmit={submitHandler} className={'col-sm-12 col-md-8 col-lg-6 mx-auto'}>
					{renderInputs()}
					{select}
					<Buttom
						onClick={addDishHandler}
						disabled={!state.isFormValid}
					>Добавить
					</Buttom>
				</form>
			</div>
			<div className={'row'}>
				<h2 className={'col-12 text-center mb-4 mt-4'}>Список блюд</h2>
			</div>
			{loading ?
				<div className={'row'}>
					<div className={'col-12 text-center'}>
						<Loader />
					</div>
				</div> :
				renderDishes()
			}
		</Fragment>
	)
}

export default Dish