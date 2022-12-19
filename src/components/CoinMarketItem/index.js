/* eslint-disable camelcase */
import { Text, View, StyleSheet } from 'react-native';

import colors from '../../resources/colors';

const CoinMarketItem = ({ item }) => {
	const { name, price_usd } = item;

	return (
		<View style={styles.container}>
			<Text style={styles.nameText}>{name}</Text>
			<Text style={styles.priceText}>${price_usd}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(18,20,23,0.8071603641456583)',
		marginHorizontal: 5,
		paddingVertical: 8,
		paddingHorizontal: 20,
		borderRadius: 8,
	},
	nameText: {
		color: colors.white,
		fontSize: 16,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	priceText: {
		color: colors.zircon,
		textAlign: 'center',
	},
});

export default CoinMarketItem;
