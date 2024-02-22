import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const CourseCardSmall = ({ item }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({ pathname: "/course-unit-list", params: { sectionId: item.id } })
      }
    >
      <Image
        source={{
          uri: item?.course?.banner,
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
        <Text>{item?.description} - {item?.courseUnits?.length} units</Text>
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
