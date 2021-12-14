import React from "react";
import { Text, TextInput, View, StyleSheet, Button, Alert } from "react-native";
import useForm from "../hooks/useForm";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  input: {
    height: 40,
    borderColor: "#656565",
    borderWidth: 1,
    alignSelf: "stretch",
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  contentButton: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
export default ({ navigation }) => {
  const inicialState = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    fetch("https://serveless-edgarbarcenas.vercel.app/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.text())
      .then((text) => {
        if (text === "Usuario creado con exito") {
          return Alert.alert("Exito", text, [
            {
              text: "Ir a iniciar sesion",
              onPress: () => navigation.navigate("Login"),
            },
          ]);
        }
        Alert.alert('error', text)
      });
  };

  const { subscribe, handleSubmit, inputs } = useForm(inicialState, onSubmit);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        autoCapitalize='none'
        style={styles.input}
        placeholder="Email"
        value={inputs.email}
        onChangeText={subscribe("email")}
      />
      <TextInput
        autoCapitalize='none'
        style={styles.input}
        placeholder="Password"
        value={inputs.password}
        onChangeText={subscribe("password")}
        secureTextEntry={true}
      />
      <View style={styles.contentButton}>
        <View style={{ paddingHorizontal: 5 }}>
          <Button title="Enviar" onPress={handleSubmit} />
        </View>
        <View style={{ paddingHorizontal: 5 }}>
          <Button
            title="Volver al inicio"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </View>
  );
};
