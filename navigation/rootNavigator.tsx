import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../appScreens/afterLogin/homeScreen';
import LoginScreen from '../appScreens/beforeLogin/loginScreen';
import PokemonDetails from '../appScreens/afterLogin/pokemonDetails';
import { IconButton } from 'react-native-paper';
import { AlertComp } from '../components/alert';

// Here, I am defining all the screens of my project.
// undefined is generally used on those screens through which no data is passing as param
// but if I want to pass data as a param I will use ScreenName: { category: string } on the required screens.
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  PokemonDetails: { url: string };
};

// Here, I am registering them globally right here.
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Pokemons',
          headerBackButtonDisplayMode: 'minimal',
          headerRight: () => (
            <IconButton
              icon="logout"
              onPress={() => AlertComp.logoutAlert(navigation)}
            />
          ),
        })}
      />
      <Stack.Screen
        name="PokemonDetails"
        component={PokemonDetails}
        options={{
          title: 'Pokemon Details',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack.Navigator>
  );
}
