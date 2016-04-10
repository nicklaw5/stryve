import * as types from '../mutation-types'
import * as servers from '../../api/servers'
import { getServer } from './getters'

export const switchServers = ({ dispatch }, server) => {
	dispatch(types.SWITCH_SERVERS, server)
}

export const resetServerList = ({dispatch}) => {
	dispatch(types.RESET_SERVER_LIST)
}

export const retrieveServerList = ({ dispatch }) => {
	servers.getServersSelf(res => {
		dispatch(types.RETRIEVE_SERVERS_LIST, res.response)
	})
}

export const emptyServerChannels = ({ dispatch }) => {
	dispatch(types.EMPTY_SERVER_CHANNELS)
}

export const retrieveServerChannels = ({ dispatch }, server) => {
	servers.getServerChannels(server, res => {
		dispatch(types.RETRIEVE_SERVER_CHANNELS, res.response.channels)
	})
}
