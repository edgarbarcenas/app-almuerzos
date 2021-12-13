import React from 'react';
import useFetch from '../hooks/useFetch';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ListItem from '../components/ListItem';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    list: {
      alignSelf: "stretch",
    },
  });

 const Meals = ({ navigation }) => {
    const { loading, data: meals } = useFetch('https://serveless-edgarbarcenas.vercel.app/api/meals');
    return (
      <View style={styles.container}>
        {loading 
            ? <Text> Cargando...</Text>
            : <FlatList
                style={styles.list}
                data={meals}
                keyExtractor={ key => key._id}
                renderItem={({ item }) => (
                <ListItem
                    onPress={() => navigation.navigate("Modal", { _id: item._id })}
                    title={item.name}
              />
            )}
          />
        }

      </View>
    );
}

Meals.navigationOptions = ({
    title: 'Comidas Disponibles',
})
export default Meals;