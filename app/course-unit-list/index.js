import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import CourseUnit from "../../components/CourseUnit";

export default function Page() {
  const item = useLocalSearchParams();
  console.log(item);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course unit list</Text>
      <CourseUnit />
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
