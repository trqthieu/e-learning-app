import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import instance from '../axios-instance';
import { getUser } from '../storage';
import { FontAwesome } from '@expo/vector-icons';

const CourseUnitCard = ({ item }) => {
  const [isDone, setIsDone] = useState(false);
  const getStatusUnit = async () => {
    try {
      const user = await getUser();
      console.log({
        userId: user.id,
        unitIds: [item.id],
      });
      const result = await instance.post('/user-course-unit/status', {
        userId: user.id,
        unitIds: [item.id],
      });
      if (result.data[0]?.is_completed) {
        setIsDone(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStatusUnit();
  }, []);
  const handleEnrollUnit = async () => {
    const user = await getUser();
    const result = await instance.post('user-course-unit', {
      userId: user.id,
      courseUnitId: item.id,
    });
    console.log('result unit', result.data);
    router.push({
      pathname: '/course-unit-detail',
      params: { unitId: item?.id },
    });
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleEnrollUnit()}
    >
      <View style={styles.textContainer}>
        <Text style={styles.courseName}>{item?.title}</Text>
        <Text>{item?.description}</Text>
      </View>
      {isDone && (
        <FontAwesome
          name='check-circle'
          size={24}
          color='green'
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
    justifyContent: 'space-between', // Align items with space between
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1, // Allow text container to take remaining space
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginLeft: 10, // Add left margin to space out the icon
  },
});

export default CourseUnitCard;
