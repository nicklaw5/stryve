import * as types from '../mutation-types'
import * as servers from '../../api/servers'
import { getServer } from './getters'
import { setShowContactsPanel } from '../app/actions'

export const switchServers = (store, server) => {
	store.dispatch(types.SWITCH_SERVERS, server)
	setShowContactsPanel(store, false)
	// upd to here

}

export const resetServerList = ({dispatch}) => {
	store.dispatch(types.RESET_SERVER_LIST)
}

export const retrieveServerList = (store) => {
	servers.getServersSelf(res => {
		store.dispatch(types.RETRIEVE_SERVERS_LIST, res.response)
	})
}

export const emptyServerChannels = (store) => {
	store.dispatch(types.EMPTY_SERVER_CHANNELS)
}

export const retrieveServerChannels = (store, server) => {
	servers.getServerChannels(server, res => {
		store.dispatch(types.RETRIEVE_SERVER_CHANNELS, res.response.channels)
	})
}
