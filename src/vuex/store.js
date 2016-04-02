import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import createLogger from '../middleware/logger'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentThreadID: null,
    threads: {
      /*
      id: {
        id,
        name,
        messages: [...ids],
        lastMessage
      }
      */
    },
    messages: {
      /*
      id: {
        id,
        threadId,
        threadName,
        authorName,
        text,
        timestamp,
        isRead
      }
      */
    }
  },
  mutations,
  middlewares: process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []
})
