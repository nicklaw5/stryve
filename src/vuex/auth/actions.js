import * as api from '../../api/auth'
import * as types from '../mutation-types'

export const toggleAuthForm = ({ dispatch }, form) => {
	dispatch(types.TOOGLE_AUTH_FORM, form)
}

// export const toggleIsAuthenticated = ({ dispatch }) => {
// 	dispatch(types.TOGGLE_IS_AUTHENTICATED)
// }

export const attemptUserLogin = ({ dispatch }, payload) => {
	api.createAuthSession(payload, response => {
		if(response.code === 200) {
			dispatch(types.TOGGLE_IS_AUTHENTICATED)
			dispatch(types.SET_ACCESS_TOKEN, response.response.token)
			return 'sasas';
		} else {
			// throw error here
		}
	})
}

export const attemptUserRegistration = ({ dispatch }, payload) => {
	api.createNewUser(payload, response => {
		dispatch(types.REGISTER_USER, response)
	})
}
