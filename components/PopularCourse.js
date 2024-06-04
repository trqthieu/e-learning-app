import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import CourseCard from './CourseCard';
import { router } from 'expo-router';

const PopularCourse = ({ data }) => {
  console.log('check data', data);
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Khóa học phổ biến</Text>
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
        renderItem={({ item }) => <CourseCard item={item} />}
        keyExtractor={item => item.id}
        key={item => item.id}
        contentContainerStyle={{ columnGap: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      /> */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.map((item, index) => (
          <CourseCard item={item} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default PopularCourse;
