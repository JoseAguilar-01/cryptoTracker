/* eslint-disable camelcase */
import { Text, View, StyleSheet, Platform } from 'react-native';

import colors from '../../resources/colors';

const CoinsItem = ({ item }) => {
	const { name, symbol, percent_change_24h, price_usd } = item;

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Text style={styles.symbolText}>{symbol}</Text>
				<Text style={styles.nameText}>{name}</Text>
				<Text style={styles.priceText}>${price_usd}</Text>
			</View>
			<Text
				style={
					Number(percent_change_24h) < 0
						? styles.negativePercentageText
						: styles.positivePercentageText
				}
			>
				{percent_change_24h}%
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 15,
		backgroundColor: 'rgba(18,20,23,0.8071603641456583)',
		marginTop: 13,
		borderRadius: 8,
		justifyContent: 'space-between',
		flexDirection: 'row',
		borderBottomColor: Platform.OS === 'android' ? colors.zircon : null,
		borderBottomWidth: Platform.OS === 'android' ? 2 : null,
		width: '100%',
	},
	row: {
		flexDirection: 'row',
	},
	nameText: {
		color: colors.white,
		marginLeft: 10,
	},
	symbolText: {
		color: colors.white,
		fontWeight: 'bold',
		fontSize: 16,
	},
	priceText: {
		color: colors.zircon,
		fontWeight: 'bold',
		marginLeft: 10,
	},
	positivePercentageText: {
		color: colors.green,
		fontWeight: 'bold',
	},
	negativePercentageText: {
		color: colors.red,
		fontWeight: 'bold',
	},
});

export default CoinsItem;
