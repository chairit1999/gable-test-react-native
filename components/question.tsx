import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { QuestionType, RootStackParamList } from "../App";
import { getQuestionData, storeLeaderBoardData } from "../util/storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Question">;

export default function QuestionScreen({ navigation, route }: Props) {
  const numberQuestionPerPage = 5;
  const choiceIndex = ["A", "B", "C", "D"];
  const [isDisableNext, setIsDisableNext] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [questions, setQuestions] = useState<QuestionType[][]>([]);

  useEffect(() => {
    const filterIsAnswer = questions[currentPage]?.filter(
      (item) => item.selectOption
    );
    if (filterIsAnswer?.length === numberQuestionPerPage) {
      setIsDisableNext(false);
    }
  }, [questions]);

  useEffect(() => {
    const fetchData = async () => {
      const questions = await getQuestionData();
      const questionPerPage: QuestionType[][] = [];
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

  const calculatePoint = () => {
    return questions.flat().reduce((point, currentQuestion) => {
      if (
        currentQuestion.selectOption &&
        currentQuestion.answer ===
          currentQuestion.options[currentQuestion?.selectOption - 1].id
      )
        point++;
      return point;
    }, 0);
  };

  const onSubmit = async () => {
    const userName = route.params?.name;
    await storeLeaderBoardData(userName, calculatePoint());
    navigation.navigate("LeaderBoard");
  };

  const onNextPage = async () => {
    setIsDisableNext(true);
    if (currentPage === questions.length - 1) {
      onSubmit();
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <View
      style={[
        styles.container,
        questions.length === 0 ? { justifyContent: "center" } : {},
      ]}
    >
      {questions.length === 0 && <ActivityIndicator size={"large"} />}
      {questions && questions.length > 0 && (
        <ProgressSteps
          activeStep={currentPage}
          disabledStepNumColor={"white"}
          disabledStepIconColor={"#747475"}
          progressBarColor={"#747475"}
        >
          {questions.map((questionInPage, pageIndex) => {
            const pageKey = `page-${pageIndex + 1}`;
            return (
              <ProgressStep key={pageKey} label="" removeBtnRow={true}>
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
                                  isActiveOption ? styles.activeBoxChoice : {},
                                ]}
                              >
                                <View style={styles.containerChoiceIndex}>
                                  <Text style={styles.choiceIndex}>
                                    {choiceIndex[optionIndex]}
                                  </Text>
                                </View>
                                <Text
                                  style={[
                                    styles.choiceText,
                                    isActiveOption
                                      ? styles.activeTextChoice
                                      : {},
                                  ]}
                                >
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
      {questions && questions.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            disabled={isDisableNext}
            style={[
              styles.nextButton,
              isDisableNext ? { backgroundColor: "#747475" } : {},
            ]}
            onPress={() => {
              onNextPage();
            }}
          >
            <Text style={styles.nextButtonText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  nextButton: {
    marginTop: 10,
    marginBottom: 10,
    height: 50,
    width: "90%",
    borderRadius: 8,
    backgroundColor: "#31CD63",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container: { paddingTop: 30, flex: 1, backgroundColor: "#EDE8E3" },
  titleQuestion: {
    fontSize: 20,
    color: "navy",
    textAlign: "center",
    fontWeight: "600",
    fontFamily: "Noto Sans Thai",
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
    height: 50,
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
    backgroundColor: "#EDE8E3",
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
    fontFamily: "Noto Sans Thai",
  },
  activeBoxChoice: {
    backgroundColor: "#45C486",
  },
  activeTextChoice: {
    color: "white",
  },
});
