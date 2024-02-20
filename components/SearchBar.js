import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder='Search your course' />
      <Feather style={styles.search} name='search' size={30} color='black' />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    borderRadius: 10,
    width: '100%',
    flex: 1,
    padding: 8,
    backgroundColor: '#f0f0f0',
  },
  search: {},
});

export default SearchBar;
