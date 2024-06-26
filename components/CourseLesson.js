import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CourseLessonCard from '../components/CourseLessonCard';

const CourseLesson = ({ data, setTotalCompleteLesson }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <CourseLessonCard item={item} setTotalCompleteLesson={setTotalCompleteLesson}/>}
        keyExtractor={item => item.id}
        key={item => item.id}
        contentContainerStyle={{ rowGap: 10 }}
        showsVerticalScrollIndicator={false}
      />
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

export default CourseLesson;
