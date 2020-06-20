import React, { Fragment, useState, useEffect } from 'react'
import Input from '../../components/UI/Input/Input'
import Buttom from '../../components/UI/Button/Button'
import Loader from '../../components/UI/Loader/Loader'
import { createControl, validate, validateForm } from '../../utils/form/formFramework'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { createMenuType, fetchMenuTypes, deleteMenuType } from '../../store/actions/menutypes'

const MenuTypes = () => {
	const createFromControls = () => {
		return {
			name: createControl({
				type: 'text',
				label: 'Название',
				errorMessage: 'Введите название'
			}, { required: true })
		}
	}
	const [state, setState] = useState({
		formControls: createFromControls(),
		isFormValid: false
	})
	const { loading, menuTypes } = useSelector(state => ({
		loading: state.menutypes.loading,
		menuTypes: state.menutypes.menutypes
	}), shallowEqual)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchMenuTypes())
	}, [dispatch])
	const addMenuTypeHandler = () => {
		setState({
			formControls: createFromControls(),
			isFormValid: false
		})
		const item = {
			name: state.formControls.name.value
		}
		dispatch(createMenuType(item))
	}
	const renderMenuTypes = () => {
		try {
			return menuTypes.map((menuType) => {
				return (
					<div className={'row'} key={menuType.id}>
						<div className={'col-sm-12 col-md-8 col-lg-6 mx-auto mb-2 d-flex justify-content-between'}>
							<span>{menuType.name}</span>
							<button
								style={{
									outline: 'none',
									background: 'none',
									border: 'none'
								}}
								onClick={() => deleteHandler(menuType)}
							>
								&#65794;
						</button>
						</div>
					</div>
				)
			})
		} catch (error) {
			console.log(error)
		}
	}
	const deleteHandler = menuType => {
		dispatch(deleteMenuType(menuType))
	}
	const onChangeHandler = event => {
		const formControls = { ...state.formControls }
		const name = { ...formControls.name }
		name.value = event.target.value
		name.touched = true
		name.valid = validate(name.value, name.validation)
		formControls.name = name
		setState({
			formControls,
			isFormValid: validateForm(formControls)
		})
	}
	const submitHandler = event => {
		event.preventDefault()
	}
	return (
		<Fragment>
			<div className={'row'}>
				<h1 className={'col-12 text-center mb-3 mt-5'}>Типы пунктов меню</h1>
			</div>
			<div className={'row'}>
				<h2 className={'col-12 text-center mb-3 mt-3'}>Добавить тип пункта меню</h2>
			</div>
			<form onSubmit={submitHandler}>
				<div className={'row'}>
					<div className={'col-sm-12 col-md-8 col-lg-6 mx-auto'}>
						<Input
							value={state.formControls.name.value}
							type={state.formControls.name.type}
							label={state.formControls.name.label}
							errorMessage={state.formControls.name.errorMessage}
							valid={state.formControls.name.valid}
							touched={state.formControls.name.touched}
							shouldValidate={!!state.formControls.name.validation}
							onChange={event => onChangeHandler(event)}
						/>
					</div>
				</div>
				<div className={'row'}>
					<div className={'col-sm-12 col-md-8 col-lg-6 mx-auto'}>
						<Buttom
							onClick={addMenuTypeHandler}
							disabled={!state.isFormValid}
						>Добавить
					</Buttom>
					</div>
				</div>
			</form>
			<div className={'row'}>
				<h2 className={'col-12 text-center mb-3 mt-3'}>Типы пунктов меню</h2>
			</div>

			{loading ?
				<div className={'row'}>
					<div className={'col-12 text-center'}>
						<Loader />
					</div>
				</div>
				:
				renderMenuTypes()
			}
		</Fragment>
	)
}

export default MenuTypes