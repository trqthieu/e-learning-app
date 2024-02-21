import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const CourseCard = () => {
  return (
    <TouchableOpacity 
    onPress={() => router.push(`/course/1`)}
    >
      <Image
        source={{
          uri: "https://www.freecodecamp.org/news/content/images/2023/04/reactnative.png",
        }}
        style={{
          resizeMode: "contain",
          height: 150,
          width: 250,
          borderRadius: 20,
        }}
      />
      <Text style={styles.courseName}>React Native</Text>
      <Text>Teacher Name - Beginner</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  courseName: {
    fontSize: 16,
    fontWeight: "600",
  },
  search: {},
});

export default CourseCard;
