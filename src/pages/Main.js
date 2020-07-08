import React, { useEffect, Fragment, useState } from "react"
import { Card } from '../components/Card/Card'
import Loader from '../components/UI/Loader/Loader'
import { fetchRestaurants } from '../store/actions/restaurant'
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import Input from "../components/UI/Input/Input"
import fetchSpecs from "../store/actions/spec"

const Main = () => {
	const [search, setSearch] = useState('')
	const [filter, setFilter] = useState('')

	const { restaurants, loading, specs } = useSelector(state => ({
		restaurants: state.restaurants.restaurants.filter(rest => {
			return rest.name.toLowerCase().includes(search.trim().toLowerCase()) &&
				rest.spec.toLowerCase().includes(filter.trim().toLowerCase())
		}),
		loading: state.restaurants.loading,
		specs: state.specs.specs
	}), shallowEqual)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchRestaurants())
		dispatch(fetchSpecs())
	}, [])

	const renderRestaurants = () => {
		return restaurants.map((restaurant) => {
			return (
				<div
					className={`col-12 col-sm-6 col-md-6 col-lg-4 mb-4`}
					key={restaurant.id}
				>
					<Card
						imageURL={restaurant.imageURL}
						name={restaurant.name}
						description={restaurant.description}
						id={restaurant.id}
					/>
				</div>
			)
		})
	}

	const renderFilters = () => {
		return specs.map((spec) => {
			return (
				<button
					className={`btn btn-outline-secondary mx-2 my-2 ${spec.name === filter ? 'active' : null}`}
					key={spec.id}
					onClick={() => setFilter(spec.name)}
				>
					{spec.name}
				</button>
			)
		})
	}
	
	const resetFilter = () => {
		setFilter('')
		setSearch('')
	}

	return (
		<Fragment>
			<div className={'row'}>
				<h1 className={'col-12 text-center mb-3 mt-5'}>Рестораны</h1>
			</div>
			<div className={'row'}>
				<div className={'col-12 col-md-6 mx-auto my-3'}>
					<Input
						value={search}
						type={'text'}
						label={'Поиск'}
						onChange={event => setSearch(event.target.value)}
					/>
				</div>
			</div>
			<div className={'row'}>
				{renderFilters()}
				<button
					className={`btn btn-outline-danger mx-2 my-2`}
					onClick={resetFilter}
				>
					Сброс
				</button>
			</div>
			<div className={'row'}>
				{loading ?
					<div className={'mx-auto'}><Loader /></div>
					:
					renderRestaurants()
				}
			</div>
		</Fragment>
	)
}

export default Main