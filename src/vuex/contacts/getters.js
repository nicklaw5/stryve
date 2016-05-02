export function getPinnedContacts (state) {
	return state.contacts.pinnedContacts
}

export function getContact (state) {
	// let server = getCurrentServer(state)
	// let channel = getCurrentChannel(state)

	// if(!server || !channel)
	// 	return {}

	// return state.servers.servers[server].channels[channel]
}

export function getCurrentContact (state) {
	return state.contacts.currentContact
}

export function getSearchContacts (state) {
	return state.contacts.searchContacts
}

export function getSearching (state) {
	return state.contacts.searching
}
