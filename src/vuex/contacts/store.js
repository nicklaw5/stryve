import { set } from 'vue'
import store from '../store'
import * as types from '../mutation-types'
import * as helpers from '../../utils/helpers'
import { setSearching } from './actions'

// initial module state
const state = {
	searching: false,
	currentContact: null,
	pinnedContacts: {
		'32755f70-0e74-11e6-86c6-95d491d844d1': {
			uuid: '32755f70-0e74-11e6-86c6-95d491d844d1',
			username: 'jimbo1',
			avatar: null,
			status: 'online',
			verified: false,
			created_at: '2016-04-30 01:38:10',
			updated_at: '2016-05-01 01:28:42',
		},
		'32755f70-0e74-11e6-86c6-95d491d844d2': {
			uuid: '32755f70-0e74-11e6-86c6-95d491d844d2',
			username: 'jimbo2',
			avatar: null,
			status: 'away',
			verified: false,
			created_at: '2016-04-30 01:38:10',
			updated_at: '2016-05-01 01:28:42',
		},
		'32755f70-0e74-11e6-86c6-95d491d844d3': {
			uuid: '32755f70-0e74-11e6-86c6-95d491d844d3',
			username: 'jimbo3',
			avatar: null,
			status: 'offline',
			verified: false,
			created_at: '2016-04-30 01:38:10',
			updated_at: '2016-05-01 01:28:42',
		},
	},
	searchContacts: {
		// {
		// 	uuid: '32755f70-0e74-11e6-86c6-95d491d844d1',
		// 	username: 'jimbo1',
		// 	avatar: null,
		// 	status: 'online',
		// 	verified: false,
		// 	created_at: '2016-04-30 01:38:10',
		// 	updated_at: '2016-05-01 01:28:42',
		// },
		// {
		// 	uuid: '32755f70-0e74-11e6-86c6-95d491d844d2',
		// 	username: 'jimbo2',
		// 	avatar: null,
		// 	status: 'away',
		// 	verified: false,
		// 	created_at: '2016-04-30 01:38:10',
		// 	updated_at: '2016-05-01 01:28:42',
		// },
		// {
		// 	uuid: '32755f70-0e74-11e6-86c6-95d491d844d3',
		// 	username: 'jimbo3',
		// 	avatar: null,
		// 	status: 'offline',
		// 	verified: false,
		// 	created_at: '2016-04-30 01:38:10',
		// 	updated_at: '2016-05-01 01:28:42',
		// },
	},
}

// mutations
const mutations = {
	[types.RESET_SEARCH_CONTACTS] (state) {
		set(state, 'searchContacts', {})
		setSearching(store, false)
	},

	[types.SET_SEARCHING] (state, boolean) {
		set(state, 'searching', boolean)
	},

	[types.SEARCH_CONTACTS_SUCCESS] (state, contacts) {
		
		if(!helpers.isNullOrUndefined(contacts))
			contacts.forEach(contact => {
				set(state.searchContacts, contact.uuid, contact)
			})
			// set(state, 'searchContacts', contacts)

		console.log(state.searchContacts)

		// setSearching(store, false)
	},

	[types.SEARCH_CONTACTS_FAILURE] (state, res) {
		// setSearching(store, false)
		// TODO
		console.log(res)
	},

}

export default {
  state,
  mutations
}
