import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import Button from '../components/UI/Button/Button'
import Input from '../components/UI/Input/Input'
import { deleteDishFromCart, createOrder } from '../store/actions/cart'
import { createControl, validate, validateForm } from '../utils/form/formFramework'

const createFromControls = () => {
	return {
		name: createControl({
			type: 'text',
			label: 'Имя',
			errorMessage: 'Введите имя',
		}, { required: true }),
		address: createControl({
			type: 'text',
			label: 'Адрес',
			errorMessage: 'Введите адрес',
		}, { required: true })
	}
}
const Cart = () => {
	const [state, setState] = useState({
		formControls: createFromControls(),
		isFormValid: false
	})
	const { cart } = useSelector(state => ({
		cart: state.cart.dishes
	}), shallowEqual)
	const dispatch = useDispatch()
	const cartSum = () => {
		let sum = 0
		cart.forEach((c) => {
			sum = sum + +c.cost
		})
		return sum
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
	const renderCart = () => {
		return cart.map((dish, index) => {
			return (
				<div className={'row'} key={index}>
					<div className={'col-sm-12 col-md-8 col-lg-6 mx-auto mb-2 d-flex justify-content-between'}>
						<span>{dish.name}</span>
						<div>
							<span className={'mr-3'}>{dish.cost} ₽</span>
							<button
								style={{
									outline: 'none',
									background: 'none',
									border: 'none'
								}}
								onClick={() => deleteHandler(index)}
							>
								&#65794;
						</button>
						</div>
					</div>
				</div>
			)
		})
	}
	const deleteHandler = index => {
		dispatch(deleteDishFromCart(index))
	}
	const createOrderHandler = () => {
		const order = {
			date: new Date(),
			owner: state.formControls.name.value,
			address: state.formControls.address.value,
			dishes: cart
		}
		dispatch(createOrder(order))
		setState({
			formControls: createFromControls()
		})
	}
	const submitHandler = (event) => {
		event.preventDefault()
	}
	return (
		<Fragment>
			<div className={'row'}>
				<h1 className={'col-12 text-center mb-3 mt-5'}>Корзина</h1>
			</div>
			<div className={'row'}>
				<form onSubmit={submitHandler} className={'col-sm-12 col-md-8 col-lg-6 mx-auto'}>
					{renderInputs()}
				</form>
			</div>
			{
				cart.length !== 0 ?
					<Fragment>
						{renderCart()}
						<hr className={'col-sm-12 col-md-8 col-lg-6 mx-auto'} />
						<div className={'row'}>
							<div className={'col-sm-12 col-md-8 col-lg-6 mx-auto text-right'}>
								<Button
									onClick={() => createOrderHandler()}
									disabled={!state.isFormValid}
								>
									Заказать {cartSum()} ₽
								</Button>
							</div>
						</div>
					</Fragment>
					:
					<div className={'row mt-5'}>
						<div className={'col-12 text-center'}>
							Корзина пуста
						</div>
					</div>
			}
		</Fragment>
	)
}

export default Cart