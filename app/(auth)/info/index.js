import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getUser } from '../../../storage';
import instance from '../../../axios-instance';
import UserExamList from '../../../components/UserExamList';
// import instance from './axios-instance'; // Import your axios instance or fetch method

const ExamReportPage = () => {
  const [data, setExamResults] = useState([]);

  useEffect(() => {
    // Fetch user's exam results from the database
    const fetchExamResults = async () => {
      try {
        const user = await getUser();
        const response = await instance.get('/user-exam', {
          params: {
            take: 50,
            order: 'DESC',
          },
        });
        const responseData = response.data;
        const userExam = responseData?.data?.filter(
          userExam => userExam?.user?.id === user?.id
        );
        setExamResults(userExam);
      } catch (error) {
        console.error('Error fetching exam results:', error);
      }
    };

    fetchExamResults();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Exam result',
        }}
      />
      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        {data.length ? <UserExamList data={data} /> : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default ExamReportPage;
