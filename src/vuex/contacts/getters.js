export function getContacts (state) {
	return state.contacts.contacts;
}

export function getContact (state) {
	// let server = getCurrentServer(state)
	// let channel = getCurrentChannel(state)

	// if(!server || !channel)
	// 	return {}

	// return state.servers.servers[server].channels[channel]
}

export function getCurrentContact (state) {
	return state.contacts.currentContact;
}