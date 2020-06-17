import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, shallowEqual } from 'react-redux'

export const Navbar = () => {
	const { isAuthenticated, isAdmin } = useSelector(state => ({
		isAuthenticated: !!state.auth.token,
		isAdmin: state.auth.userId === 'rxSgS3FlNBb3kfoO630c8JvJB6O2'
	}), shallowEqual)
	return (
		<nav className={'navbar navbar-expand-sm navbar-light bg-light'} >
			<Link to={'/'} className={'navbar-brand'}>MaxFood</Link>
			<button
				className={'navbar-toggler'} type="button"
				data-toggle="collapse" data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
				<ul className="navbar-nav">
					<li className="nav-item">
						<NavLink to={'/'} exact={true} className="nav-link">Рестораны</NavLink>
					</li>
					{isAdmin &&
						<React.Fragment>
							<li className="nav-item">
								<NavLink to={'/addrestaurant'} exact={true} className="nav-link">Добавить ресторан</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to={'/addspeс'} exact={true} className="nav-link">Добавить специализацию</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to={'/dashboard'} exact={true} className="nav-link">Дашборд</NavLink>
							</li>
						</React.Fragment>
					}
				</ul>
				<ul className="navbar-nav">
					{isAuthenticated ?
						<li className="nav-item dropdown">
							<span
								className="nav-link dropdown-toggle" id="navbarDropdown"
								role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Профиль
							</span>
							<div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
								<NavLink to={'/profile'} className="dropdown-item">Личные данные</NavLink>
								<NavLink to={'/orders'} className="dropdown-item">Заказы</NavLink>
								<div className="dropdown-divider"></div>
								<Link to={'/logout'} className="dropdown-item">Выйти</Link>
							</div>
						</li>
						:
						<li className="nav-item">
							<NavLink to={'/auth'} className="nav-link">Авторизация</NavLink>
						</li>
					}
					<li className="nav-item">
						<NavLink to={'/cart'} className="nav-link">Корзина: 1000 ₽</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	)
}
