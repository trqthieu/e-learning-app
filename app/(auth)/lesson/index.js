import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import instance from '../../../axios-instance';
import Tabs from '../../../components/Tabs';
import VideoPlayer from '../../../components/VideoPlayer';
import { ResizeMode, Video } from 'expo-av';
import { StyleSheet } from 'react-native';

const CourseDetail = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const local = useLocalSearchParams();
  const [data, setData] = useState();
  console.log('data', data);
  const fetchCourse = async () => {
    const data = await instance.get(`/lessons/${local.id}`);
    setData(data?.data || null);
  };
  useEffect(() => {
    fetchCourse();
  }, []);
  const handleLesson = () => {
    router.back({
      pathname: '/course-unit-detail',
      params: { unitId: data.courseUnit.id },
    });
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
          title: 'Lesson',
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
          {data?.title}
        </Text>
        <Text
          style={{
            marginTop: 5,
          }}
        >
          {data?.description}
          {data?.level}
        </Text>
        <View>
          <Text
            style={{
              textAlign: 'justify',
              marginVertical: 20,
            }}
          >
            {data?.content}
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
          </Text>
        </View>
        {/* <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        /> */}
        {/* {data?.video ? <VideoPlayer uri={data.video} /> : null} */}
        {data?.video ? (
          <View>
            <Video
              ref={video}
              style={styles.video}
              source={{
                uri: data.video,
              }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
          </View>
        ) : (
          <Text>Loading video</Text>
        )}
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
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: '100%',
            backgroundColor: 'orange',
            borderRadius: 20,
            marginLeft: 10,
            paddingVertical: 10,
          }}
          onPress={() => handleLesson()}
        >
          <Text
            style={{
              fontWeight: '800',
              textAlign: 'center',
            }}
          >
            Complete lesson
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  video: {
    alignSelf: 'center',
    width: 360,
    height: 200,
    borderRadius: 10,
    marginBottom: 60,
  },
});

export default CourseDetail;
