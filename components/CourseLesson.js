import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
  } from "react-native";
  import React from "react";
  import CourseLessonCard from "../components/CourseLessonCard";
  
  const CourseSection = ({data}) => {
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => <CourseLessonCard item={item} />}
          keyExtractor={(item) => item.id}
          key={(item) => item.id}
          contentContainerStyle={{ rowGap: 10 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 10,
      paddingVertical: 5,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
    },
    search: {},
  });
  
  export default CourseSection;
  