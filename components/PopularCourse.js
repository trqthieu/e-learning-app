import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import CourseCard from './CourseCard';

const PopularCourse = () => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Courses</Text>
        <TouchableOpacity>
          <Text>Show all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        renderItem={({ item }) => <CourseCard item={item} />}
        keyExtractor={item => item.id}
        key={item => item.id}
        contentContainerStyle={{ columnGap: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
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
