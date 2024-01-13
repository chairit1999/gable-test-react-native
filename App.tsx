import LoginScreen from "./components/login";
import React, { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuestionScreen from "./components/question";
import questionData from "./assets/question.json";
import { storeQuestionData } from "./util/storage";
const Stack = createNativeStackNavigator();
export interface QuestionInterface {
  id: number;
  question: string;
  options: Array<{
    id: number;
    name: string;
  }>;
  answer: number;
  selectOption?: number;
}

export default function App() {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      setAppState(nextAppState);
      if (nextAppState === "active") {
        await storeQuestionData(randomQuestion());
      }
    };
    const event = AppState.addEventListener("change", handleAppStateChange);
    return () => {
      event.remove();
    };
  }, []);

  const randomQuestion = () => {
    const newQuestionData = Array(20).fill(questionData[0]);
    console.log(newQuestionData[19]);

    let countQuestionData = newQuestionData.length;
    const numberOfRandom = 20;
    const questions: QuestionInterface[] = [];
    for (let i = 0; i < numberOfRandom; i++) {
      const randomIndex = Math.floor(Math.random() * countQuestionData);
      questions.push({ ...newQuestionData[randomIndex], selectOption: null });
      newQuestionData.splice(randomIndex, 1);
      countQuestionData -= 1;
    }
    return questions;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Question" component={QuestionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
