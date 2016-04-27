import Vue from 'vue'
import helpers from './helpers'

Vue.filter('time', timestamp => {
  return new Date(timestamp).toLocaleTimeString()
})

Vue.filter('capitalizeFirstLetter', value => {
	return helpers.capitalizeFirstLetter(value);
})

Vue.filter('formatTimestamp', (value, format) => {
	return helpers.formatDateTime(value, format)
})