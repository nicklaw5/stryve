import * as types from '../mutation-types'
import { resetActiveServer, disconnectFromSocketServer } from '../servers/actions'

export const setNoticeMessage = (store, tone, message) => {
	store.dispatch(types.SET_NOTICE_MESSAGE, tone, message)
}

export const switchChannelsPanel = (store, panel) => {
	store.dispatch(types.SWITCH_CHANNELS_PANEL, panel)
	
	if(panel === 'contacts') {
		resetActiveServer(store)
		disconnectFromSocketServer(store)
	}
}