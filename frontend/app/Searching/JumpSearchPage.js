import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const JumpSearchPage = () => {
    const navigation = useNavigation();
    const [inputArray, setInputArray] = useState("1,3,5,7,9,11,13,15,17,19,21,23,25");
    const [targetValue, setTargetValue] = useState("15");
    const [searchResult, setSearchResult] = useState(null);

    const handleJumpSearch = () => {
        let arr;
        let target;
        try {
            arr = inputArray.split(",").map((n) => parseInt(n.trim()));
            if (arr.some(isNaN)) throw new Error("Invalid number in array");
            target = parseInt(targetValue.trim());
            if (isNaN(target)) throw new Error("Invalid target value");
        }
        catch {
            Alert.alert("Error", "Please enter valid comma-separated numbers for the array and a valid number for the target.");
            return;
        }
        // Here you would call the jump search service
        // For demonstration, we'll just simulate a search
        const index = arr.indexOf(target);
        if (index !== -1) {
            setSearchResult(`Target found at index: ${index}`);
        } else {
            setSearchResult("Target not found in the array.");
        }
    };
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>⬅ Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Jump Search</Text>
            </View>
            {/* Info Section */}
            <View style={styles.infoSection}>
                <Text style={styles.infoText}>  

                    Jump Search is an efficient searching algorithm for sorted arrays. It works by dividing the array into blocks of a fixed size and jumping ahead by that block size to find the block where the target value may reside. Once the block is identified, a linear search is performed within that block to locate the target value.    
                </Text>
            </View>
        </ScrollView>
    );
};
export default JumpSearchPage;

        
const styles = StyleSheet.create({
    scrollContainer: {
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    backButton: {
        padding: 8,
    },
    backText: {
        fontSize: 16,
        color: "#007AFF",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 16,
    },
    infoSection: {
        backgroundColor: "#ffffff",
        padding: 16,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    infoText: {
        fontSize: 16,
        color: "#333333",
    },
        
})   