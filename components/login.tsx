import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.length === 0) {
      alert("Please enter your name");
    } else {
      navigation.navigate("Question", { name: username });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Enter player name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>PLAY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { marginTop: 10, backgroundColor: "#ff6969" }]}
          onPress={() => {
            navigation.navigate("LeaderBoard");
          }}
        >
          <Text style={styles.buttonText}>LEADER BOARD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#EDE8E3",
    flexDirection: "row",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#fff",
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "black",
  },
  button: {
    backgroundColor: "#31CD63",
    marginTop: 3,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "100%",
    height: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
