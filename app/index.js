import { ScrollView, StyleSheet, Text, View } from "react-native";
import SearchBar from "../components/SearchBar";
import PopularCourse from "../components/PopularCourse";
import PotentialCourse from "../components/PotentialCourse";

export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Hello Tran Thieu</Text>
      <Text style={styles.title}>Find your course</Text>
      <SearchBar />
      <PopularCourse />
      <PotentialCourse />
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
    fontSize: 24,
    fontWeight: "800",
  },
});
