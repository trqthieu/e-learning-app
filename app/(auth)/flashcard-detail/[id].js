import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import instance from '../../../axios-instance';

const FlashcardScreen = () => {
  const { id } = useLocalSearchParams();
  const [flashcardData, setFlashcardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [newWordType, setNewWordType] = useState('');
  const [newDefinition, setNewDefinition] = useState('');
  const [newPronunciation, setNewPronunciation] = useState('');
  const [newExample, setNewExample] = useState('');

  useEffect(() => {
    const fetchFlashcardData = async () => {
      try {
        const response = await instance.get(`flashcards/${id}`);
        setFlashcardData(response.data.flashcardItems);
        setLoading(false);
      } catch (error) {
        console.log(error);
        Alert.alert(
          'Error',
          'Failed to load flashcard data. Please try again.'
        );
        setLoading(false);
      }
    };

    fetchFlashcardData();
  }, [id]);

  const handleNext = () => {
    setShowMeaning(false);
    if (index < flashcardData.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0); // Quay lại thẻ đầu tiên nếu hết danh sách
    }
  };

  const handleCardPress = () => {
    setShowMeaning(!showMeaning);
  };

  const handleAddWord = async () => {
    if (
      newWord.trim() &&
      newWordType.trim() &&
      newDefinition.trim() &&
      newPronunciation.trim() &&
      newExample.trim()
    ) {
      try {
        const response = await instance.post('/flashcard-items', {
          word: newWord,
          wordType: newWordType,
          definition: newDefinition,
          pronunciation: newPronunciation,
          examples: [newExample],
          flashcardId: parseInt(id),
        });
        setFlashcardData([...flashcardData, response.data]);
        setNewWord('');
        setNewWordType('');
        setNewDefinition('');
        setNewPronunciation('');
        setNewExample('');
        setIsModalVisible(false);
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Failed to add word. Please try again.');
      }
    }
  };

  const handleDeleteWord = async wordId => {
    try {
      await instance.delete(`/flashcard-items/${wordId}`);
      setFlashcardData(flashcardData.filter(item => item.id !== wordId));
      setIndex(index === 0 ? 0 : index - 1); // Adjust the index if necessary
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to delete word. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Chi tiết thẻ ôn luyện',
        }}
      />
      {loading ? (
        <ActivityIndicator size='large' color='#007bff' />
      ) : (
        <>
          {flashcardData.length ? (
            <>
              <TouchableOpacity
                onPress={handleCardPress}
                style={styles.cardContainer}
              >
                <Animatable.View
                  animation={showMeaning ? 'flipInY' : 'flipInX'}
                  duration={600}
                  style={styles.card}
                >
                  {!showMeaning ? (
                    <View>
                      <Text style={styles.text}>
                        {flashcardData[index]?.word}
                      </Text>
                      <Text style={styles.textType}>
                        {flashcardData[index]?.wordType}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          handleDeleteWord(flashcardData[index]?.id)
                        }
                        style={styles.deleteButton}
                      >
                        <Text style={styles.deleteButtonText}>Xóa</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.text}>
                        {flashcardData[index]?.definition}
                      </Text>
                      <Text style={styles.textPronunciation}>
                        {flashcardData[index]?.pronunciation}
                      </Text>
                      <Text style={styles.textExamples}>
                        {flashcardData[index]?.examples.join(', ')}
                      </Text>
                    </View>
                  )}
                </Animatable.View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                <Text style={styles.nextButtonText}>Kế tiếp</Text>
              </TouchableOpacity>
            </>
          ) : null}

          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Thêm từ</Text>
          </TouchableOpacity>
        </>
      )}
      <Modal
        visible={isModalVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thêm từ mới</Text>
            <TextInput
              style={styles.input}
              placeholder='Từ'
              value={newWord}
              onChangeText={setNewWord}
            />
            <TextInput
              style={styles.input}
              placeholder='Loại từ'
              value={newWordType}
              onChangeText={setNewWordType}
            />
            <TextInput
              style={styles.input}
              placeholder='Định nghĩa'
              value={newDefinition}
              onChangeText={setNewDefinition}
            />
            <TextInput
              style={styles.input}
              placeholder='Phiên âm'
              value={newPronunciation}
              onChangeText={setNewPronunciation}
            />
            <TextInput
              style={styles.input}
              placeholder='Ví dụ'
              value={newExample}
              onChangeText={setNewExample}
            />
            <TouchableOpacity onPress={handleAddWord} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Lưu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '80%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#f9f9f9',
    backfaceVisibility: 'hidden',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
  },
  textType: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    color: '#888',
  },
  textPronunciation: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    color: '#888',
  },
  textExamples: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#555',
  },
  nextButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#28a745',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  addButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#007bff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  deleteButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#dc3545',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignSelf: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  saveButton: {
    paddingVertical: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#dc3545',
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default FlashcardScreen;
