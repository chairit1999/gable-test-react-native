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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "antiquewhite",
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
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "black",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

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
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { position: "absolute", bottom: 50 }]}
          onPress={() => {
            navigation.navigate("LeaderBoard");
          }}
        >
          <Text style={styles.buttonText}>LeaderBoard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
