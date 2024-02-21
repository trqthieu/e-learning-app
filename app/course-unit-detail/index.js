import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import CourseLesson from "../../components/CourseLesson";
import CourseExercise from "../../components/CourseExercise";
import Tabs from "../../components/Tabs";
import { useState } from "react";
const tabs = ["Lesson", "Exercise"];

export default function Page() {
  const item = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  console.log("activeTab", activeTab);
  const displayTabContent = () => {
    switch (activeTab) {
      case "Exercise":
        return (
          <View
            style={{
              flex: 1,
            }}
          >
            <CourseExercise />
          </View>
        );
      case "Lesson":
        return (
          <View
            style={{
              flex: 1,
            }}
          >
            <CourseLesson />
          </View>
        );
      default:
        return null;
    }
  };
  console.log(item);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course unit detail</Text>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {displayTabContent()}
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
