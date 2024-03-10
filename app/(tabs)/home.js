import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SearchBar from '../../components/SearchBar';
import PopularCourse from '../../components/PopularCourse';
import PotentialCourse from '../../components/PotentialCourse';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import instance from '../../axios-instance';
import { clearStorage, getUser } from '../../storage';
import { SafeAreaView } from 'react-native-safe-area-context';

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
    />
  );
}

export default function Page() {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const fetchCourses = async () => {
    try {
      const user = await getUser();
      setCurrentUser(user);
      const data = await instance.get('/courses', {
        params: {
          order: 'ASC',
          page: 1,
          take: 10,
        },
      });
      setData(data?.data?.data || []);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcome}>
          Hello {`${currentUser?.firstName} ${currentUser?.lastName}`}
        </Text>
        <Text style={styles.title}>Find your course</Text>
        <Button onPress={() => router.push('/login')} title='Login' />
        {/* <Button onPress={() => router.push('/video')} title='Exam' /> */}
        <SearchBar />
        <Image
          source={require('../../assets/thumbnail.jpg')}
          style={{
            resizeMode: 'contain',
            height: 250,
            width: '100%',
            borderRadius: 20,
          }}
        />
        <Text style={styles.title}>Keep going</Text>
        <Text style={styles.welcome}>Learn many necessary skills</Text>
        {data.length ? <PopularCourse data={data} /> : null}
        {data.length ? <PotentialCourse data={data} /> : null}
      </ScrollView>
    </SafeAreaView>
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
    fontWeight: '800',
  },
});
