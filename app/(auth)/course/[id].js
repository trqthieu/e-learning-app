import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Tabs from '../../../components/Tabs';
const tabs = [
  {
    value: 'description',
    label: 'Mô tả',
  },
  {
    label: 'Mục tiêu',
    value: 'target',
  },
  {
    label: 'Hướng dẫn',
    value: 'guideline',
  },
];
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import instance from '../../../axios-instance';
import { convertTime } from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../../../storage';

const CourseDetail = () => {
  const local = useLocalSearchParams();
  const [data, setData] = useState();
  const [isRegistered, setIsRegistered] = useState();
  const [totalRegister, setTotalRegister] = useState(0);
  const fetchCourse = async () => {
    const user = await getUser();
    console.log({
      userId: user.id,
      courseId: local.id,
    });
    const registerResult = await instance.get('/user-course', {
      params: {
        userId: user.id,
        courseId: local.id,
      },
    });
    console.log('registerResult', registerResult);
    if (registerResult.data?.data?.length) {
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
    }
    const data = await instance.get(`/courses/${local.id}`);
    setData(data?.data || null);
  };

  const handleEnrollCourse = async () => {
    const user = await getUser();
    const registerResult = await instance.get('/user-course', {
      params: {
        userId: user.id,
        courseId: local.id,
      },
    });
    if (registerResult.data?.data?.length) {
      router.push({
        pathname: `/course-section`,
        params: { courseId: data?.id },
      });
      return;
    }
    const result = await instance.post(`/user-course`, {
      userId: user.id,
      courseId: data?.id,
    });
    console.log('result', result.data);
    router.push({
      pathname: `/course-section`,
      params: { courseId: data?.id },
    });
  };

  const getTotalRegister = async () => {
    const registerResult = await instance.get('/user-course', {
      params: {
        courseId: local.id,
      },
    });
    const total = registerResult.data?.data?.length ?? 0;
    setTotalRegister(total);
  };

  useEffect(() => {
    fetchCourse();
    getTotalRegister();
  }, []);
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const displayTabContent = () => {
    switch (activeTab) {
      case 'target':
        return (
          <View>
            {data?.target?.map((item, index) => (
              <Text
                key={index}
                style={{
                  textAlign: 'justify',
                  marginTop: 5,
                }}
              >
                {item}
              </Text>
            ))}
          </View>
        );
      case 'description':
        return (
          <View>
            {data?.description?.map((item, index) => (
              <Text
                key={index}
                style={{
                  textAlign: 'justify',
                  marginTop: 5,
                }}
              >
                {item}
              </Text>
            ))}
          </View>
        );
      case 'guideline':
        return (
          <Text
            style={{
              textAlign: 'justify',
              marginTop: 5,
            }}
          >
            {data.guideline}
          </Text>
        );
      default:
        return null;
    }
  };
  return (
    <View
      style={{
        paddingHorizontal: 10,
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          title: 'Chi tiết khóa học',
        }}
      />
      <Image
        source={{
          uri: data?.banner,
        }}
        style={{
          resizeMode: 'contain',
          height: 250,
          width: '100%',
          borderRadius: 20,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          {data?.name}
        </Text>
        <Text
          style={{
            marginTop: 5,
          }}
        >
          {`${data?.teacher?.firstName} ${data?.teacher?.lastName}`} -{' '}
          {data?.level}
        </Text>
        {/* <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}
        >
          <FontAwesome name="star" size={20} color="orange" />
          <FontAwesome name="star" size={20} color="orange" />
          <FontAwesome name="star" size={20} color="orange" />
          <FontAwesome name="star" size={20} color="orange" />
          <FontAwesome name="star" size={20} color="orange" />
          <View
            style={{
              marginLeft: 10,
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                fontWeight: '500',
                fontSize: 16,
              }}
            >
              4.96
            </Text>
            <Text>(23)</Text>
          </View>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <FontAwesome5 name="user-graduate" size={24} color="black" />
            <Text
              style={{
                marginLeft: 5,
              }}
            >
              {totalRegister} học sinh
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
            }}
          >
            <Ionicons name="time" size={24} color="black" />
            <Text
              style={{
                marginLeft: 5,
              }}
            >
              {convertTime(data?.duration)}
            </Text>
          </View>
        </View>
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {displayTabContent()}
      </ScrollView>
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
        {/* <TouchableOpacity activeOpacity={0.8}>
          <MaterialIcons name="watch-later" size={24} color="black" />
        </TouchableOpacity> */}

        {typeof isRegistered === 'boolean' ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: '100%',
              backgroundColor: 'orange',
              borderRadius: 20,
              marginLeft: 10,
              paddingVertical: 10,
            }}
            onPress={() => handleEnrollCourse()}
          >
            <Text
              style={{
                fontWeight: '800',
                textAlign: 'center',
              }}
            >
              {isRegistered ? 'Tiếp tục học' : 'Đăng ký học'}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default CourseDetail;
