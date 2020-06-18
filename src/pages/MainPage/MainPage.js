import React from "react"
import classes from './MainPage.module.css'
import { Card } from '../../components/Card/Card'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from "react-redux"
import { fetchRestaurants } from '../../store/actions/restaurant'


class MainPage extends React.Component {
	componentDidMount() {
		this.props.fetchRestaurants()
	}
	renderRestaurants = () => {
		return this.props.restaurants.map((restaurant) => {
			return (
				<div
					className={'col-sm-4'}
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
	render() {
		return (
			<div className={classes.MainPage} >
				<h1 className={'text-center mt-4 mb-4'}>Рестораны</h1>
				<div className={'row'}>
					{this.props.loading || this.props.restaurants.length === 0 ?
						<div className={classes.LoaderWrap}><Loader /></div> :
						this.renderRestaurants()}
				</div>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		restaurants: state.restaurants.restaurants,
		loading: state.restaurants.loading
	}
}
function mapDispatchToProps(dispatch) {
	return {
		fetchRestaurants: () => dispatch(fetchRestaurants())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
