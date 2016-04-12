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
		tryAccessToken,
		cb 		=> { dispatch(types.LOGIN_SUCCESS, cb) },
		errorCb	=> { dispatch(types.LOGIN_FAILURE, errorCb)	}
	)
}

export const attemptUserRegistration = ({ dispatch }, payload) => {
	auth.postCreateRegisteredUser(
		payload, 
		cb 		=> { dispatch(types.REGISTARTION_SUCCESS, cb) },
		errorCb => { dispatch(types.REGISTARTION_FAILURE, errorCb) }
	)
}

export const attemptUserLogout = ({ dispatch }) => {
	auth.postDestroyAuthSession(
		cb 		=> { dispatch(types.LOGOUT_SUCCESS) },
		errorCb => { dispatch(types.LOGOUT_FAILURE) }
	)
}

