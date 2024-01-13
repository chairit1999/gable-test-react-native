import LoginScreen from "./components/login";
import React, { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuestionScreen from "./components/question";
import questionData from "./assets/question.json";
import { resetLeaderBoardData, storeQuestionData } from "./util/storage";
import LeaderBoard from "./components/leader-board";
import * as Font from "expo-font";

let customFonts = {
  "Noto Sans Thai": require("./assets/fonts/NotoSansThai.ttf"),
};

export type RootStackParamList = {
  Login: undefined;
  Question: { name: string };
  LeaderBoard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type QuestionType = {
  question: string;
  options: Array<OptionType>;
  answer: number;
  selectOption?: number;
};

type OptionType = {
  id: number;
  name: string;
};

export default function App() {
  const randomOption = (option: OptionType[]) => {
    let countOption = option.length;
    const options: OptionType[] = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * countOption);
      options.push(option[randomIndex]);
      option.splice(randomIndex, 1);
      countOption -= 1;
    }
    return options;
  };

  const randomQuestion = () => {
    let countQuestionData = questionData.length;
    const numberOfRandom = 20;
    const questions: QuestionType[] = [];
    for (let i = 0; i < numberOfRandom; i++) {
      const randomIndex = Math.floor(Math.random() * countQuestionData);
      const question = questionData[randomIndex];
      question.options = randomOption(question.options);
      questions.push({ ...question });
      questionData.splice(randomIndex, 1);
      countQuestionData -= 1;
    }
    return questions;
  };

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      await Font.loadAsync(customFonts);
      if (nextAppState === "active") {
        await storeQuestionData(randomQuestion());
        await resetLeaderBoardData();
      }
    };
    const event = AppState.addEventListener("change", handleAppStateChange);
    return () => {
      event.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="Question"
          component={QuestionScreen}
          options={{
            headerLeft: () => <></>,
            title: "QUESTION",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="LeaderBoard"
          component={LeaderBoard}
          options={{
            headerLeft: () => <></>,
            title: "LEADER BOARD",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
