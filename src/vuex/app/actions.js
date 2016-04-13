import * as types from '../mutation-types'

export const setShowContactsPanel = (store, boolean) => {
	store.dispatch(types.SHOW_CONTACTS_PANEL, boolean)
}
