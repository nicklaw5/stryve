import * as api from '../../api/auth'
import * as types from '../mutation-types'

export const toggleIsRegistering = ({ dispatch }) => {
	dispatch(types.TOGGLE_IS_REGISTERING)
}

export const loginUser = ({ dispatch }, email, password) => {
	api.createAuthSession({ email, password }, response => {
		dispatch(types.LOGIN_USER, response)
	})
}