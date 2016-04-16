import * as types from '../mutation-types'
import * as channels from '../../api/channels'

export const emptyServerChannels = (store) => {
	store.dispatch(types.EMPTY_CHANNEL_LIST)
}

export const fetchServerChannels = (store, server) => {
	channels.getServerChannels(
		server,
		cb 		=> { store.dispatch(types.FETCH_CHANNELS_SUCCESS, cb) },
		errorCb	=> { store.dispatch(types.FETCH_CHANNELS_FAILURE, errorCb) }
	)
}
