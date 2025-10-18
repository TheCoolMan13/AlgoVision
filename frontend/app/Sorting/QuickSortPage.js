import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { quickSort } from "../../services/sorting/quick";

const QuickSortPage = () => {
    const navigation = useNavigation();

    const [quickFrames, setQuickFrames] = useState([]);
    const [quickCurrent, setQuickCurrent] = useState(0);
    const [inputArray, setInputArray] = useState("5,3,8,1,2,4,7,6,9,25,21,15,12,11,14,13,10,18,17,16,19,20,22,23,24");

    const MAX_BAR_HEIGHT = 200;

    const handleQuickSort = async () => {
        let arr;
        try {
            arr = inputArray.split(",").map((n) => parseInt(n.trim()));
            if (arr.some(isNaN)) throw new Error("Invalid number");
        } catch {
            Alert.alert("Error", "Please enter a valid comma-separated array of numbers.");
            return;
        }

        setQuickFrames([]);
        setQuickCurrent(0);

        try {
            const data = await quickSort(arr);
            setQuickFrames(data.frames || []);
        } catch (err) {
            console.error("Quick Sort failed:", err);
        }
    };

    useEffect(() => {
        if (quickFrames.length && quickCurrent < quickFrames.length - 1) {
            const timer = setTimeout(() => setQuickCurrent((prev) => prev + 1), 400);
            return () => clearTimeout(timer);
        }
    }, [quickFrames, quickCurrent]);

    const quickArr = quickFrames[quickCurrent]?.array || [];
    const quickHighlight = quickFrames[quickCurrent]?.highlight || [];

    const maxValue = Math.max(...quickArr, 1);
    const scale = MAX_BAR_HEIGHT / maxValue;

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>⬅ Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Quick Sort</Text>
            </View>

            {/* Info Section */}
            <View style={styles.infoSection}>
                <Text style={styles.sortInfo}>
                    Quick Sort is a divide-and-conquer sorting algorithm that selects a pivot element,
                    partitions the array around the pivot, and recursively sorts the subarrays.
                    It is much faster than Bubble Sort for large datasets.
                </Text>
            </View>

            {/* Bars Section */}
            <View style={styles.section}>
                <TouchableOpacity style={styles.sortButton} onPress={handleQuickSort}>
                    <Text style={styles.sortButtonText}>Start Quick Sort</Text>
                </TouchableOpacity>

                <View style={[styles.barContainer, { minHeight: MAX_BAR_HEIGHT }]}>
                    {quickArr.map((v, i) => (
                        <View key={i} style={{ alignItems: "center", marginHorizontal: 6 }}>
                            <View
                                style={{
                                    width: 30,
                                    height: v * scale,
                                    borderRadius: 6,
                                    backgroundColor: quickHighlight.includes(i) ? "#FF3B30" : "#007AFF",
                                }}
                            />
                            <Text style={styles.barNumber}>{v}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Input Section */}
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Enter numbers (comma separated):</Text>
                <TextInput
                    style={styles.input}
                    value={inputArray}
                    onChangeText={setInputArray}
                    placeholder="e.g. 5,3,8,1,2"
                    keyboardType="numeric"
                />
            </View>
        </ScrollView>
    );
};

export default QuickSortPage;

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: "#F2F2F7",
        alignItems: "center",
        paddingTop: 60,
        paddingBottom: 40,
    },
    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    backButton: {
        padding: 10,
        marginRight: 10,
    },
    backText: {
        color: "#007AFF",
        fontSize: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1C1C1E",
    },
    infoSection: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    sortInfo: {
        fontSize: 16,
        color: "#1C1C1E",
        textAlign: "center",
        lineHeight: 22,
    },
    section: {
        alignItems: "center",
        marginBottom: 30,
    },
    sortButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginBottom: 20,
        elevation: 2,
    },
    sortButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    barContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        backgroundColor: "#E5E5EA",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    barNumber: {
        marginTop: 4,
        fontSize: 14,
        color: "#1C1C1E",
        fontWeight: "bold",
    },
    inputSection: {
        width: "90%",
        marginTop: 20,
        alignItems: "center",
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 8,
        color: "#1C1C1E",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#C7C7CC",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: "white",
    },
});
