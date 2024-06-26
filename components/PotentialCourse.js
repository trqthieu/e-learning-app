import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import CourseCardSmall from './CourseCardSmall';
import { router } from 'expo-router';

const PotentialCourse = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Khóa học tiềm năng</Text>
        <TouchableOpacity
          onPress={() => {
            router.push('/search');
          }}
        >
          <Text>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      {/* <FlatList
        data={data}
        renderItem={({ item }) => <CourseCardSmall item={item} />}
        keyExtractor={item => item.id}
        key={item => item.id}
        contentContainerStyle={{ rowGap: 10 }}
        showsVerticalScrollIndicator={false}
      /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {data?.map((item, index) => (
          <CourseCardSmall item={item} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingVertical: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  search: {},
});

export default PotentialCourse;
