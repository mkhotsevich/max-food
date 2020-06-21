import React, { Fragment, useEffect } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { fetchRestaurantById } from '../store/actions/restaurant'
import Loader from '../components/UI/Loader/Loader'

const Restaurant = props => {
	const { rest, loading } = useSelector(state => ({
		rest: state.restaurants.restaurant,
		loading: state.restaurants.loading
	}), shallowEqual)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchRestaurantById(props.match.params.id))
	}, [])
	return (
		<Fragment>
			{loading ?
				<div className={'row d-flex flex-column justify-content-center align-items-center mt-5'}>
					<Loader />
				</div>
				:
				<Fragment>
					<div div className={'row'} >
						<h1 className={'col-12 text-center mb-3 mt-5'}>{rest.name}</h1>
					</div >
					<div className={'row'}>
						<div className={'col-12 col-md-6 mx-auto text-justify'}>
							{rest.description}
						</div>
					</div>
					<div className={'row'}>
					</div>
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
				</Fragment>
			}
		</Fragment>

	)
}

export default Restaurant
