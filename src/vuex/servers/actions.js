import * as types from '../mutation-types'
import * as servers from '../../api/servers'
import { getChannelPanel } from '../app/getters'
import { switchChannelsPanel } from '../app/actions'
import { fetchServerChannels, emptyServerChannels } from '../channels/actions'

export const switchServers = (store, server) => {
	store.dispatch(types.SWITCH_SERVERS, server)
	switchChannelsPanel(store, 'channels')
	emptyServerChannels(store)
	fetchServerChannels(store, server)
}

export const resetActiveServer = (store) => {
	store.dispatch(types.RESET_ACTIVE_SERVER)
}

export const emptyServerList = (store) => {
	store.dispatch(types.RESET_SERVER_LIST)
}

export const fetchServerList = (store) => {
	servers.getServersSelf(
		cb 		=> { store.dispatch(types.FETCH_SERVERS_SUCCESS, cb) },
		errorCb	=> { store.dispatch(types.FETCH_SERVERS_FAILURE, errorCb) }
	)
}
