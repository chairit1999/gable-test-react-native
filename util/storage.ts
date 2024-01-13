import AsyncStorage from "@react-native-async-storage/async-storage";
import { QuestionType } from "../App";
import { LeaderBoardType } from "../components/leader-board";

const storeQuestionData = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("question", jsonValue);
  } catch (e) {
    console.log("error storeQuestionData : ", e);
  }
};

const getQuestionData = async (): Promise<QuestionType[] | undefined> => {
  try {
    const jsonValue = await AsyncStorage.getItem("question");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("error getQuestionData : ", e);
  }
};

const storeLeaderBoardData = async (name: string, point: number) => {
  try {
    let leaderBoard = await getLeaderBoardData();
    if (!leaderBoard) leaderBoard = [];
    const findIndex = leaderBoard.findIndex((item) => item.name === name);
    if (findIndex != -1 && leaderBoard[findIndex].point <= point) {
      leaderBoard[findIndex].point = point;
    } else if (findIndex == -1) {
      leaderBoard.push({ name, point });
    }
    leaderBoard.sort((a, b) => b.point - a.point);
    const jsonValue = JSON.stringify(leaderBoard);
    await AsyncStorage.setItem("leaderBoard", jsonValue);
  } catch (e) {
    console.log("error storeQuestionData : ", e);
  }
};

const getLeaderBoardData = async (): Promise<LeaderBoardType[] | undefined> => {
  try {
    const jsonValue = await AsyncStorage.getItem("leaderBoard");
    console.log(jsonValue);

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("error getQuestionData : ", e);
  }
};

const resetLeaderBoardData = async () => {
  try {
    const jsonValue = JSON.stringify([]);
    await AsyncStorage.setItem("leaderBoard", jsonValue);
  } catch (e) {
    console.log("error storeQuestionData : ", e);
  }
};

export {
  storeQuestionData,
  getQuestionData,
  storeLeaderBoardData,
  getLeaderBoardData,
  resetLeaderBoardData,
};
