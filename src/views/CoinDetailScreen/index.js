/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import {
	Alert,
	FlatList,
	Image,
	Pressable,
	SectionList,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import CoinMarketItem from '../../components/CoinMarketItem';
import { get } from '../../libs/http';
import { storeItem, getItem, removeItem } from '../../libs/storage';
import colors from '../../resources/colors';
import { formatNumberEs } from '../../utils/functions/formatNumberEs';

const CoinDetailScreen = () => {
	const [coin, setCoin] = useState({});
	const [markets, setMarkets] = useState([]);
	const [isFavorite, setIsFavorite] = useState(false);

	const navigation = useNavigation();
	const route = useRoute();

	useEffect(() => {
		const { item } = route.params;

		navigation.setOptions({
			title: item.symbol,
		});

		setCoin(item);

		getMarketsForCoin(item.id);

		getFavorite(item.id);
	}, []);

	const { name, id, market_cap_usd, volume24, percent_change_24h } = coin;

	const getSymbolImage = () => {
		if (name) {
			const coinName = name.toLowerCase().replace(' ', '-');

			return `https://c1.coinlore.com/img/25x25/${coinName}.png`;
		}
	};

	const getMarketsForCoin = async id => {
		const url = `https://api.coinlore.net/api/coin/markets/?id=${id}`;

		try {
			const markets = await get(url);

			const marketsFormattedData = markets.map(market => ({
				...market,
				price_usd: formatNumberEs(market.price_usd, 2),
			}));

			setMarkets(marketsFormattedData);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
		}
	};

	const toggleFavorite = () => {
		if (!isFavorite) {
			addFavorite();
			return;
		}

		removeFavorite();
	};

	const getFavorite = async id => {
		const key = `favorite-${id}`;

		const favorite = await getItem(key);

		if (favorite) {
			setIsFavorite(true);
		}
	};

	const addFavorite = async () => {
		const coinObject = JSON.stringify(coin);
		const key = `favorite-${id}`;

		const stored = await storeItem(key, coinObject);

		if (stored) {
			setIsFavorite(true);
		}
	};

	const removeFavorite = () => {
		Alert.alert('Eliminar esta moneda de favoritos', '¿Estás seguro?', [
			{ text: 'Cancelar', style: 'cancel' },
			{
				text: 'Aceptar',
				onPress: async () => {
					const key = `favorite-${id}`;

					const removed = await removeItem(key);

					if (removed) {
						setIsFavorite(false);
					}
				},
				style: 'destructive',
			},
		]);
	};

	const sections = [
		{ title: 'Market Cap', data: [`$${market_cap_usd}`] },
		{ title: 'Volume 24h', data: [`$${volume24}`] },
		{ title: 'Change 24h', data: [`${percent_change_24h}%`] },
	];

	return (
		<View style={styles.container}>
			<View style={styles.subHeader}>
				<View style={styles.subHeaderTitle}>
					<Image source={{ uri: getSymbolImage() }} style={styles.iconImage} />
					<Text style={styles.titleText}>{name}</Text>
				</View>
				<Pressable
					onPress={toggleFavorite}
					style={[
						styles.favoriteButton,
						isFavorite ? styles.favoriteButtonRemove : styles.favoriteButtonAdd,
					]}
				>
					<Text style={styles.favoriteText}>
						{isFavorite ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
					</Text>
				</Pressable>
			</View>

			<SectionList
				sections={sections}
				keyExtractor={item => item}
				renderSectionHeader={({ section }) => (
					<Text style={styles.sectionHeader}>{section.title}</Text>
				)}
				renderItem={({ item }) => (
					<Text style={styles.sectionItem}>{item}</Text>
				)}
				style={styles.sectionList}
			/>

			<Text style={styles.subTitleText}>Mercados</Text>

			<FlatList
				style={styles.marketFlatList}
				data={markets}
				renderItem={({ item }) => <CoinMarketItem item={item} />}
				horizontal
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.charade,
		flex: 1,
		paddingHorizontal: 10,
	},
	subHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 15,
		justifyContent: 'space-between',
	},
	subHeaderTitle: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	titleText: {
		color: colors.white,
		fontSize: 18,
		marginLeft: 5,
		fontWeight: 'bold',
	},
	favoriteButton: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 8,
	},
	favoriteButtonAdd: {
		backgroundColor: colors.picton,
	},
	favoriteButtonRemove: {
		backgroundColor: colors.carmine,
	},
	favoriteText: {
		color: colors.white,
		fontSize: 12,
	},
	iconImage: {
		width: 25,
		height: 25,
	},
	sectionList: {
		marginTop: 15,
		maxHeight: 200,
	},
	sectionHeader: {
		color: colors.white,
		fontSize: 16,
		fontWeight: 'bold',
	},
	sectionItem: {
		color: colors.white,
		paddingVertical: 7,
	},
	subTitleText: {
		color: colors.white,
		fontSize: 16,
		fontWeight: 'bold',
	},
	marketFlatList: {
		marginTop: 15,
		maxHeight: 65,
	},
});

export default CoinDetailScreen;
