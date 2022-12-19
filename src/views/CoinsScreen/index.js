import { useEffect, useState } from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	ActivityIndicator,
	Pressable,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import CoinsItem from '../../components/CoinsItem';
import CoinsSearch from '../../components/CoinsSearch';
import { get } from '../../libs/http';
import colors from '../../resources/colors';
import { formatNumberEs } from '../../utils/functions/formatNumberEs';

const CoinsScreen = () => {
	const [allCoins, setAllCoins] = useState([]);
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(false);

	const navigation = useNavigation();

	useEffect(() => {
		setLoading(true);

		const getCoins = async () => {
			const { data } = await get('https://api.coinlore.net/api/tickers/');

			const formatedCoins = data.map(coin => ({
				...coin,
				price_usd: formatNumberEs(coin.price_usd, 2),
				market_cap_usd: formatNumberEs(coin.market_cap_usd, 2),
				volume24: formatNumberEs(coin.volume24, 2),
			}));

			setCoins(formatedCoins);
			setAllCoins(formatedCoins);
		};
		getCoins();

		setLoading(false);
	}, []);

	const handlePress = item => {
		navigation.navigate('CoinDetails', { item });
	};

	return (
		<View style={styles.container}>
			{loading && (
				<ActivityIndicator color='blue' size='large' style={styles.spinner} />
			)}

			<CoinsSearch allCoins={allCoins} setCoins={setCoins} />

			<View style={styles.coinsList}>
				<FlatList
					data={coins}
					renderItem={({ item }) => (
						<Pressable onPress={() => handlePress(item)}>
							<CoinsItem item={item} />
						</Pressable>
					)}
				/>
			</View>
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

export default CoinsScreen;
