import { Stack } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import instance from '../../../axios-instance';
import { ActivityIndicator } from 'react-native-paper';

const DictionaryScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchDictionary = async () => {
    setLoading(true);
    try {
      const response = await instance.get('/flashcards/dictionary', {
        params: {
          word: searchTerm.toLowerCase(),
        },
      });
      setResults([response.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const playSound = async url => {
    const { sound } = await Audio.Sound.createAsync({ uri: url });
    await sound.playAsync();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Từ điển',
        }}
      />
      <Text style={styles.title}>Từ điển Anh - Việt</Text>
      <TextInput
        style={styles.input}
        placeholder='Nhập từ mới'
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      {loading ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        <Button title='Tìm kiếm' onPress={searchDictionary} />
      )}
      <ScrollView>
        {results.map((result, rIndex) => (
          <View key={rIndex} style={styles.resultItem}>
            <Text style={styles.word}>{result.word}</Text>
            <View style={styles.pronunciationContainer}>
              <TouchableOpacity onPress={() => playSound(result.pronunciation)}>
                <FontAwesome name='volume-up' size={24} color='black' />
              </TouchableOpacity>
            </View>
            {result.meaning.map((definition, index) => (
              <View key={index} style={styles.definitionBlock}>
                <Text style={styles.partOfSpeech}>
                  {definition.partOfSpeech}
                </Text>
                {definition.meanings.map((meaning, mIndex) => (
                  <View key={mIndex} style={styles.meaningBlock}>
                    <Text style={styles.meaning}>{meaning.meaning}</Text>
                    {meaning.examples.length > 0 && (
                      <View style={styles.examples}>
                        {meaning.examples.map((example, eIndex) => (
                          <Text key={eIndex} style={styles.example}>
                            {eIndex % 2 === 0 ? `-` : ''} {example}
                          </Text>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  resultItem: {
    marginBottom: 16,
  },
  word: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pronunciationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pronunciationIcon: {
    marginRight: 8,
  },
  definitionBlock: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  language: {
    fontWeight: 'bold',
  },
  partOfSpeech: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 16,
  },
  meaningBlock: {
    marginTop: 4,
  },
  meaning: {
    marginBottom: 4,
    fontSize: 16,
  },
  examples: {
    marginLeft: 8,
  },
  example: {
    fontStyle: 'italic',
  },
});

export default DictionaryScreen;
