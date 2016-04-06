import * as api from '../../api/auth'
import * as types from '../mutation-types'

export const toggleAuthForm = ({ dispatch }, form) => {
	dispatch(types.TOOGLE_AUTH_FORM, form)
}

export const toggleIsAuthenticated = ({ dispatch }) => {
	dispatch(types.TOGGLE_IS_AUTHENTICATED)
}

export const loginUser = ({ dispatch }, email, password) => {
	api.createAuthSession({ email, password }, res => {
		dispatch(types.LOGIN_USER, res)
	})
}

export const registerUser = ({ dispatch }, username, email, password) => {
	api.createNewUser({ username, email, password }, res => {
		dispatch(types.REGISTER_USER, res)
	})
}