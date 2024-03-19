import { Stack, router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CourseLesson from '../../../components/CourseLesson';
import CourseExercise from '../../../components/CourseExercise';
import Tabs from '../../../components/Tabs';
import { useEffect, useState } from 'react';
import instance from '../../../axios-instance';
import { getUser } from '../../../storage';
const tabs = [
  {
    label: 'Lesson',
    value: 'lesson',
  },
  {
    label: 'Exercise',
    value: 'exercise',
  },
];

export default function Page() {
  const item = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(tabs[0].value);
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
  const handleCompleteUnit = async () => {
    const user = await getUser();
    const result = await instance.get('/user-course-unit', {
      params: {
        userId: user.id,
      },
    });
    const userCourseUnit = result.data.data.find(
      i => i?.courseUnit?.id === Number.parseInt(item.unitId)
    );
    const data = await instance.patch(
      `/user-course-unit/${userCourseUnit.id}`,
      {
        userId: user.id,
        courseUnitId: userCourseUnit.courseUnit.id,
        is_completed: true,
      }
    );
    console.log(
      'data.data?.courseUnit?.courseSection?.course?.id',
      data.data?.courseUnit?.courseSection?.course?.id
    );
    router.back({
      pathname: `/course-section`,
      params: { courseId: data.data?.courseUnit?.courseSection?.course?.id },
    });
    return;
  };
  useEffect(() => {
    if (item.type === 'exercise') {
      setActiveTab(tabs[1].value);
    }
    fetchCourses();
  }, []);

  const displayTabContent = () => {
    console.log(activeTab);
    switch (activeTab) {
      case 'exercise':
        return (
          <View
            style={{
              flex: 1,
            }}
          >
            <CourseExercise data={dataEx} />
          </View>
        );
      case 'lesson':
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
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          position: 'absolute',
          bottom: 0,
          paddingHorizontal: 20,
          width: '100%',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: '100%',
            backgroundColor: 'orange',
            borderRadius: 20,
            marginLeft: 10,
            paddingVertical: 10,
          }}
          onPress={() => handleCompleteUnit()}
        >
          <Text
            style={{
              fontWeight: '800',
              textAlign: 'center',
            }}
          >
            Complete unit
          </Text>
        </TouchableOpacity>
      </View>
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
