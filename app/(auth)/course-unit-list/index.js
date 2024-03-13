import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import CourseUnit from "../../../components/CourseUnit";
import { useEffect, useState } from "react";
import instance from "../../../axios-instance";

export default function Page() {
  const item = useLocalSearchParams();
  const [data, setData] = useState([]);
  const fetchCourses = async () => {
    const data = await instance.get("/course-units", {
      params: {
        courseSectionId: item.sectionId,
      },
    });
    setData(data?.data?.data || []);
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Course Units",
        }}
      />
      {/* <Text style={styles.title}>Course unit list</Text> */}
      <CourseUnit data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  welcome: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 10,
  },
});
