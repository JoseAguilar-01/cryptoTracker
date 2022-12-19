import { Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import CoinsStack from './src/components/CoinsStack';
import FavoritesStack from './src/components/FavoritesStack';
import colors from './src/resources/colors';

const Tab = createBottomTabNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				activeColor={colors.orange}
				inactiveColor={colors.white}
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						backgroundColor: colors.blackPearl,
						height: 70,
						paddingBottom: 8,
						paddingTop: 8,
						borderTopColor: colors.blackPearl,
					},
					tabBarActiveTintColor: colors.orange,
				}}
			>
				<Tab.Screen
					name='Coins'
					component={CoinsStack}
					options={{
						tabBarIcon: ({ size, color }) => (
							<Image
								source={require('./src/assets/bank.png')}
								style={{ tintColor: color, width: size, height: size }}
							/>
						),
						title: 'Monedas',
					}}
				/>

				<Tab.Screen
					name='Favorites'
					component={FavoritesStack}
					options={{
						tabBarIcon: ({ size, color }) => (
							<Image
								source={require('./src/assets/coins.png')}
								style={{ tintColor: color, width: size, height: size }}
							/>
						),
						title: 'Favoritos',
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default App;
