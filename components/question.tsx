import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import questionData from "../assets/question.json";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { QuestionInterface } from "../App";
import { getQuestionData } from "../util/storage";

interface Props {
  navigation: any;
  route: any;
}
export default function QuestionScreen({ navigation, route }: Props) {
  const numberQuestionPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [questions, setQuestions] = useState<QuestionInterface[][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const questions = await getQuestionData();
      const questionPerPage: QuestionInterface[][] = [];
      questions?.forEach((item) => {
        if (
          !questionPerPage.length ||
          questionPerPage[questionPerPage.length - 1].length ==
            numberQuestionPerPage
        )
          questionPerPage.push([]);
        questionPerPage[questionPerPage.length - 1].push(item);
      });
      setQuestions(questionPerPage);
    };
    fetchData();
  }, []);

  const choiceIndex = ["A", "B", "C", "D"];
  const onStepPress = (position: number) => {
    setCurrentPage(position);
  };
  return (
    <View style={styles.container}>
      {questions && questions.length > 0 && (
        <ProgressSteps>
          {questions.map((questionInPage, pageIndex) => {
            const pageKey = `page-${pageIndex + 1}`;
            return (
              <ProgressStep key={pageKey} label="">
                {questionInPage.map((question, questionIndex) => {
                  const questionKey = `${pageKey}-question-${questionIndex}`;
                  return (
                    <View key={questionKey}>
                      <Text style={styles.titleQuestion}>
                        {pageIndex * numberQuestionPerPage +
                          (questionIndex + 1)}
                        . {question?.question}
                      </Text>
                      <View style={styles.option}>
                        {question?.options?.map((option, optionIndex) => {
                          const optionKey = `${questionKey}-option-${optionIndex}`;
                          const isActiveOption =
                            question.selectOption === optionIndex + 1;
                          return (
                            <TouchableWithoutFeedback
                              key={optionKey}
                              onPress={() => {
                                const newValue = [...questions];
                                newValue[pageIndex][
                                  questionIndex
                                ].selectOption = optionIndex + 1;
                                setQuestions(newValue);
                              }}
                            >
                              <View
                                style={[
                                  styles.boxOption,
                                  isActiveOption ? styles.activeChoice : {},
                                ]}
                              >
                                <View style={styles.containerChoiceIndex}>
                                  <Text style={styles.choiceIndex}>
                                    {choiceIndex[optionIndex]}
                                  </Text>
                                </View>
                                <Text style={styles.choiceText}>
                                  {option?.name}
                                </Text>
                              </View>
                            </TouchableWithoutFeedback>
                          );
                        })}
                      </View>
                    </View>
                  );
                })}
              </ProgressStep>
            );
          })}
        </ProgressSteps>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "antiquewhite" },
  titleQuestion: {
    fontSize: 20,
    color: "navy",
    textAlign: "center",
    fontWeight: "600",
  },
  option: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  boxOption: {
    backgroundColor: "white",
    flexDirection: "row",
    width: "90%",
    height: 40,
    marginTop: 10,
    borderRadius: 5,
  },
  containerChoiceIndex: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  choiceIndex: {
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "antiquewhite",
    height: 30,
    width: 30,
    borderRadius: 20,
    fontWeight: "600",
  },
  choiceText: {
    width: "90%",
    marginLeft: 10,
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  activeChoice: {
    backgroundColor: "chartreuse",
  },
});
