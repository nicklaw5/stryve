import * as types from '../mutation-types'
import { resetActiveServer } from '../servers/actions'

export const switchChannelsPanel = (store, panel) => {
	if(panel === 'contacts') {
		resetActiveServer(store)
	}
	store.dispatch(types.SWITCH_CHANNELS_PANEL, panel)
}