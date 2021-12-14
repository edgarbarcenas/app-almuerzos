import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetch from "../hooks/useFetch";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentButton: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
export default ({ navigation }) => {
  const id = navigation.getParam("_id");
  const { loading, data } = useFetch(
    `https://serveless-edgarbarcenas.vercel.app/api/meals/${id}`
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <>
          <Text>{data._id}</Text>
          <Text>{data.name}</Text>
          <Text>{data.desc}</Text>
          <View style={styles.contentButton}>
            <View style={{ paddingHorizontal: 5 }}>
              <Button
                title="Aceptar"
                onPress={() => {
                  AsyncStorage.getItem('token')
                    .then( token => {
                      if(token){
                        fetch(
                          "https://serveless-edgarbarcenas.vercel.app/api/orders",
                          {
                            method: "POST",
                            headers: { 
                                "Content-Type": "application/json",
                                authorization: token
                              },
                            body: JSON.stringify({
                              meal_id: id,
                              user_id: "lala",
                            }),
                          }
                        ).then((status) => {
                          if (status.status !== 201) {
                            return alert("La orden no pudo ser generada");
                          }
                          alert("Orden Generada con exito");
                          navigation.navigate("Meals");
                        });
                      }
                    })
                }}
              />
            </View>
            <View style={{ paddingHorizontal: 5 }}>
              <Button
                title="Cancelar"
                onPress={() => navigation.navigate("Meals")}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};
