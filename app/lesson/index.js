import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import instance from '../../axios-instance';
import Tabs from '../../components/Tabs';
import VideoPlayer from '../../components/VideoPlayer';
import { ResizeMode, Video } from 'expo-av';
const tabs = ['Content'];
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
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const displayTabContent = () => {
    switch (activeTab) {
      case 'Content':
        return (
          <View>
            <Text
              style={{
                textAlign: 'justify',
                marginTop: 5,
              }}
            >
              {data?.content}
            </Text>
          </View>
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
          {data?.description} - {data?.courseUnit?.title}
          {data?.level}
        </Text>

        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {displayTabContent()}
        <Text>Hello this is my video</Text>
        <Video
          ref={video}
          // style={styles.video}
          source={{
            uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        {/* {data?.video ? <VideoPlayer uri={data.video} /> : null} */}
        {data?.video ? (
          <View>
            <Video
              ref={video}
              style={{
                alignSelf: 'center',
                width: 360,
                height: 200,
              }}
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
          onPress={() =>
            router.push({
              pathname: '/course-unit-list',
              params: { sectionId: item.id },
            })
          }
        >
          <Text
            style={{
              fontWeight: '800',
              textAlign: 'center',
            }}
          >
            Go to next lesson
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CourseDetail;
