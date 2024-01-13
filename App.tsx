import LoginScreen from "./components/login";
import React, { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

//Navigation import
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuestionScreen from "./components/question";
import questionData from "./assets/question.json";
const Stack = createNativeStackNavigator();
export interface QuestionInterface {
  id: number;
  question: string;
  options: Array<{
    id: number;
    name: string;
  }>;
  answer: number;
}

export default function App() {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      setAppState(nextAppState);
      if (nextAppState === "active") {
      }
    };
    const event = AppState.addEventListener("change", handleAppStateChange);
    return () => {
      event.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Question" component={QuestionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
