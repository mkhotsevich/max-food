import React, { Fragment, useEffect } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import Button from '../components/UI/Button/Button'
import { deleteDishFromCart } from '../store/actions/cart'

const Cart = () => {
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
		
	}
	return (
		<Fragment>
			<div className={'row'}>
				<h1 className={'col-12 text-center mb-3 mt-5'}>Корзина</h1>
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