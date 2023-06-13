import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import EmojiSlider from "./EmojiSlider";

export default function FeedbackFormContent() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [buttonColor, setButtonColor] = useState("#20B2AA");
  const [activeInput, setActiveInput] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [comment, setComment] = useState("");

  const handleInputFocus = (inputName) => {
    setActiveInput(inputName);
  };
  const handleInputBlur = () => {
    setActiveInput(null);
  };

  const changeButtonColor = () => {
    const newColor = buttonColor === "#20B2AA" ? "#105955" : "#20B2AA";
    setButtonColor(newColor);
  };

  const validateInput = (inputName) => {
    let validationError = null;

    if (inputName === "Name") {
      if (name.trim() === "") {
        validationError = "Name is required";
      }
    } else if (inputName === "Number") {
      if (!/^\d+$/.test(number)) {
        validationError = "Only digits";
      }
    } else if (inputName === "Email") {
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        validationError = "Invalid email address";
      }
    }
    return validationError;
  };

  const getInputBorderColor = (inputName) => {
    if (activeInput === inputName) {
      const validationError = validateInput(inputName);
      return validationError ? "red" : null;
    }
    return "black";
  };

  const isSubmitDisabled = () => {
    const nameError = validateInput("Name");
    const numberError = validateInput("Number");
    const emailError = validateInput("Email");

    return (
      name.trim() === "" ||
      number.trim() === "" ||
      email.trim() === "" ||
      nameError !== null ||
      numberError !== null ||
      emailError !== null
    );
  };

  const handleSubmit = () => {
    if (!isSubmitDisabled()) {
      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setName(""), setEmail(""), setNumber(""), setComment("");
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Text style={styles.back}>Back</Text>
          <View style={styles.inputs}>
            <View style={styles.inputBody}>
              <Text style={styles.name}>Name</Text>
              <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={[
                  styles.input,
                  activeInput === "Name" ? styles.inputActive : null,
                  { borderColor: getInputBorderColor("Name") },
                ]}
                onFocus={() => {
                  handleInputFocus("Name");
                }}
                onBlur={handleInputBlur}
              />
              {activeInput === "Name" && (
                <Text style={styles.errorText}>{validateInput("Name")}</Text>
              )}
            </View>
            <View style={styles.inputBody}>
              <Text style={styles.name}>Contact Number</Text>
              <TextInput
                placeholder="Number"
                value={number}
                onChangeText={setNumber}
                style={[
                  styles.input,
                  activeInput === "Number" ? styles.inputActive : null,
                  { borderColor: getInputBorderColor("Number") },
                ]}
                keyboardType="numeric"
                onFocus={() => {
                  handleInputFocus("Number");
                }}
                onBlur={handleInputBlur}
              />
              {activeInput === "Number" && (
                <Text style={styles.errorText}>{validateInput("Number")}</Text>
              )}
            </View>
          </View>
          <View style={styles.inputBody}>
            <Text style={styles.name}>Email Address</Text>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={[
                styles.input,
                activeInput === "Email" ? styles.inputActive : null,
                { borderColor: getInputBorderColor("Email") },
              ]}
              keyboardType="email-address"
              onFocus={() => {
                handleInputFocus("Email");
              }}
              onBlur={handleInputBlur}
            />
            {activeInput === "Email" && (
              <Text style={styles.errorText}>{validateInput("Email")}</Text>
            )}
          </View>
          <View>
            <EmojiSlider />
          </View>
          <View>
            <TextInput
              style={styles.comment}
              value={comment}
              onChangeText={setComment}
              placeholder="Add your comments..."
              multiline
              numberOfLines={4}
            />
          </View>
          <View style={styles.submit}>
            {isSubmitting ? (
              <View style={styles.spinnerContainer}>
                <ActivityIndicator size="large" color="#105955" />
              </View>
            ) : (
              <Button
                title="SUBMIT"
                onDoublePress={changeButtonColor}
                color={buttonColor}
                disabled={isSubmitDisabled()}
                onPress={handleSubmit}
              />
            )}

            {isSubmitted && (
              <Text style={styles.successText}>Form submitted ✅</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    width: 320,
    height: 520,
    elevation: 30,
  },
  text: {
    textAlign: "center",
    fontSize: 25,
    color: "#555555",
  },
  content: {
    paddingTop: 20,
    paddingLeft: 25,
    paddingRight: 25,
  },
  back: {
    color: "#2071B2",
    fontSize: 16,
  },
  input: {
    width: 120,
    height: 35,
    borderWidth: 1,
    borderColor: "#888888",
    borderRadius: 5,
    padding: 4,
  },
  inputActive: {
    borderWidth: 2,
    borderColor: "#105955",
    color: "#105955",
    fontSize: 17,
    fontWeight: "bold",
  },
  name: {
    fontSize: 17,
    color: "#2071B2",
    fontWeight: "bold",
  },
  inputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputBody: {
    marginTop: 20,
  },
  comment: {
    marginTop: 20,
    height: 70,
    borderWidth: 1,
    borderColor: "#555555",
    borderRadius: 5,
    padding: 3,
  },
  errorText: {
    color: "red",
    marginTop: 2,
    fontWeight: "bold",
  },
  successText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "green",
  },
  submit: {
    marginTop: 10,
    borderRadius: 5,
  },
});
