import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Tabs from "../../components/Tabs";
const tabs = ["Content"];
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import instance from "../../axios-instance";
import { convertTime } from "../../utils";
import VideoPlayer from "../../components/VideoPlayer";
import Video from "react-native-video";
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
        {data?.video ? (
          <Video
            source={{ uri: data?.video }} // Can be a URL or a local file.
            // ref={(ref) => {
            //   this.player = ref;
            // }} // Store reference
            // onBuffer={this.onBuffer} // Callback when remote video is buffering
            // onError={this.videoError} // Callback when video cannot be loaded
            // style={styles.backgroundVideo}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default CourseDetail;
