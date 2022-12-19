import { createStackNavigator } from '@react-navigation/stack';

import colors from '../../resources/colors';
import FavoritesScreen from '../../views/FavoritesScreen';

const Stack = createStackNavigator();

const FavoritesStack = () => {
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
				name='FavoritesCoins'
				component={FavoritesScreen}
				options={{
					title: 'Favoritos',
				}}
			/>
		</Stack.Navigator>
	);
};
export default FavoritesStack;
