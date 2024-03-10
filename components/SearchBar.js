import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const SearchBar = () => {
  const [searchData, setSearchData] = useState('');
  const handleSearch = () => {
    router.replace({
      pathname: '/search',
      params: {
        searchData: searchData,
      },
    });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Search your course'
        onChangeText={newText => setSearchData(newText.trim())}
        value={searchData}
      />
      <TouchableOpacity
        onPress={() => handleSearch()}
        disabled={searchData.length === 0}
      >
        <Feather style={styles.search} name='search' size={30} color='black' />
      </TouchableOpacity>
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
