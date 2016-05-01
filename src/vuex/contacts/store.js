import { set } from 'vue'
import store from '../store'
import * as types from '../mutation-types'
import * as helpers from '../../utils/helpers'

// initial module state
const state = {
	currentContact: null,
	contacts: {
		'32755f70-0e74-11e6-86c6-95d491d844d1': {
			uuid: '32755f70-0e74-11e6-86c6-95d491d844d1',
			username: 'jimbo1',
			avatar: null,
			online: true,
			verified: false,
			created_at: '2016-04-30 01:38:10',
			updated_at: '2016-05-01 01:28:42',
		},
		'32755f70-0e74-11e6-86c6-95d491d844d2': {
			uuid: '32755f70-0e74-11e6-86c6-95d491d844d2',
			username: 'jimbo2',
			avatar: null,
			online: true,
			verified: false,
			created_at: '2016-04-30 01:38:10',
			updated_at: '2016-05-01 01:28:42',
		},
		'32755f70-0e74-11e6-86c6-95d491d844d3': {
			uuid: '32755f70-0e74-11e6-86c6-95d491d844d3',
			username: 'jimbo3',
			avatar: null,
			online: false,
			verified: false,
			created_at: '2016-04-30 01:38:10',
			updated_at: '2016-05-01 01:28:42',
		},
	}
}

// mutations
const mutations = {

	[types.SEARCH_CONTACTS_SUCCESS] (state, contacts) {
		console.log(contacts)
	},

	[types.SEARCH_CONTACTS_FAILURE] (state, res) {
		// TODO
		console.log(res)
	}
}

export default {
  state,
  mutations
}
