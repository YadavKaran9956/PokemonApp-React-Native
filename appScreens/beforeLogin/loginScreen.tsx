import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const navigation = useNavigation();

  return (
    // KeyboardAvoidingView ensures the keyboard doesn't cover your inputs
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Card mode="outlined" style={styles.card}>
            <Card.Cover
              source={require('../../assets/images/pokemon-logo.png')}
            />
            <Card.Title title="Welcome Back!" titleStyle={styles.title} />
            <Card.Content>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry={secureText}
                style={styles.input}
                right={
                  <TextInput.Icon
                    icon={secureText ? 'eye-off' : 'eye'}
                    onPress={() => setSecureText(!secureText)}
                  />
                }
              />

              <Button
                mode="contained"
                onPress={() => navigation.navigate('Pokemons')}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                Login
              </Button>
            </Card.Content>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5', // Light grey background like modern apps
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // This keeps the card from touching the edges
  },
  card: {
    width: '100%', // Takes up the available space within the padding
    maxWidth: 400, // Optional: keeps it from looking too wide on tablets
    borderRadius: 12,
    elevation: 4, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  title: {
    textAlign: 'center',
    margin: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 6,
  },
});
