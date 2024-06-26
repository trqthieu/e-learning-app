import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const CourseCard = ({ item }) => {
  return (
    <TouchableOpacity onPress={() => router.push(`/course/${item.id}`)}>
      <Image
        source={{
          uri: item.banner,
        }}
        style={{
          resizeMode: 'contain',
          height: 150,
          width: 220,
          borderRadius: 30,
          marginRight: 10
        }}
      />
      <Text style={styles.courseName} numberOfLines={3}>
        {item.name}
      </Text>
      <Text>
        {`${item.teacher.firstName} ${item.teacher.lastName}`} - {item.level}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    width: 200,
  },
  search: {},
});

export default CourseCard;
