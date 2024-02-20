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

const PotentialCourse = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Courses</Text>
        <TouchableOpacity>
          <Text>Show all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={({ item }) => <CourseCardSmall item={item} />}
        keyExtractor={item => item.id}
        key={item => item.id}
        contentContainerStyle={{ rowGap: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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
