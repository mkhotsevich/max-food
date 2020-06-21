import React, { Fragment, useEffect } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { fetchRestaurantById } from '../store/actions/restaurant'
import Loader from '../components/UI/Loader/Loader'
import Button from '../components/UI/Button/Button'
import { addToCart } from '../store/actions/cart'

const Restaurant = props => {
	const { rest, loading } = useSelector(state => ({
		rest: state.restaurants.restaurant,
		loading: state.restaurants.loading
	}), shallowEqual)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchRestaurantById(props.match.params.id))
	}, [])
	const renderDishes = () => {
		try {
			return Object.values(rest.dishes).map((dish, index) => {
				return (
					<div
						className={`col-sm-4`}
						key={index}
					>
						<div className={'card mb-4 text-decoration-none text-body'}>
							<img
								src={dish.imageURL}
								alt={dish.name}
								style={{ height: '150px', margin: '10px auto auto auto' }}
							/>
							<div className="card-body">
								<h3 className="card-title text-center">{dish.name}</h3>
								<h6 className="card-subtitle mb-2 text-muted">{dish.description}</h6>
								<p className={'card-text'}>{dish.structure}</p>
								<span className="badge badge-light">{dish.numberOfGrams} г</span>
							</div>
							<div className="card-footer bg-transparent d-flex justify-content-between align-items-center">
								<span className={'h3'}>{dish.cost} ₽</span>
								<Button
									onClick={() => addToCartHandler(dish)}
								>
									В корзину
								</Button>
							</div>
						</div>
					</div>
				)
			})
		} catch (e) {

		}

	}
	const addToCartHandler = dish => {
		dispatch(addToCart(dish))
	}
	return (
		<Fragment>
			{loading ?
				<div className={'row d-flex flex-column justify-content-center align-items-center mt-5'}>
					<Loader />
				</div>
				:
				<Fragment>
					<div className={'row'} >
						<h1 className={'col-12 text-center mb-3 mt-5'}>{rest.name}</h1>
					</div >
					<div className={'row'}>
						<div className={'col-12 col-md-6 mx-auto text-justify my-3 '}>
							{rest.description}
						</div>
					</div>
					<div className={'row'}>
						{renderDishes()}
					</div>
					<div className={'bg-light p-3'}>
						<div className={'row'}>
							<div className={'col-6'}>
								<span className="badge badge-pill badge-light">ИНН: {rest.INN}</span>
							</div>
							<div className={'col-6 d-flex justify-content-end'}>
								<span className="badge badge-pill badge-light">Специализация: {rest.spec}</span>
							</div>
						</div>
						<div className={'row'}>
							<div className={'col-12'}>
								<span className="badge badge-pill badge-light">ОГРН: {rest.OGRN}</span>
							</div>
						</div>
						<div className={'row'}>
							<div className={'col-12'}>
								<span className="badge badge-pill badge-light">Адрес: {rest.address}</span>
							</div>
						</div>
					</div>
				</Fragment>
			}
		</Fragment>

	)
}

export default Restaurant
