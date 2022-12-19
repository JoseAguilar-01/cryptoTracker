/*
 * Function to return a number formatted with decimal and mile separators in Spanish format
 * @param {int|float|string} number - valid number in integer, float or string format
 * @param {int} currentDecimals - number of decimal places
 */
export const formatNumberEs = (number, currentDecimals = 0) => {
	number = new Intl.NumberFormat('es-VE').format(
		parseFloat(number).toFixed(currentDecimals)
	);
	if (currentDecimals > 0) {
		// We obtain the number of decimal places that the number has
		const decimals =
			number.indexOf(',') > -1 ? number.length - 1 - number.indexOf(',') : 0;

		// Add the necessary zeros to the number
		number =
			// eslint-disable-next-line eqeqeq
			decimals == 0
				? number + ',' + '0'.repeat(currentDecimals)
				: number + '0'.repeat(currentDecimals - decimals);
	}
	return number;
};
