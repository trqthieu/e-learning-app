import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const CourseCard = ({ item }) => {
  return (
    <TouchableOpacity onPress={() => router.push(`/course/${item.id}`)}>
      <Image
        source={{
          uri: item.banner,
        }}
        style={{
          resizeMode: "contain",
          height: 150,
          width: 250,
          borderRadius: 20,
        }}
      />
      <Text style={styles.courseName}>{item.name}</Text>
      <Text>{`${item.teacher.firstName} ${item.teacher.lastName}`} - {item.level}</Text>
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
