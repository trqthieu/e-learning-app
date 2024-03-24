import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import instance from '../../../axios-instance';
import VideoPlayer from '../../../components/VideoPlayer';
import { Button } from 'react-native-paper';
import { sortAscending } from '../../../utils';
import { getUser } from '../../../storage';
const tabs = ['Content'];
const options = [
  {
    value: 0,
    label: 'A',
  },
  {
    value: 1,
    label: 'B',
  },
  ,
  {
    value: 2,
    label: 'C',
  },
  ,
  {
    value: 3,
    label: 'D',
  },
];
const CourseDetail = () => {
  const local = useLocalSearchParams();
  const [data, setData] = useState();
  const [answerList, setAnswerList] = useState([]);
  const [selectedQues, setSelectedQues] = useState();
  const [dataQuestion, setDataQuestion] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  const [answered, setAnswered] = useState(false);
  const [checkAnswer, setCheckAnswer] = useState(false);
  console.log('checkAnswer', checkAnswer);
  const handleCheckAnswer = useCallback(() => {
    if (answerList?.length === dataQuestion?.length && !checkAnswer) {
      setCheckAnswer(true);
      handleSubmit(answerList.filter(item => item.isCorrect).length);
    }
    if (checkAnswer) {
      router.back({
        pathname: '/course-unit-detail',
        params: { unitId: data.courseUnit.id, type: 'exercise' },
      });
    }
    // setTrueAnswerList(dataQuestion);
    // if (!checkAnswer) {
    //   setCheckAnswer(true);
    //   return;
    // }
    // router.back({
    //   pathname: "/course-unit-detail",
    //   params: { unitId: data.courseUnit.id, type: "exercise" },
    // });
  }, [answerList?.length, dataQuestion?.length, checkAnswer]);

  const handleSubmit = async score => {
    try {
      const user = await getUser();
      await instance.post(`/user-exercise`, {
        userId: user.id,
        exerciseId: +local.id,
        score,
      });
    } catch (error) {
      console.log(error);
    }
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
    const quesList = [...data?.data?.data].sort(sortAscending) || [];
    setDataQuestion(quesList);
    setSelectedQues(quesList[0]);
  };
  useEffect(() => {
    fetchCourse();
    fetchQuestion();
  }, []);
  const handleChangeQuestion = index => {
    console.log(index);
    setSelectedQues(dataQuestion[index]);
  };
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
  // const handleSelectAnswer = () => {};
  const handleSelectAnswer = (quesId, answerId, isCorrect) => {
    if (answerList.some(item => item.quesId === quesId)) {
      const copyData = [...answerList];
      const hasIndex = copyData.findIndex(item => item.quesId === quesId);
      copyData.splice(hasIndex, 1, {
        quesId,
        answerId,
        isCorrect,
      });
      setAnswerList(copyData);
    } else {
      setAnswerList(prev => [...prev, { quesId, answerId, isCorrect }]);
    }
  };
  // console.log("check answer", answerList, dataQuestion, selectedQues);
  console.log('check data', data);
  return (
    <View
      style={{
        paddingHorizontal: 10,
        flex: 1,
        paddingVertical: 10,
        justifyContent: 'space-between',
      }}
    >
      <Stack.Screen
        options={{
          title: 'Exercise',
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={{
              fontSize: 23,
              fontWeight: 500,
            }}
          >
            {data?.courseUnit?.title}
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            {data?.title}
          </Text>
          <View
            style={{
              height: 400,
              marginTop: 10,
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <Image
                source={{
                  uri: data?.banner,
                }}
                style={{
                  resizeMode: 'contain',
                  height: 200,
                  width: '100%',
                  borderRadius: 10,
                  marginTop: 10,
                }}
              />
              {/* {data?.video ? <VideoPlayer uri={data.video} /> : null} */}
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
            </ScrollView>
          </View>
          <View>
            <Text
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                fontWeight: '600',
                fontSize: 16,
                marginTop: 20,
              }}
            >
              {selectedQues?.title}
            </Text>
            <View style={styles.answerOptions}>
              {selectedQues?.questionSelects?.map((item, index) => (
                <Button
                  style={styles.singleItem}
                  key={index}
                  mode='contained'
                  buttonColor={
                    checkAnswer
                      ? answerList.find(x => x.answerId === item.id)
                        ? answerList.find(x => x.answerId === item.id).isCorrect
                          ? '#32a84e'
                          : 'red'
                        : '#745695'
                      : answerList.find(x => x.answerId === item.id)
                      ? '#CCAAD6'
                      : '#745695'
                  }
                  onPress={() => {
                    if (!checkAnswer) {
                      handleSelectAnswer(
                        selectedQues.id,
                        item.id,
                        item.isCorrect
                      );
                    }
                  }}
                >
                  <Text>{`${
                    options.find(option => option?.value === item?.order)?.label
                  }. ${item.key}`}</Text>
                </Button>
              ))}
            </View>
          </View>
          {selectedQues && (
            <View
              style={{
                marginBottom: 50,
              }}
            >
              {selectedQues?.order !== 0 && (
                <Button
                  mode='text'
                  onPress={() => handleChangeQuestion(selectedQues.order - 1)}
                  style={{ width: '50%', position: 'absolute' }}
                >
                  Prev
                </Button>
              )}
              {selectedQues?.order !== dataQuestion.length - 1 && (
                <Button
                  mode='text'
                  onPress={() => handleChangeQuestion(selectedQues.order + 1)}
                  style={{ width: '50%', position: 'absolute', right: 0 }}
                >
                  Next
                </Button>
              )}
            </View>
          )}
          {checkAnswer && (
            <View
              style={{
                marginBottom: 10,
              }}
            >
              <Text>
                Correct answer:{' '}
                {
                  selectedQues?.questionSelects?.find(item => item.isCorrect)
                    .key
                }
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: '100%',
            backgroundColor: 'orange',
            borderRadius: 20,
            paddingVertical: 10,
            marginBottom: 30,
          }}
          // disabled={!checkAnswer}
          onPress={handleCheckAnswer}
        >
          <Text
            style={{
              fontWeight: '800',
              textAlign: 'center',
            }}
          >
            {checkAnswer ? 'Completed this exercise' : 'Check answers'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  answerOptions: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
    padding: 10,
  },
  singleItem: {
    width: 150,
  },
  buttonABC: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    backgroundColor: 'red',
  },
});

export default CourseDetail;
