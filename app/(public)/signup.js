import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import instance from '../../axios-instance';
import notifyMessage from '../../components/NotifyMessage';

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const result = await instance.post('/auth/register', {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        phoneNumber: phoneNumber,
      });
      notifyMessage('Register success');
      router.replace('/login');
    } catch (error) {
      notifyMessage(
        error?.response?.data?.message || 'Something wrong please try again'
      );
    } finally {
      setLoading(false);
    }
  };

  const validateFields = () => {
    if (
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      phoneNumber.trim() !== '' &&
      password.length >= 8
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Signup',
        }}
      />
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder='First Name'
        onChangeText={text => {
          setFirstName(text);
          validateFields();
        }}
        value={firstName}
        placeholderTextColor='#777'
      />
      <TextInput
        style={styles.input}
        placeholder='Last Name'
        onChangeText={text => {
          setLastName(text);
          validateFields();
        }}
        value={lastName}
        placeholderTextColor='#777'
      />
      <TextInput
        style={styles.input}
        placeholder='Email'
        onChangeText={text => {
          setEmail(text);
          validateFields();
        }}
        value={email}
        keyboardType='email-address'
        placeholderTextColor='#777'
      />
      <TextInput
        style={styles.input}
        placeholder='Password (min 8 characters)'
        onChangeText={text => {
          setPassword(text);
          validateFields();
        }}
        value={password}
        secureTextEntry={true}
        placeholderTextColor='#777'
      />
      <TextInput
        style={styles.input}
        placeholder='Phone Number'
        onChangeText={text => {
          setPhoneNumber(text);
          validateFields();
        }}
        value={phoneNumber}
        keyboardType='phone-pad'
        placeholderTextColor='#777'
      />
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isValid ? '#007bff' : '#ccc' },
        ]}
        onPress={handleSignUp}
        disabled={!isValid || loading}
      >
        {loading ? (
          <ActivityIndicator color='#fff' />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.replace('/login')}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '80%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    color: '#333',
  },
  loginLink: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
