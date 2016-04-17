import * as types from '../mutation-types'
import { resetActiveServer } from '../servers/actions'

export const switchChannelsPanel = ({ dispatch }, panel) => {
	if(panel === 'contacts') {
		resetActiveServer(store)
	}
	dispatch(types.SWITCH_CHANNELS_PANEL, panel)
}