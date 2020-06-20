import is from 'is_js'

export function createControl(config, validation) {
	return {
		...config,
		validation,
		valid: !validation,
		touched: false,
		value: ''
	}
}
export function validate(value, validation = null) {
	if (!validation) {
		return true
	}
	let isValid = true

	if (validation.required) {
		isValid = value.trim() !== '' && isValid
	}
	if (validation.email) {
		isValid = is.email(value) && isValid
	}
	if (validation.minLength) {
		isValid = value.length >= validation.minLength && isValid
	}
	if (validation.maxLength) {
		isValid = value.length <= validation.maxLength && isValid
	}
	if (validation.length) {
		isValid = value.length === validation.length && isValid
	}

	return isValid
}
export function validateForm(formControls) {
	let isFormValid = true
	Object.keys(formControls).forEach(name => {
		isFormValid = formControls[name].valid && isFormValid
	})
	return isFormValid
}