import React from "react"
import classes from './MainPage.module.css'
import Cart from "../../components/UI/Cart/Cart"
import Loader from '../../components/UI/Loader/Loader'
import { connect } from "react-redux"
import { fetchRestaurants } from '../../store/actions/restaurant'


class MainPage extends React.Component {
	componentDidMount() {
		this.props.fetchRestaurants()
	}
	renderRestaurants = () => {
		return this.props.restaurants.map((restaurant, index) => {
			return (
				<Cart
					key={restaurant.id + index}
					name={restaurant.name}
					description={restaurant.description}
					id={restaurant.id}
				/>
			)
		})
	}
	render() {
		return (
			<div className={classes.MainPage} >
				<div>
					<h1>Рестораны</h1>
					{this.props.loading && this.props.restaurants.length === 0 ?
						<div className={classes.LoaderWrap}><Loader /></div> :
						<div className={classes.restaurants}>
							{this.renderRestaurants()}
						</div>}
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
