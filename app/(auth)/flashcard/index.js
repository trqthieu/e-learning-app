import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import instance from '../../../axios-instance';
import { getUser } from '../../../storage';

const AUTH_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MzUzNDQzLCJleHAiOjE3MTg0Mzk4NDN9.nL4cN8v0fH9x4VZKPAnEZ4_edWzjj0OzTCmwQs42tXY';

const FlashcardScreen = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newFlashcard, setNewFlashcard] = useState({
    name: '',
    description: '',
  });
  const router = useRouter();

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const user = await getUser();
        const response = await instance.get(
          '/flashcards?order=ASC&page=1&take=50'
        );
        console.log('response.data.data', response.data.data);
        const fetchedFlashcards = response.data.data
          .filter(i => i?.author?.id === user?.id)
          .map(item => ({
            id: item.id,
            title: item.name,
            content: item.description,
          }));
        setFlashcards(fetchedFlashcards);
        setLoading(false);
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

  const handleAddFlashcard = async () => {
    try {
      const user = await getUser();
      const response = await instance.post('/flashcards', {
        name: newFlashcard.name,
        description: newFlashcard.description,
        authorId: user?.id, // Assuming authorId is 1
      });
      const addedFlashcard = {
        id: response.data.id,
        title: response.data.name,
        content: response.data.description,
      };
      setFlashcards([...flashcards, addedFlashcard]);
      setModalVisible(false);
      setNewFlashcard({ name: '', description: '' });
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to add flashcard. Please try again.');
    }
  };

  const handleDeleteFlashcard = async id => {
    try {
      console.log(id);
      await instance.delete(`/flashcards/${id}`);
      setFlashcards(flashcards.filter(flashcard => flashcard.id !== id));
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to delete flashcard. Please try again.');
    }
  };

  const renderFlashcard = ({ item }) => (
    <View style={styles.flashcardContainer}>
      <TouchableOpacity
        style={styles.flashcard}
        onPress={() => handleFlashcardPress(item)}
      >
        <Text style={styles.flashcardText}>{item.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteFlashcard(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Danh sách thẻ ôn luyện',
        }}
      />
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Thêm thẻ ôn luyện</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.formTitle}>Thêm thẻ ôn luyện mới</Text>
            <TextInput
              style={styles.input}
              placeholder='Tên thẻ'
              value={newFlashcard.name}
              onChangeText={text =>
                setNewFlashcard({ ...newFlashcard, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder='Nội dung'
              value={newFlashcard.description}
              onChangeText={text =>
                setNewFlashcard({ ...newFlashcard, description: text })
              }
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleAddFlashcard}
              >
                <Text style={styles.buttonText}>Thêm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  flashcardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  flashcard: {
    flex: 1,
  },
  flashcardText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#ff0000',
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  addButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FlashcardScreen;
