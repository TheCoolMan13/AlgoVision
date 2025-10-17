import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SearchingMainPage = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sorting Algorithms</Text>
        </View>
    );
};
export default SearchingMainPage;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F7",
        paddingTop: 60,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1C1C1E",
        marginBottom: 20,
        textAlign: "center",
    },
});