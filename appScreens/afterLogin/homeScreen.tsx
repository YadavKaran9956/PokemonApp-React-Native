import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { List, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { pokemonService } from '../../services/apiService';
import SearchBar from '../../components/searchBar';
import Loader from '../../components/loader';

interface Pokemon {
  name: string;
  url: string;
}

export default function HomeScreen() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    loadPokeList();
  }, []);
  const navigation = useNavigation();

  const loadPokeList = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(() => resolve(null), 3000));
      const pokeList = await pokemonService.getPokeList();
      setPokemons(pokeList.results);
      console.log('pokeList=> ', pokeList.results);
      console.log('pokemons=> ', pokemons);
    } catch (error) {
      console.log('Error occured: ', error);
    } finally {
      setLoading(false);
    }
  };

  const searchPokemon = pokemons.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) return <Loader />;

  return (
    <View style={styles.mainContainer}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <FlatList
        data={searchPokemon}
        keyExtractor={item => item.name}
        contentContainerStyle={
          searchPokemon.length === 0 ? { flexGrow: 1 } : {}
        }
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description="Tap to see details"
            right={props => <List.Icon {...props} icon="chevron-right" />}
            left={props => (
              <View>
                <Avatar.Image
                  size={40}
                  source={require('../../assets/images/pokemonBall.png')}
                  style={styles.avatar}
                />
              </View>
            )}
            onPress={() =>
              navigation.navigate('PokemonDetails', { url: item.url })
            }
            titleStyle={styles.title}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empContainer}>
            <Text style={styles.noData}>No data found.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  title: {
    backgroundColor: 'whitesmoke',
    textTransform: 'capitalize',
  },
  empContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  noData: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  avatar: {
    marginLeft: 5,
  },
});
