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
  const [dataPotential, setDataPotential] = useState([]);
  console.log(dataPotential);
  console.log(data);
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
      const dataPotential = await instance.get('/courses', {
        params: {
          order: 'DESC',
          page: 1,
          take: 3,
        },
      });
      setData(data?.data?.data || []);
      setDataPotential(dataPotential?.data?.data || []);
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
          Xin chào {`${currentUser?.firstName} ${currentUser?.lastName}`}
        </Text>
        <Text style={styles.title}>Khám phá các khóa học miễn phí</Text>
        {/* <SearchBar /> */}
        <Image
          source={require('../../assets/thumbnail.jpg')}
          style={{
            resizeMode: 'contain',
            height: 250,
            width: '100%',
            borderRadius: 40,
          }}
        />
        <Text style={styles.title}>Tiếp tục tiến lên</Text>
        <Text style={styles.welcome}>Đạt được những kỹ năng cần thiết</Text>
        {data.length ? <PopularCourse data={data} /> : null}
        {dataPotential.length ? <PotentialCourse data={dataPotential} /> : null}
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
