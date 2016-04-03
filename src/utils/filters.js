import Vue from 'vue'
import helpers from './helpers'

export default Vue.filter('time', timestamp => {
  return new Date(timestamp).toLocaleTimeString()
})

export default Vue.filter('capitalizeFirstLetter', value => {
	return helpers.capitalizeFirstLetter(value);
})