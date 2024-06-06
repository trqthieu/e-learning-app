import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Stack, router } from 'expo-router';
import instance from '../../../axios-instance';
import { getUser } from '../../../storage';

const DictionaryScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    // Validation
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'New password and confirm new password must match');
      return;
    }

    setLoading(true);

    // Call API to change password
    try {
      const user = await getUser();
      const result = await instance.patch(`/users/${user.id}`, {
        email: user.email,
        password: newPassword,
      });
      setLoading(false);
      Alert.alert('Success', 'Password changed successfully');
      router.replace('/home');
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert('Error', 'Failed to change password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Từ điển',
        }}
      />
      <Text style={styles.title}>Từ điển</Text>
      <TextInput
        style={styles.input}
        placeholder='Current Password'
        secureTextEntry
        onChangeText={setCurrentPassword}
        value={currentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder='New Password'
        secureTextEntry
        onChangeText={setNewPassword}
        value={newPassword}
      />
      <TextInput
        style={styles.input}
        placeholder='Confirm New Password'
        secureTextEntry
        onChangeText={setConfirmNewPassword}
        value={confirmNewPassword}
      />
      <TouchableOpacity
        style={[styles.button, { opacity: loading ? 0.5 : 1 }]}
        onPress={handleChangePassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Đổi mật khẩu</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    width: '80%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default DictionaryScreen;
