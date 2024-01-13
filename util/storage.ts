import AsyncStorage from "@react-native-async-storage/async-storage";
import { QuestionInterface } from "../App";

const storeQuestionData = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("question", jsonValue);
  } catch (e) {
    console.log("error storeQuestionData : ", e);
  }
};

const getQuestionData = async (): Promise<QuestionInterface[] | undefined> => {
  try {
    const jsonValue = await AsyncStorage.getItem("question");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("error getQuestionData : ", e);
  }
};

export { storeQuestionData, getQuestionData };
