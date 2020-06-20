import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, shallowEqual } from 'react-redux'

export const Navbar = () => {
	const { isAuthenticated, isAdmin } = useSelector(state => ({
		isAuthenticated: !!state.auth.token,
		isAdmin: state.auth.userId === 'rxSgS3FlNBb3kfoO630c8JvJB6O2',
		user: state.user.user
	}), shallowEqual)
	return (
		<nav className={'navbar navbar-expand-sm navbar-light bg-light fixed-top'} >
			<Link to={'/'} className={'navbar-brand'}>MaxFood</Link>
			<button
				className={'navbar-toggler'} type="button"
				data-toggle="collapse" data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
				<ul className="navbar-nav">
					
					{isAdmin ?
						<React.Fragment>
							<li className="nav-item">
								<NavLink to={'/admin/rests'} exact={true} className="nav-link">Рестораны</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to={'/admin/specs'} exact={true} className="nav-link">Cпециализации</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to={'/admin/menutype'} exact={true} className="nav-link">Типы пунктов меню</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to={'/admin/orders'} exact={true} className="nav-link">Заказы</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to={'/admin/dashboard'} exact={true} className="nav-link">Дашборд</NavLink>
							</li>
						</React.Fragment>
						:
						// user.type === 'owner' ?
						// 	<React.Fragment>
						// 		<li className="nav-item">
						// 			<NavLink to={'/'} exact={true} className="nav-link">Рестораны</NavLink>
						// 		</li>
						// 		<li className="nav-item">
						// 			<NavLink to={'/'} exact={true} className="nav-link">Добавить пункт меню</NavLink>
						// 		</li>
						// 	</React.Fragment>
						// 	:
							<li className="nav-item">
								<NavLink to={'/'} exact={true} className="nav-link">Рестораны</NavLink>
							</li>
					}
				</ul>
				<ul className="navbar-nav">
					{!isAdmin ?
						isAuthenticated ?
							<React.Fragment>
								<li className="nav-item">
									<NavLink to={'/cart'} className="nav-link">Корзина: 1000 ₽</NavLink>
								</li>
							<li className="nav-item">
								<NavLink to={'/profile'} className="nav-link">Профиль</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to={'/logout'} className="nav-link">Выйти</NavLink>
							</li>
						</React.Fragment>
							:
							<React.Fragment>
								<li className="nav-item">
									<NavLink to={'/cart'} className="nav-link">Корзина: 1000 ₽</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to={'/auth'} className="nav-link">Авторизация</NavLink>
								</li>
							</React.Fragment>
						:
						<li className="nav-item">
							<NavLink to={'/logout'} className="nav-link">Выйти</NavLink>
						</li>
					}
				</ul>
			</div>
		</nav>
	)
}
