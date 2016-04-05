import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import createLogger from '../middleware/logger'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false,
    closingApp: false,
    isMaximized: false,
    isRegistering: false,
    // api_base: 'http://api.stryve.io/api/',
    request_options: {},
    // register: { username: '', email: '', password: '' },
    // login: { email: 'test@account.com', password: 'test1234' },
    inContactsList: true,
    serverMenuIsOpen: false,
    c_search: '',
    user: {},
    chat_message: '',
    chat_server: {},
    chat_channel:  {},
    chat_servers: [],
    chat_channels: [],
    chat_server_regions: [],
    socket: { /* A socket.io object */ },
    new_channel_name: '',
    new_server_name: '',
    new_server_region: '',
    new_server_private: false,
    new_channel_name: '',
    new_channel_private: false,

    
    // currentThreadID: null,
    // threads: {
    //   /*
    //   id: {
    //     id,
    //     name,
    //     messages: [...ids],
    //     lastMessage
    //   }
    //   */
    // },
    // messages: {
    //   /*
    //   id: {
    //     id,
    //     threadId,
    //     threadName,
    //     authorName,
    //     text,
    //     timestamp,
    //     isRead
    //   }
    //   */
    // }
  },
  mutations,
  middlewares: process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []
})
