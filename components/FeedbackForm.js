import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Second from "./FeedbackFormContent.js";
import FeedbackFormContent from "./FeedbackFormContent.js";

export default function FeedbackForm() {
  return (
    <ImageBackground
      source={require("../assets/rectangle.png")}
      style={{ height: "100%", width: "100%" }}
    >
      <Text style={styles.text}>Feedback Form</Text>
      <FeedbackFormContent />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: 70,
    fontSize: 25,
    fontWeight: "bold",
    color: "#555555",
  },
});
