import { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import CoinsItem from '../../components/CoinsItem';
import FavoritesEmptyState from '../../components/FavoritesEmptyState';
import { getAllKeys, multiGetItems } from '../../libs/storage';
import colors from '../../resources/colors';

const FavoritesScreen = () => {
	const [favoriteCoins, setFavoriteCoins] = useState([]);

	const navigation = useNavigation();

	useEffect(() => {
		getFavorites();

		navigation.addListener('focus', getFavorites);
	}, []);

	const getFavorites = async () => {
		const allKeys = await getAllKeys();

		const favoriteKeys = allKeys.filter(key => key.includes('favorite-'));

		const favorites = await multiGetItems(favoriteKeys);

		const favoriteObjects = favorites.map(favoriteObject =>
			JSON.parse(favoriteObject[1])
		);

		setFavoriteCoins(favoriteObjects);
	};

	const handlePress = item => {
		navigation.navigate('CoinDetails', { item });
	};

	return (
		<View style={styles.container}>
			{favoriteCoins.length < 1 ? (
				<FavoritesEmptyState />
			) : (
				<View style={styles.coinsList}>
					<FlatList
						data={favoriteCoins}
						renderItem={({ item }) => (
							<Pressable onPress={() => handlePress(item)}>
								<CoinsItem item={item} />
							</Pressable>
						)}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: colors.charade,
		paddingHorizontal: 10,
	},
	spinner: {
		marginTop: 50,
	},
	coinsList: {
		marginTop: 15,
		marginBottom: 10,
	},
});

export default FavoritesScreen;
