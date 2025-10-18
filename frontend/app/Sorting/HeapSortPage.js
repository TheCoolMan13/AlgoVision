import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { heapSort } from "../../services/sorting/heap";

const HeapSortPage = () => {
    const navigation = useNavigation();

    const [heapFrames, setHeapFrames] = useState([]);
    const [heapCurrent, setHeapCurrent] = useState(0);
    const [inputArray, setInputArray] = useState("5,3,8,1,2,4,7,6,9,25,21,15,12,11,14,13,10,18,17,16,19,20,22,23,24");

    const MAX_BAR_HEIGHT = 200;

    const handleHeapSort = async () => {
        let arr;
        try {
            arr = inputArray.split(",").map((n) => parseInt(n.trim()));
            if (arr.some(isNaN)) throw new Error("Invalid number");
        } catch {
            Alert.alert("Error", "Please enter a valid comma-separated array of numbers.");
            return;
        }

        setHeapFrames([]);
        setHeapCurrent(0);

        try {
            const data = await heapSort(arr);
            setHeapFrames(data.frames || []);
        } catch (err) {
            console.error("Heap Sort failed:", err);
        }
    };

    useEffect(() => {
        if (heapFrames.length && heapCurrent < heapFrames.length - 1) {
            const timer = setTimeout(() => setHeapCurrent((prev) => prev + 1), 400);
            return () => clearTimeout(timer);
        }
    }, [heapFrames, heapCurrent]);

    const heapArr = heapFrames[heapCurrent]?.array || [];
    const heapHighlight = heapFrames[heapCurrent]?.highlight || [];

    const maxValue = Math.max(...heapArr, 1);
    const scale = MAX_BAR_HEIGHT / maxValue;

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>⬅ Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Heap Sort</Text>
            </View>

            {/* Info Section */}
            <View style={styles.infoSection}>
                <Text style={styles.sortInfo}>
                    Heap Sort is a comparison-based sorting algorithm that builds a max heap and repeatedly extracts the maximum element.
                    It is efficient and has O(n log n) time complexity in all cases.
                </Text>
            </View>

            {/* Bars Section */}
            <View style={styles.section}>
                <TouchableOpacity style={styles.sortButton} onPress={handleHeapSort}>
                    <Text style={styles.sortButtonText}>Start Heap Sort</Text>
                </TouchableOpacity>

                <View style={[styles.barContainer, { minHeight: MAX_BAR_HEIGHT }]}>
                    {heapArr.map((v, i) => (
                        <View key={i} style={{ alignItems: "center", marginHorizontal: 6 }}>
                            <View
                                style={{
                                    width: 30,
                                    height: v * scale,
                                    borderRadius: 6,
                                    backgroundColor: heapHighlight.includes(i) ? "#FF3B30" : "#007AFF",
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

export default HeapSortPage;

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
