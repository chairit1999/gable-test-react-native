import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
      if (leaderBoard) {
        setLeaderBoard(leaderBoard);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>LEADER BOARD</Text>
          </View>
          {leaderBoard &&
            leaderBoard.map((item, index) => {
              return (
                <View key={index} style={styles.item}>
                  <View style={styles.pointContainer}>
                    <Text style={[styles.textName]}>{item.name}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={[styles.textPoint]}>{item.point}</Text>
                      <Text style={[styles.textPoint, { marginLeft: 5 }]}>
                        point
                      </Text>
                    </View>
                  </View>
                  <View style={styles.number}>
                    <Text style={styles.textNumber}>{index + 1}</Text>
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
      <View style={styles.positionNextButton}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.nextButtonText}>BACK TO START PAGE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#EDE8E3",
    alignItems: "center",
  },
  pointContainer: {
    flex: 1,
    flexDirection: "column",
  },
  number: {
    flex: 1,
  },
  textNumber: {
    textAlign: "right",
    marginRight: 20,
    fontWeight: "bold",
    fontSize: 20,
    color: "red",
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    marginTop: 10,
    fontWeight: "600",
  },
  item: {
    width: "80%",
    backgroundColor: "white",
    height: 60,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  textName: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Noto Sans Thai",
  },
  textPoint: {
    fontSize: 18,
    marginLeft: 10,
    color: "#B7B7B7",
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  nextButton: {
    marginTop: 10,
    height: 50,
    width: "90%",
    borderRadius: 8,
    backgroundColor: "#31CD63",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  positionNextButton: {
    zIndex: 2,
    backgroundColor: "#EDE8E3",
    position: "absolute",
    paddingBottom: 20,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
