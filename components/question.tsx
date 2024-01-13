import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import questionData from "../assets/question.json";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { QuestionInterface } from "../App";

interface Props {
  navigation: any;
  route: any;
}

interface QuestionStepInterface {
  questions: QuestionInterface[];
}

export default function QuestionScreen({ navigation, route }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const choiceIndex = { 0: "A", 1: "B", 2: "C", 3: "D" };
  const onStepPress = (position: number) => {
    setCurrentPage(position);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "antiquewhite" }}>
      <ProgressSteps>
        <ProgressStep label="">
          <View>
            <Text style={styles.titleQuestion}>
              1. {questionData[0].question}
            </Text>
            <View style={styles.option}>
              <View style={{ ...styles.boxOption, ...styles.activeChoice }}>
                <View
                  style={{
                    width: "15%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.choiceIndex}>A</Text>
                </View>
                <Text style={styles.choiceText}>
                  {questionData[0].options[0].name}
                </Text>
              </View>
            </View>
          </View>
        </ProgressStep>
        <ProgressStep label="">
          <View style={{ alignItems: "center" }}>
            <Text>This is the content within step 2!</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
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
  },
  boxOption: {
    backgroundColor: "white",
    flexDirection: "row",
    width: "90%",
    height: 40,
    marginTop: 10,
    borderRadius: 5,
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
