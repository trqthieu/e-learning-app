import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { convertTime } from '../utils/index';
import instance from '../axios-instance';

const UserExamItem = ({ item }) => {
  const [totalQuestion, setTotalQuestion] = useState(0);
  const getQuestion = async () => {
    const result = await instance.get('/questions', {
      params: {
        examId: item?.exam?.id,
        take: 50,
      },
    });
    setTotalQuestion(result.data?.meta?.totalItem);
  };
  useEffect(() => {
    getQuestion();
  }, []);
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.courseName}>{item?.exam?.title}</Text>
        <Text>
          {item?.exam?.category} - {item?.exam?.time} phút
        </Text>
        <Text style={styles.courseName}>
          {item?.score}/ {totalQuestion}
        </Text>
      </View>
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
  },
  textContainer: {
    marginLeft: 10,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserExamItem;
