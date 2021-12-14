import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({ navigation }) => {
    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(token => {
                navigation.navigate( token ? 'Root' : 'OnBoarding')
            })
    }, [])
    return (
        <View>
            <ActivityIndicator />
        </View>
    )
}