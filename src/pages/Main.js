import React, { useEffect, Fragment, useState } from "react"
import { Card } from '../components/Card/Card'
import Loader from '../components/UI/Loader/Loader'
import { fetchRestaurants } from '../store/actions/restaurant'
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import Input from "../components/UI/Input/Input"
import fetchSpecs from "../store/actions/spec"

const Main = () => {
	const [localState, setState] = useState({
		search: '',
		filter: ''
	})
	const { restaurants, loading, specs } = useSelector(state => ({
		restaurants: state.restaurants.restaurants.filter(rest => {
			return rest.name.toLowerCase().includes(localState.search.trim().toLowerCase()) &&
				rest.spec.toLowerCase().includes(localState.filter.trim().toLowerCase())
		}),
		loading: state.restaurants.loading,
		specs: state.specs.specs
	}), shallowEqual)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchRestaurants())
		dispatch(fetchSpecs())
	}, [dispatch])
	const renderRestaurants = () => {
		return restaurants.map((restaurant) => {
			return (
				<div
					className={`col-sm-4`}
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
	const onChangeHandler = event => {
		setState({
			...localState,
			search: event.target.value
		})
		console.log(restaurants)
	}
	const renderFilters = () => {
		return specs.map((spec) => {
			return (
				<button
					className={`btn btn-outline-secondary mx-2 my-2 ${spec.name === localState.filter ? 'active' : null}`}
					key={spec.id}
					onClick={() => onFilterHandler(spec.name)}
				>
					{spec.name}
				</button>
			)
		})
	}
	const onFilterHandler = filter => {
		console.log(filter)
		setState({
			...localState,
			filter
		})
	}
	const resetFilter = () => {
		setState({
			...localState,
			filter: '',
			search: ''
		})
	}
	return (
		<Fragment>
			<div className={'row'}>
				<h1 className={'col-12 text-center mb-3 mt-5'}>Рестораны</h1>
			</div>
			<div className={'row'}>
				<div className={'col-12 col-md-6 mx-auto mb-3 mt-3'}>
					<Input
						value={localState.search}
						type={'text'}
						placeholder={'Поиск'}
						onChange={event => onChangeHandler(event)}
					/>
				</div>
			</div>
			<div className={'row'}>
				{renderFilters()}
				<button
					className={`btn btn-outline-danger mx-2 my-2`}
					onClick={() => resetFilter()}
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