import moment from 'moment'
import lodash from 'lodash'
import randomName from 'sillyname'

module.exports = {

	/**
	 * Captilizes the first charatcer of a string
	 *
	 * @param string
	 * @return boolean
	 */
	capitalizeFirstLetter: (value) => {
		if(typeof value != 'string')
			throw new Error("The provided value is not a string");

	    return value.charAt(0).toUpperCase() + value.slice(1);
	},

	/**
	 * Tests whether or not the value passed is an empty string
	 *
	 * @param mixed
	 * @return boolean
	 */
	isEmptyString: (value) => {
	 	return (value === '')? true : false;
	},

	/**
	 * Tests whether a value is numeric or not
	 *
	 * @param mixed
	 * @return bool
	 */
	isNumeric: (value) => {
	  	return !isNaN(parseFloat(value)) && isFinite(value);
	}

};
