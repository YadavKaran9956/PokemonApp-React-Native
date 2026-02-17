import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { authService } from '../../services/apiService';
import { storageService } from '../../services/storageService';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../reduxStore/slices/authSlice';
import { Toaster } from '../../components/toast';
import { isValidEmail } from '../../utils/validators';

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [errors, setError] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const validateForm = () => {
    let err: FormErrors = {};

    if (!email) err.email = 'Email is required.';
    if (!password) err.password = 'Password is required.';
    // if (email && !isValidEmail(email)) {
    //   err.email = 'Email is not valid';
    // }

    setError(err);

    return Object.keys(err).length === 0;
  };

  const handleFormSubmit = async () => {
    console.log('validateform()', validateForm());
    if (validateForm()) {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(() => resolve(null), 2000));
        const user = await authService.login(email, password);
        const res = storageService.setCredentials(
          user.username,
          user.accessToken,
          'loggedUser',
        );
        console.log('res=>', res);
        dispatch(loginSuccess(user));
        setEmail('');
        setPassword('');
        setError({});
      } catch (e: any) {
        e.message == 'Network Error' ||
        e.message == 'timeout of 5000ms exceeded'
          ? Toaster.toastError(e.message)
          : Toaster.toastError(e?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    } else {
      console.log(errors);
      console.log(email);
      console.log(password);
    }
  };

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
              {errors.email ? (
                <Text style={styles.errorMsg}>{errors.email}</Text>
              ) : null}

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
              {errors.password ? (
                <Text style={styles.errorMsg}>{errors.password}</Text>
              ) : null}

              <Button
                mode="contained"
                onPress={() => handleFormSubmit()}
                style={styles.button}
                contentStyle={styles.buttonContent}
                loading={loading}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
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
    backgroundColor: '#f0f2f5',
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
    elevation: 4,
    shadowColor: '#000',
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
  errorMsg: {
    color: 'red',
  },
});
