import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SearchBar from "../components/SearchBar";
import PopularCourse from "../components/PopularCourse";
import PotentialCourse from "../components/PotentialCourse";
import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import instance from "../axios-instance";

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
    />
  );
}

export default function Page() {
  const [data, setData] = useState([]);
  const fetchCourses = async () => {
    const data = await instance.get("/courses", {
      params: {
        order: "ASC",
        page: 1,
        take: 10,
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
          title: 'My home',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: props => <LogoTitle {...props} />,
        }}
      />
      <Text style={styles.welcome}>Hello Tran Thieu</Text>
      <Text style={styles.title}>Find your course</Text>
      {/* <Button onPress={() => router.push("/signup")} title="Login" />
      <Button onPress={() => router.push("/exam")} title="Exam" /> */}
      <SearchBar />
      {data.length ? <PopularCourse data={data} /> : null}
      {data.length ? <PotentialCourse data={data} /> : null}
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
