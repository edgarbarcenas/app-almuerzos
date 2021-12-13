import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:15,
        height:60,
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    text: {
        fontSize: 18
    }
})
export default ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}