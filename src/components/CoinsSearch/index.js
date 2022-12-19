import { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

import colors from '../../resources/colors';

const CoinsSearch = ({ allCoins, setCoins }) => {
	const [query, setQuery] = useState('');

	const handleCoinsFiltering = query => {
		if (query) {
			const filteredCoins = allCoins.filter(
				coin =>
					coin.name.toLowerCase().includes(query.toLowerCase()) ||
					coin.symbol.toLowerCase().includes(query.toLowerCase())
			);

			setCoins(filteredCoins);
			setQuery(query);

			// console.log(filteredCoins);
			return;
		}

		setCoins(allCoins);
		setQuery(query);

		// console.log(query);
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.textInput}
				onChangeText={text => handleCoinsFiltering(text)}
				value={query}
				placeholder='Buscar moneda'
				placeholderTextColor={colors.zircon}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '80%',
		backgroundColor: colors.blackPearl,
		borderRadius: 8,
		padding: 10,
		marginTop: 15,
	},
	textInput: {
		color: colors.zircon,
	},
});

export default CoinsSearch;
