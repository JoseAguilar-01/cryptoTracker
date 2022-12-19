import { createStackNavigator } from '@react-navigation/stack';

import colors from '../../resources/colors';
import CoinDetailScreen from '../../views/CoinDetailScreen';
import CoinsScreen from '../../views/CoinsScreen';

const Stack = createStackNavigator();

const CoinsStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: colors.blackPearl,
					shadowColor: colors.blackPearl,
				},
				headerTintColor: colors.white,
			}}
		>
			<Stack.Screen
				name='CoinsList'
				component={CoinsScreen}
				options={{
					title: 'Monedas',
				}}
			/>
			<Stack.Screen name='CoinDetails' component={CoinDetailScreen} />
		</Stack.Navigator>
	);
};

export default CoinsStack;
