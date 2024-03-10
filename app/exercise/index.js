import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import instance from '../../axios-instance';
import Tabs from '../../components/Tabs';
import VideoPlayer from '../../components/VideoPlayer';
import { RadioButton } from 'react-native-paper';
const tabs = ['Content'];
const CourseDetail = () => {
  const local = useLocalSearchParams();
  const [data, setData] = useState();
  console.log(data);
  const [dataQuestion, setDataQuestion] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  const [answered, setAnswered] = useState(false);
  const [checkAnswer, setCheckAnswer] = useState(false);
  console.log(selectedValue);
  const handleCheckAnswer = () => {
    if (!checkAnswer) {
      setCheckAnswer(true);
      return;
    }
    router.back({
      pathname: '/course-unit-detail',
      params: { unitId: data.courseUnit.id, type: 'exercise' },
    });
  };
  const fetchCourse = async () => {
    const data = await instance.get(`/exercises/${local.id}`);
    setData(data?.data || null);
  };
  const fetchQuestion = async () => {
    const data = await instance.get(`/questions`, {
      params: {
        exerciseId: local.id,
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
        {/* {data?.video ? <VideoPlayer uri={data.video} /> : null} */}
        <Text
          style={{
            fontWeight: '600',
            marginTop: 10,
            fontSize: 16,
          }}
        >
          Questions
        </Text>
        {dataQuestion?.map((question, index) => {
          return (
            <View key={index}>
              <Text
                style={{
                  fontWeight: '600',
                }}
              >
                {question.title}
              </Text>
              <View>
                {question?.questionSelects?.map((selection, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <RadioButton.Android
                        disabled={checkAnswer}
                        value={selection?.id}
                        status={
                          selectedValue?.[question?.id] === selection?.id
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => {
                          const answerLength = Object.keys({
                            ...selectedValue,
                            [question?.id]: selection.id,
                          }).length;
                          if (answerLength === dataQuestion.length) {
                            setAnswered(true);
                          }
                          setSelectedValue({
                            ...selectedValue,
                            [question?.id]: selection.id,
                          });
                        }}
                        color='#007BFF'
                      />
                      <Text
                        style={
                          checkAnswer && selection.isCorrect
                            ? {
                                color: 'green',
                                fontWeight: '800',
                              }
                            : {
                                color: '#000',
                              }
                        }
                      >
                        {selection?.key}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          width: '100%',
          backgroundColor: answered ? 'orange' : '#ccc',
          borderRadius: 20,
          paddingVertical: 10,
        }}
        onPress={() => handleCheckAnswer()}
      >
        <Text
          style={{
            fontWeight: '800',
            textAlign: 'center',
          }}
        >
          {checkAnswer ? 'Complete this exercise' : 'Check answers'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
});

export default CourseDetail;
