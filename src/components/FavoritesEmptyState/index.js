import { StyleSheet, Text, View } from 'react-native';

import colors from '../../resources/colors';

const FavoritesEmptyState = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Aún no haz agregado monedas favoritas</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.charade,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: colors.white,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default FavoritesEmptyState;
