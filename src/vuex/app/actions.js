import * as types from '../mutation-types'

export const setShowContactsPanel = ({ dispatch }, boolean) => {
	dispatch(types.SET_SHOW_CONTACTS_PANEL, boolean)
}
