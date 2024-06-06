import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getUser } from '../storage';
import instance from '../axios-instance';
import { FontAwesome } from '@expo/vector-icons';

const CourseCardSmall = ({ item, setTotalCompleteEx }) => {
  const [questionLength, setQuestionLength] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [isDone, setIsDone] = useState(false);
  console.log(correctAnswer, questionLength);
  const getUserExercise = async () => {
    const user = await getUser();
    const data = await instance.post('/user-exercise/status', {
      userId: user?.id,
      exerciseIds: [item.id],
    });
    if (data?.data?.length) {
      setIsDone(true);
      setTotalCompleteEx((value) => value + 1);
    }
    setCorrectAnswer(data?.data?.[0]?.score || 0);
    const question = await instance.get('/questions', {
      params: {
        take: 50,
        exerciseId: item.id,
      },
    });
    setQuestionLength(question.data?.data?.length || 0);
  };
  useEffect(() => {
    getUserExercise();
  }, []);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/exercise/${item.id}`)}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Image
          source={{
            uri: item?.banner,
          }}
          style={{
            resizeMode: 'contain',
            height: 80, // Adjust image height as needed
            width: 120, // Adjust image width as needed
            borderRadius: 20, // Adjust border radius as needed
          }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.courseName}>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
      </View>
      {isDone && (
        <>
          <Text>
            {correctAnswer}/{questionLength}
          </Text>
          <FontAwesome
            name="check-circle"
            size={24}
            color="green"
            style={styles.icon}
          />
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  textContainer: {
    marginLeft: 10,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CourseCardSmall;
