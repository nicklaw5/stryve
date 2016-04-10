import moment from 'moment'
import lodash from 'lodash'
import randomName from 'sillyname'

module.exports = {

	/**
	 * Captilizes the first charatcer of a string
	 *
	 * @param string $value
	 * @return boolean
	 */
	capitalizeFirstLetter: value => {
		if(typeof value != 'string')
			throw new Error("The provided value is not a string");

	    return value.charAt(0).toUpperCase();
	},

	/**
	 * Tests whether or not the value passed is an empty string
	 *
	 * @param mixed $value
	 * @return boolean
	 */
	isEmptyString: value => {
	 	return (value === '')? true : false;
	},

	/**
	 * Tests whether a value is numeric or not
	 *
	 * @param mixed $value
	 * @return bool
	 */
	isNumeric: value => {
	  	return !isNaN(parseFloat(value)) && isFinite(value);
	},

	/**
	 * Determines if an object is empty or not
	 *
	 * @param object $obj
	 * @return bool
	 */
	isEmptyObject: obj => {
		if(typeof obj != 'object')
			return false;

	    for(var prop in obj) {
	        if(obj.hasOwnProperty(prop))
	            return false;
	    }
	    return true;
	}

};
