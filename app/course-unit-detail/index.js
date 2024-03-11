import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import CourseLesson from '../../components/CourseLesson';
import CourseExercise from '../../components/CourseExercise';
import Tabs from '../../components/Tabs';
import { useEffect, useState } from 'react';
import instance from '../../axios-instance';
const tabs = ['Lesson', 'Exercise'];

export default function Page() {
  const item = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [data, setData] = useState([]);
  const [dataEx, setDataEx] = useState([]);
  const fetchCourses = async () => {
    const data = await instance.get('/lessons', {
      params: { courseUnitId: item.unitId },
    });
    setData(data?.data?.data || []);
    const dataEx = await instance.get('/exercises', {
      params: { courseUnitId: item.unitId },
    });
    setDataEx(dataEx?.data?.data || []);
  };
  useEffect(() => {
    if (item.type === 'exercise') {
      setActiveTab(tabs[1]);
    }
    fetchCourses();
  }, []);
  const displayTabContent = () => {
    switch (activeTab) {
      case 'Exercise':
        return (
          <View
            style={{
              flex: 1,
            }}
          >
            <CourseExercise data={dataEx} />
          </View>
        );
      case 'Lesson':
        return (
          <View
            style={{
              flex: 1,
            }}
          >
            <CourseLesson data={data} />
          </View>
        );
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Course Unit Detail',
        }}
      />
      {/* <Text style={styles.title}>Course unit detail</Text> */}
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
    fontWeight: '800',
    marginBottom: 10,
  },
});
