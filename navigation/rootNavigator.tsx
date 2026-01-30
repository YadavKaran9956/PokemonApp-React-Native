import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonScreen from '../appScreens/afterLogin/pokemonScreen';
import LoginScreen from '../appScreens/beforeLogin/loginScreen';

// Here, I am defining all the screens of my project.
// undefined is generally used on those screens through which no data is passing as param
// but if I want to pass data as a param I will use ScreenName: { category: string } on the required screens.
export type RootStackParamList = {
  Login: undefined;
  Pokemons: undefined;
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
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Pokemons" component={PokemonScreen} />
    </Stack.Navigator>
  );
}
