import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';

// Mock flashcard data
const mockFlashcards = [
  { id: 1, title: 'Flashcard 1', content: 'Content for flashcard 1' },
  { id: 2, title: 'Flashcard 2', content: 'Content for flashcard 2' },
  { id: 3, title: 'Flashcard 3', content: 'Content for flashcard 3' },
  { id: 4, title: 'Flashcard 4', content: 'Content for flashcard 4' },
  { id: 5, title: 'Flashcard 5', content: 'Content for flashcard 5' },
  { id: 6, title: 'Flashcard 6', content: 'Content for flashcard 6' },
  { id: 7, title: 'Flashcard 7', content: 'Content for flashcard 7' },
  { id: 8, title: 'Flashcard 8', content: 'Content for flashcard 8' },
];

const FlashcardScreen = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching data
    const fetchFlashcards = async () => {
      try {
        // Simulate network request
        setTimeout(() => {
          setFlashcards(mockFlashcards);
          setLoading(false);
        }, 1000); // Simulate a delay of 1 second
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Failed to load flashcards. Please try again.');
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, []);

  const handleFlashcardPress = flashcard => {
    router.push(`/flashcard-detail/${flashcard.id}`);
  };

  const renderFlashcard = ({ item }) => (
    <TouchableOpacity
      style={styles.flashcard}
      onPress={() => handleFlashcardPress(item)}
    >
      <Text style={styles.flashcardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Chi tiết thẻ ôn luyện',
        }}
      />
      {/* <Text style={styles.title}>Danh sách thẻ ôn luyện</Text> */}
      {loading ? (
        <ActivityIndicator size='large' color='#007bff' />
      ) : (
        <FlatList
          data={flashcards}
          renderItem={renderFlashcard}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  flashcard: {
    flex: 1,
    marginVertical: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashcardText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FlashcardScreen;
