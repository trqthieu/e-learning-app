import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import CourseSection from "../../components/CourseSection";
import { useEffect, useState } from "react";
import instance from "../../axios-instance";

export default function Page() {
  const item = useLocalSearchParams();
  const [data, setData] = useState([]);
  const fetchCourses = async () => {
    const data = await instance.get("/course-sections", {
      params: {
        courseId: item.courseId,
      },
    });
    setData(data?.data?.data || []);
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course section list</Text>
      <CourseSection data={data}/>
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