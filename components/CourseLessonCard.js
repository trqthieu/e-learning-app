import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getUser } from '../storage';
import instance from '../axios-instance';

const CourseCardSmall = ({ item }) => {
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

export default CourseCardSmall;
