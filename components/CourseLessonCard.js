import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getUser } from '../storage';
import instance from '../axios-instance';
import { FontAwesome } from '@expo/vector-icons';

const CourseCardSmall = ({ item, setTotalCompleteLesson }) => {
  const [dataUserLesson, setDataUserLesson] = useState();
  console.log('dataUserLesson', dataUserLesson);
  const getUserLesson = async () => {
    const user = await getUser();
    const data = await instance.post('user-lesson/getLessonByUser', {
      userId: user.id,
      lessonId: item.id,
    });
    setDataUserLesson(data.data);
    if (data.data.id) {
      setTotalCompleteLesson((value) => value + 1);
    }
  };
  useEffect(() => {
    getUserLesson();
  }, []);
  const handleLesson = async () => {
    const user = await getUser();
    const result = await instance.post('user-lesson', {
      userId: user.id,
      lessonId: item.id,
    });
    console.log('result lesson', result.data);
    router.push({
      pathname: '/lesson',
      params: {
        id: item.id,
      },
    });
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        handleLesson();
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          marginBottom: 10,
          backgroundColor: '#f0f0f0',
          borderRadius: 10,
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
          <Text style={styles.courseName}>{item?.title}</Text>
          <Text>{item?.description}</Text>
        </View>
      </View>
      {dataUserLesson && (
        <FontAwesome
          name="check-circle"
          size={24}
          color="green"
          style={styles.icon}
        />
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
