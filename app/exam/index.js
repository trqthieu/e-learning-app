import { Stack, router, useLocalSearchParams } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Exam from '../../components/Exam';
import { useEffect, useState } from 'react';
import instance from '../../axios-instance';
import { RadioButton } from 'react-native-paper';

export default function Page() {
  const item = useLocalSearchParams();
  const [data, setData] = useState([]);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const handleCheckAnswer = () => {
    if (!checkAnswer) {
      setCheckAnswer(true);
      return;
    }
    router.back({
      pathname: '/home',
    });
  };
  const fetchCourses = async () => {
    const data = await instance.get('/questions', {
      params: {
        page: 1,
        take: 50,
        examId: item.examId,
      },
    });
    setData(data?.data?.data || []);
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Exam Detail',
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {data?.map((question, index) => {
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
                          if (answerLength === data.length) {
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
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },
});
