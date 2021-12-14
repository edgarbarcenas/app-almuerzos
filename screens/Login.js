import React from "react";
import { Text, TextInput, View, StyleSheet, Button, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    fetch("https://serveless-edgarbarcenas.vercel.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(values),
    })
    .then( response => response.text())
    .then( token => {
        try{
            return JSON.parse(token)
        }catch{
            throw token
        }
    })
    .then( token => {
        AsyncStorage.setItem('token', token.token)
        navigation.navigate('Meals')
    })
    .catch( err => Alert.alert('Error', err))
    
  };
  const { subscribe, inputs, handleSubmit } = useForm(inicialState, onSubmit);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesion</Text>
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
          <Button title="Iniciar Sesion" onPress={handleSubmit} />
        </View>
        <View style={{ paddingHorizontal: 5 }}>
          <Button
            title="Registrarse"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </View>
    </View>
  );
};
