import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/rootNavigator';
import { Button, Card, Text } from 'react-native-paper';
import { pokemonService } from '../../services/apiService';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

interface PokemonDetail {
  name?: string;
  weight?: number;
  height?: number;
  sprites?: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

export default function PokemonDetails() {
  const [pokeDetails, setPokeDetails] = useState<PokemonDetail>({});
  useEffect(() => {
    getPokemonDetails();
  }, []);
  const route = useRoute<RouteProp<RootStackParamList, 'PokemonDetails'>>();
  const { url } = route.params;

  const getPokemonDetails = () => {
    const details = pokemonService.getPokemonDetails(url);
    console.log('details=>', details);
    details.then(d => {
      setPokeDetails(d);
    });
    console.log('pokeDetails=>', pokeDetails);
  };

  return (
    <Card>
      <Card.Cover
        source={{
          uri:
            pokeDetails?.sprites?.other?.['official-artwork']?.front_default ||
            'https://via.placeholder.com/300',
        }}
        resizeMode="contain"
      />
      <Card.Title titleStyle={styles.title} title={pokeDetails.name} />
      <Card.Content>
        <Text>Weight: {pokeDetails.weight} dcm</Text>
        <Text>Height: {pokeDetails.height} hg</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
});
