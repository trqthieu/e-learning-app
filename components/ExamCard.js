import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const CourseCardSmall = ({ item }) => {
  console.log(item);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({ pathname: "/exam-detail", params: { id: item?.id } })
      }
    >
      <Image
        source={{
          uri: "https://www.freecodecamp.org/news/content/images/2023/04/reactnative.png",
        }}
        style={{
          resizeMode: "contain",
          height: 80, // Adjust image height as needed
          width: 120, // Adjust image width as needed
          borderRadius: 20, // Adjust border radius as needed
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.courseName}>{item?.title}</Text>
        <Text>{item?.description} - {item?.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  courseName: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CourseCardSmall;
