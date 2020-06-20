import React, { Fragment, useState, useEffect } from 'react'
import Input from '../../components/UI/Input/Input'
import Buttom from '../../components/UI/Button/Button'
import Loader from '../../components/UI/Loader/Loader'
import { createControl, validate, validateForm } from '../../utils/form/formFramework'
import axios from '../../axios/axios'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import fetchSpecs from '../../store/actions/spec'

const Specs = props => {
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

	const { specs, loading } = useSelector(state => ({
		specs: state.specs.specs,
		loading: state.specs.loading
	}), shallowEqual)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchSpecs())
	}, [dispatch])

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
	const addSpecHandler = async () => {
		try {
			const spec = {
				name: state.formControls.name.value,
			}
			await axios.post('/specs.json', spec)
			setState({
				formControls: createFromControls(),
			})
			dispatch(fetchSpecs())
		} catch (error) {
			console.log(error)
		}
	}
	const deleteHandler = async (spec) => {
		try {
			const response = await axios.delete(`/specs/${spec.id}.json`)
			dispatch(fetchSpecs())
			console.log(response)
		} catch (error) {
			console.log(error)
		}
	}
	const renderSpecs = () => {
		try {
			return specs.map((spec) => {
				return (
					<div className={'row'} key={spec.id}>
						<div className={'col-sm-12 col-md-8 col-lg-6 mx-auto mb-2 d-flex justify-content-between'}>
							<span>{spec.name}</span>
							<button
								style={{
									outline: 'none',
									background: 'none',
									border: 'none'
								}}
								onClick={() => deleteHandler(spec)}
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
	return (
		<Fragment>
			<div className={'row'}>
				<h1 className={'col-12 text-center mb-3 mt-5'}>Cпециализация ресторанов</h1>
			</div>
			<div className={'row'}>
				<h2 className={'col-12 text-center mb-3 mt-3'}>Добавить специализацию</h2>
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
							onClick={addSpecHandler}
							disabled={!state.isFormValid}
						>Добавить
					</Buttom>
					</div>
				</div>
			</form>
			<div className={'row'}>
				<h2 className={'col-12 text-center mb-4 mt-4'}>Специализации</h2>
			</div>

			{loading ?
				<div className={'row'}>
					<div className={'col-12 text-center'}>
						<Loader />
					</div>
				</div> :
				renderSpecs()}
		</Fragment >
	)
}

export default Specs