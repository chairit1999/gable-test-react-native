import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { getLeaderBoardData } from "../util/storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

export type LeaderBoardType = {
  name: string;
  point: number;
};

type Props = NativeStackScreenProps<RootStackParamList>;

export default function LeaderBoard({ navigation }: Props) {
  const [leaderBoard, setLeaderBoard] = useState<LeaderBoardType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const leaderBoard = await getLeaderBoardData();
      setLeaderBoard(leaderBoard || []);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>คะแนนสูงสุด</Text>
      </View>
      {leaderBoard &&
        leaderBoard.map((item, index) => {
          return (
            <View key={index} style={styles.item}>
              <Text style={[styles.textItem]}>{index + 1}.</Text>
              <Text style={[styles.textItem, { flex: 4 }]}>{item.name}</Text>
              <Text style={[styles.textItem, { flex: 3, textAlign: "right" }]}>
                {item.point}
              </Text>
              <Text style={[styles.textItem, { marginLeft: 5 }]}>point</Text>
            </View>
          );
        })}

      <View
        style={{
          position: "absolute",
          bottom: 50,
          margin: "auto",
        }}
      >
        <Button
          title="Back To Home"
          onPress={() => {
            navigation.navigate("Login");
          }}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "antiquewhite",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    marginTop: 10,
  },
  item: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  textItem: {
    fontSize: 18,
  },
});
