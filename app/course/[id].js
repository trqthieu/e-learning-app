import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Tabs from "../../components/Tabs";
const tabs = ["About", "Qualifications", "Responsibilities"];
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const CourseDetail = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Text
            style={{
              textAlign: "justify",
            }}
          >
            Qualifications: It is a long established fact that a reader will be
            distracted by the readable content of a page when looking at its
            layout. The point of using Lorem Ipsum is that it has a more-or-less
            normal distribution of letters, as opposed to using 'Content here,
            content here', making it look like readable English. Many desktop
            publishing packages and web page editors now use Lorem Ipsum as
            their default model text, and a search for 'lorem ipsum' will
            uncover many web sites still in their infancy. Various versions have
            evolved over the years, sometimes by accident, sometimes on purpose
            (injected humour and the like).
          </Text>
        );
      case "About":
        return (
          <Text
            style={{
              textAlign: "justify",
            }}
          >
            About: It is a long established fact that a reader will be
            distracted by the readable content of a page when looking at its
            layout. The point of using Lorem Ipsum is that it has a more-or-less
            normal distribution of letters, as opposed to using 'Content here,
            content here', making it look like readable English. Many desktop
            publishing packages and web page editors now use Lorem Ipsum as
            their default model text, and a search for 'lorem ipsum' will
            uncover many web sites still in their infancy. Various versions have
            evolved over the years, sometimes by accident, sometimes on purpose
            (injected humour and the like).
          </Text>
        );
      case "Responsibilities":
        return (
          <Text
            style={{
              textAlign: "justify",
            }}
          >
            Responsibilities: It is a long established fact that a reader will
            be distracted by the readable content of a page when looking at its
            layout. The point of using Lorem Ipsum is that it has a more-or-less
            normal distribution of letters, as opposed to using 'Content here,
            content here', making it look like readable English. Many desktop
            publishing packages and web page editors now use Lorem Ipsum as
            their default model text, and a search for 'lorem ipsum' will
            uncover many web sites still in their infancy. Various versions have
            evolved over the years, sometimes by accident, sometimes on purpose
            (injected humour and the like).
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
      <Image
        source={{
          uri: "https://www.freecodecamp.org/news/content/images/2023/04/reactnative.png",
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
          React Native
        </Text>
        <Text
          style={{
            marginTop: 5,
          }}
        >
          David John - Beginner
        </Text>
        <View
          style={{
            flexDirection: "row",
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
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                fontSize: 16,
              }}
            >
              4.96
            </Text>
            <Text>(23)</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome5 name="user-graduate" size={24} color="black" />
            <Text
              style={{
                marginLeft: 5,
              }}
            >
              496 students
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <Ionicons name="time" size={24} color="black" />
            <Text
              style={{
                marginLeft: 5,
              }}
            >
              2 hours 30 minutes
            </Text>
          </View>
        </View>
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {displayTabContent()}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0)",
          position: "absolute",
          bottom: 0,
          paddingHorizontal: 20,
          width: "100%",
        }}
      >
        <TouchableOpacity activeOpacity={0.8}>
          <MaterialIcons name="watch-later" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: "100%",
            backgroundColor: "orange",
            borderRadius: 20,
            marginLeft: 10,
            paddingVertical: 10,
          }}
          onPress={() =>
            router.push({ pathname: `/course-section`, params: { courseId: 1 } })
          }
        >
          <Text
            style={{
              fontWeight: "800",
              textAlign: "center",
            }}
          >
            Enroll course
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CourseDetail;
