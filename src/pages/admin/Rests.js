import React, { useState, Fragment, useEffect } from 'react'
import Input from '../../components/UI/Input/Input'
import { createControl, validate, validateForm } from '../../utils/form/formFramework'
import Buttom from '../../components/UI/Button/Button'
import Select from '../../components/UI/Select/Select'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import fecthSpecs from '../../store/actions/spec'
import { createRest, fetchRestaurants, deleteRest } from '../../store/actions/restaurant'
import Loader from '../../components/UI/Loader/Loader'
import { fetchUsers } from '../../store/actions/user'

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
		INN: createControl({
			type: 'number',
			label: 'ИНН',
			errorMessage: 'Некорректный ИНН',
		}, { required: true, length: 10 }),
		OGRN: createControl({
			type: 'number',
			label: 'ОГРН',
			errorMessage: 'Некорректный ОГРН',
		}, { required: true, length: 12 }),
		address: createControl({
			type: 'text',
			label: 'Адрес',
			errorMessage: '',
		}, { }),
		imageURL: createControl({
			type: 'text',
			label: 'URL картинки',
			errorMessage: 'Введите URL',
		}, { required: true })
	}
}

const Rests = () => {
	const [state, setState] = useState({
		formControls: createFromControls(),
		isFormValid: false,
		spec: '',
		owner: ''
	})
	const { specs, loading, rests, users } = useSelector(state => ({
		specs: state.specs.specs,
		loading: state.restaurants.loading,
		rests: state.restaurants.restaurants,
		users: state.user.users
	}), shallowEqual)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fecthSpecs())
		dispatch(fetchRestaurants())
		dispatch(fetchUsers())
	}, [dispatch])
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
		const restaurant = {
			name: state.formControls.name.value,
			description: state.formControls.description.value,
			INN: state.formControls.INN.value,
			OGRN: state.formControls.OGRN.value,
			address: state.formControls.address.value,
			owner: state.owner,
			imageURL: state.formControls.imageURL.value,
			spec: state.spec,
			dishes: []
		}
		dispatch(createRest(restaurant))
		dispatch(fetchRestaurants())
		setState({
			formControls: createFromControls(),
			isFormValid: false
		})
	}
	const selectTypeChangeHandler = event => {
		setState({
			...state,
			spec: event.target.value
		})
	}
	const selectOwnerChangeHandler = event => {
		setState({
			...state,
			owner: event.target.value
		})
	}
	const renderRests = () => {
		try {
			return rests.map((rest) => {
				return (
					<div className={'row'} key={rest.id}>
						<div className={'col-sm-12 col-md-8 col-lg-6 mx-auto mb-2 d-flex justify-content-between'}>
							<span>{rest.name}</span>
							<button
								style={{
									outline: 'none',
									background: 'none',
									border: 'none'
								}}
								onClick={() => deleteHandler(rest)}
							>
								&#65794;
						</button>
						</div>
					</div>
				)
			})
		} catch (error) {
			console.log(error)
		}
	}
	const deleteHandler = rest => {
		dispatch(deleteRest(rest))
	}
	const selectType = <Select
		label={'Специализация'}
		onChange={selectTypeChangeHandler}
		value={state.spec}
		options={specs}
	/>
	const selectOwner = <Select
		label={'Владелец'}
		onChange={selectOwnerChangeHandler}
		value={state.owner}
		options={users}
	/>
	return (
		<Fragment>
			<div className={'row'}>
				<h1 className={'col-12 text-center mb-3 mt-5'}>Рестораны</h1>
			</div>
			<div className={'row'}>
				<h2 className={'col-12 text-center mb-3 mt-3'}>Добавить ресторан</h2>
			</div>
			<div className={'row'}>
				<form onSubmit={submitHandler} className={'col-sm-12 col-md-8 col-lg-6 mx-auto'}>
					{renderInputs()}
					{selectOwner}
					{selectType}
					<Buttom
						onClick={addRestaurantHandler}
						disabled={!state.isFormValid}
					>Добавить
					</Buttom>
				</form>
			</div>
			<div className={'row'}>
				<h2 className={'col-12 text-center mb-4 mt-4'}>Список ресторанов</h2>
			</div>
			{loading ?
				<div className={'row'}>
					<div className={'col-12 text-center'}>
						<Loader />
					</div>
				</div> :
				renderRests()
			}
		</Fragment>
		
	)
}

export default Rests
