import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import CourseSection from "../../components/CourseSection";

export default function Page() {
  const item = useLocalSearchParams();
  console.log(item);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course section list</Text>
      <CourseSection />
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
