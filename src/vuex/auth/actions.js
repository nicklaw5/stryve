import * as types from '../mutation-types'
import * as auth from '../../api/auth'
import * as users from '../../api/users'
import * as codes from '../../utils/response-codes'

export const setAuthMessage = ({ dispatch }, tone, message) => {
	dispatch(types.SET_AUTH_MESSAGE, tone, message)
}

export const toggleAuthForm = ({ dispatch }, form) => {
	dispatch(types.TOOGLE_AUTH_FORM, form)
}

export const attemptUserAutomatedLogin = ({ dispatch }) => {
	users.getUserSelf(res => {
		if(res.code === codes.OK) {
			dispatch(types.SET_USER, res.response)
		} else {
			dispatch(types.SET_AUTH_MESSAGE, 'danger', 'Your session has expired. Log back in.')
			dispatch(types.DESTROY_ACCESS_TOKEN)
		}
	})
}

// export const attemptUserLogin = ({ dispatch }, payload) => {
// 	// create auth session with api server and get access token
// 	auth.postCreateAuthSession(payload, res => {
// 		if(res.code === codes.CREATED) {
// 			// save access token to localStorage
// 			dispatch(types.AUTHENTICATE_USER, res.response)
// 			// get the authenticated users info
// 			users.getUserSelf(res => {
// 				if(res.code === codes.OK) {
// 					// save user info to state
// 					dispatch(types.SET_USER, res.response)
// 				}
// 			})
// 		}
// 	})
// }

export const attemptUserLogin = ({ dispatch }, payload, tryAccessToken) => {
	// create auth session with api server and get access token
	auth.postCreateAuthSession(
		payload,
		tryAccessToken? true : false,
		succes 	=> { dispatch(types.LOGIN_SUCCESS, succes.token) },
		error 	=> { dispatch(types.LOGIN_FAILURE, error.errorMessage) }
	)
}

export const attemptUserLogout = ({ dispatch }, event) => {
	// attempt to destroy session with api server
	auth.postDestroyAuthSession(res => {
		// Destroy access token and change isAuthenticated = false.
		// Do this no matter what the api response is.
		// If it fails we don't care, we still want to ...
		// destroy the access token
		dispatch(types.LOGOUT_USER)
	})
}

export const attemptUserRegistration = ({ dispatch }, payload) => {
	auth.postCreateNewUser(payload, res => {
		if(res.code === codes.CREATED)
			dispatch(types.AUTHENTICATE_USER, res.response)
		else
			dispatch(types.SET_AUTH_MESSAGE, 'danger', res.response.errorMessage)
	})
}
