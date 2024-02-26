import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import instance from "../../axios-instance";
import Tabs from "../../components/Tabs";
import VideoPlayer from "../../components/VideoPlayer";
const tabs = ["Content"];
const CourseDetail = () => {
  const local = useLocalSearchParams();
  const [data, setData] = useState();
  console.log("data", data?.video);
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
      case "Content":
        return (
          <View>
            <Text
              style={{
                textAlign: "justify",
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
          resizeMode: "contain",
          height: 250,
          width: "100%",
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
        {/* {data?.video ? <VideoPlayer uri={data.video} /> : null} */}
      </ScrollView>
    </View>
  );
};

export default CourseDetail;
