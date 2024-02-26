import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import instance from "../../axios-instance";
import Tabs from "../../components/Tabs";
import VideoPlayer from "../../components/VideoPlayer";
import { RadioButton } from "react-native-paper";
import { Audio } from "expo-av";
const tabs = ["Content"];
const CourseDetail = () => {
  
  const local = useLocalSearchParams();
  const [data, setData] = useState();
  const [dataQuestion, setDataQuestion] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  console.log(selectedValue);
  console.log("dataQuestion", dataQuestion);
  const fetchCourse = async () => {
    const data = await instance.get(`/exams/${local.id}`);
    setData(data?.data || null);
  };
  const test = async () => {
    console.log("play sound");
    const sound = new Audio.Sound();
    await sound.loadAsync({
      uri: "https://firebasestorage.googleapis.com/v0/b/e-learning-25868.appspot.com/o/b5bc670d-b08b-41b5-9064-029eb50933df-abortion__gb_1.mp3?alt=media",
    });

    await sound.playAsync();
  };
  const fetchQuestion = async () => {
    const data = await instance.get(`/questions`, {
      params: {
        examId: local.id,
      },
    });
    setDataQuestion(data?.data?.data || []);
  };
  useEffect(() => {
    fetchCourse();
    fetchQuestion();
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
      {/* <Image
        source={{
          uri: data?.banner,
        }}
        style={{
          resizeMode: "contain",
          height: 250,
          width: "100%",
          borderRadius: 20,
        }}
      /> */}
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
          {data?.description} - {data?.category}
          {data?.level}
        </Text>

        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {displayTabContent()}
        {/* {data?.video ? <VideoPlayer uri={data.video} /> : null} */}
        <Button title="Play sound" onPress={() => test()} />
        <Text
          style={{
            fontWeight: "600",
            marginTop: 10,
            fontSize: 16,
          }}
        >
          Questions
        </Text>
        {dataQuestion
          ?.sort((a, b) => a?.order - b?.order)
          ?.map((question) => {
            return (
              <View>
                <Text
                  style={{
                    fontWeight: "600",
                  }}
                >
                  {question.title}
                </Text>
                <View>
                  {question?.questionSelects?.map((selection) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <RadioButton.Android
                          value={selection?.id}
                          status={
                            selectedValue?.[question?.id] === selection?.id
                              ? "checked"
                              : "unchecked"
                          }
                          onPress={() =>
                            setSelectedValue({
                              ...selectedValue,
                              [question?.id]: selection.id,
                            })
                          }
                          color="#007BFF"
                        />
                        <Text>{selection?.key}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: "white",
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
});

export default CourseDetail;
