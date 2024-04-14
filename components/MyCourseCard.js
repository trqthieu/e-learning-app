import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MD3Colors, ProgressBar } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

const MyCourseCard = ({ item }) => {
  console.log(item);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/course/${item.course.id}`)}
    >
      <Image
        source={{
          uri: item?.course?.banner,
        }}
        style={{
          resizeMode: 'contain',
          height: 80, // Adjust image height as needed
          width: 120, // Adjust image width as needed
          borderRadius: 20, // Adjust border radius as needed
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.courseName}>{item.course?.name}</Text>
        <Text>
          {`${item.course?.teacher.firstName} ${item.course?.teacher.lastName}`}{' '}
          - {item.course?.level} ({item.process}%)
        </Text>
        <ProgressBar
          progress={item.process / 100}
          theme={{ colors: { primary: 'orange' } }}
          style={{
            marginTop: 10,
            borderRadius: 10,
            width: 150,
          }}
        />
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

export default MyCourseCard;
