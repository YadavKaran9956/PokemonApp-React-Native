import { StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  card: {
    backgroundColor: 'whitesmoke',
    borderColor: '#4d4c4c',
    borderRadius: 15,
    borderWidth: 3,
    padding: 10,
    margin: 20,
    shadowColor: '#333333',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});

export default function PokemonScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Different pokemons are listed here:</Text>
      </View>

      <View style={styles.card}>
        <Image source={require('../../assets/images/pikachu.png')} />
        <View>
          <Text>Name:</Text>
        </View>
      </View>
    </View>
  );
}
