import * as types from '../mutation-types'
import { resetActiveServer, disconnectFromServerSocket } from '../servers/actions'

export const setNoticeMessage = (store, tone, message) => {
	store.dispatch(types.SET_NOTICE_MESSAGE, tone, message)
}

export const switchChannelsPanel = (store, panel) => {
	store.dispatch(types.SWITCH_CHANNELS_PANEL, panel)
}

export const showModal = (store, modal) => {
	store.dispatch(types.SHOW_MODAL, modal)
}

export const hideModal = (store, modal) => {
	setNoticeMessage(store, '', '')
	store.dispatch(types.HIDE_MODAL, modal)
}

export const toggleServerMenu = (store, forceState) => {
	store.dispatch(types.TOGGLE_SERVER_MENU, forceState)
}