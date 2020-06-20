import React, { Fragment, useEffect } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { fetchRestaurants } from '../../store/actions/restaurant'
import Loader from '../../components/UI/Loader/Loader'
import { fetchUsers } from '../../store/actions/user'

const Dashboard = () => {
	const { rests, loading, users } = useSelector(state => ({
		rests: state.restaurants.restaurants,
		loading: state.restaurants.loading,
		users: state.user.users
	}), shallowEqual)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchRestaurants())
		dispatch(fetchUsers())
	}, [dispatch])
	return (
		<Fragment>
			<div className={'row'}>
				<h1 className={'col-12 text-center mb-3 mt-5'}>Дашборд</h1>
			</div>
			<div className={'row'}>
				<div className={'col-12 col-md-4 mb-2'}>
					<div className="card" style={{ height: '200px' }}>
						<div className="card-body">
							<h5 className="card-title text-center">Количество ресторанов</h5>
							<p className="card-text align-items-center h1 h-100 d-flex flex-column justify-content-center pb-5">
								{loading ?
									<Loader />
									:
									rests.length}
							</p>
						</div>
					</div>
				</div>
				<div className={'col-12 col-md-4 mb-2'}>
					<div className="card" style={{ height: '200px' }}>
						<div className="card-body">
							<h5 className="card-title text-center">Количество заказов</h5>
							<p className="card-text align-items-center h1 h-100 d-flex flex-column justify-content-center pb-5">
								0
						</p>
						</div>
					</div>
				</div>
				<div className={'col-12 col-md-4 mb-2'}>
					<div className="card" style={{ height: '200px' }}>
						<div className="card-body">
							<h5 className="card-title text-center">Количество клиентов</h5>
							<p className="card-text align-items-center h1 h-100 d-flex flex-column justify-content-center pb-5">
								{loading ?
									<Loader />
									:
									users.length}
							</p>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default Dashboard