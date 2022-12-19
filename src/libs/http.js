export const get = async url => {
	try {
		const response = await fetch(url);
		const result = await response.json();

		return result;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
	}
};

export const post = async (url, body) => {
	try {
		const response = await fetch(url, {
			method: 'POST',
			body,
		});
		const result = await response.json();

		return result;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
	}
};
