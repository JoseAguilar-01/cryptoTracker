/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeItem = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, value);

		return true;
	} catch (error) {
		console.log(error);

		return false;
	}
};

export const getItem = async key => {
	try {
		return await AsyncStorage.getItem(key);
	} catch (error) {
		console.log(error);

		throw Error('storage get error', error);
	}
};

export const multiGetItems = async keyList => {
	try {
		return await AsyncStorage.multiGet(keyList);
	} catch (error) {
		console.log(error);

		throw Error('storage multiGet error', error);
	}
};

export const getAllKeys = async () => {
	try {
		return await AsyncStorage.getAllKeys();
	} catch (error) {
		console.log(error);

		throw Error('storage getAllKeys error', error);
	}
};

export const removeItem = async key => {
	try {
		await AsyncStorage.removeItem(key);

		return true;
	} catch (error) {
		console.log(error);

		return false;
	}
};
