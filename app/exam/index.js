import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Exam from "../../components/Exam";
import { useEffect, useState } from "react";
import instance from "../../axios-instance";

export default function Page() {
  const item = useLocalSearchParams();
  const [data, setData] = useState([]);
  const fetchCourses = async () => {
    const data = await instance.get("/exams");
    setData(data?.data?.data || []);
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TouchableOpacity>
          <Text>CATEGORY</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>CATEGORY</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>CATEGORY</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>CATEGORY</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Exam list</Text>
      <Exam data={data} />
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
