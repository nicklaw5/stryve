import * as types from '../mutation-types'
import { resetActiveServer, disconnectFromSocketServer } from '../servers/actions'

export const switchChannelsPanel = (store, panel) => {
	store.dispatch(types.SWITCH_CHANNELS_PANEL, panel)
	
	if(panel === 'contacts') {
		resetActiveServer(store)
		disconnectFromSocketServer(store)
	}
}