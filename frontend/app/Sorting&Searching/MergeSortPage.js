import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const MAX_BAR_HEIGHT = 150;

const MergeSortPage = () => {
    const navigation = useNavigation();
    const [array, setArray] = useState([38, 27, 43, 10]); // default array
    const [input, setInput] = useState("38,27,43,10");
    const [phase, setPhase] = useState(""); // "divide" or "merge"
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);

    // Convert string input to array
    const handleInputChange = () => {
        const newArr = input.split(",").map((x) => parseInt(x.trim())).filter((x) => !isNaN(x));
        setArray(newArr);
        setPhase("");
        setSteps([]);
        setCurrentStep(0);
    };

    // Generate divide steps recursively
    const generateDivideSteps = (arr) => {
        const result = [];
        const divide = (subArr) => {
            if (subArr.length <= 1) return [subArr];
            const mid = Math.floor(subArr.length / 2);
            const left = subArr.slice(0, mid);
            const right = subArr.slice(mid);
            result.push([...left, "|", ...right]);
            divide(left);
            divide(right);
            return result;
        };
        divide(arr);
        return result;
    };

    // Generate merge steps recursively
    const generateMergeSteps = (arr) => {
        const result = [];
        const mergeSort = (subArr) => {
            if (subArr.length <= 1) return subArr;
            const mid = Math.floor(subArr.length / 2);
            const left = mergeSort(subArr.slice(0, mid));
            const right = mergeSort(subArr.slice(mid));
            const merged = [];
            let i = 0, j = 0;
            while (i < left.length && j < right.length) {
                if (left[i] < right[j]) merged.push(left[i++]);
                else merged.push(right[j++]);
            }
            while (i < left.length) merged.push(left[i++]);
            while (j < right.length) merged.push(right[j++]);
            result.push([...merged]); // save current merged array
            return merged;
        };
        mergeSort(arr);
        return result;
    };

    const handlePhase = (p) => {
        setPhase(p);
        setCurrentStep(0);
        if (p === "divide") setSteps(generateDivideSteps(array));
        else if (p === "merge") setSteps(generateMergeSteps(array));
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>⬅ Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Merge Sort Visualizer</Text>
            </View>

            {/* User input */}
            <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Enter numbers separated by commas"
            />
            <TouchableOpacity style={styles.phaseButton} onPress={handleInputChange}>
                <Text style={styles.phaseButtonText}>Update Array</Text>
            </TouchableOpacity>

            {/* Phase buttons */}
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.phaseButton} onPress={() => handlePhase("divide")}>
                    <Text style={styles.phaseButtonText}>See Divide Phase</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.phaseButton} onPress={() => handlePhase("merge")}>
                    <Text style={styles.phaseButtonText}>See Merge Phase</Text>
                </TouchableOpacity>
            </View>

            {/* Step navigation */}
            {phase !== "" && (
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
                        <Text style={styles.navButtonText}>⬅ Previous</Text>
                    </TouchableOpacity>
                    <Text style={styles.stepText}>
                        Step {currentStep + 1} / {steps.length}
                    </Text>
                    <TouchableOpacity style={styles.navButton} onPress={handleNext}>
                        <Text style={styles.navButtonText}>Next ➡</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Original bar representation */}
            <View style={styles.barContainer}>
                {array.map((v, i) => {
                    const height = (v / Math.max(...array)) * MAX_BAR_HEIGHT || 20;
                    return (
                        <View key={i} style={{ alignItems: "center" }}>
                            <View style={{ width: 30, height, marginHorizontal: 6, borderRadius: 6, backgroundColor: "#32D74B" }} />
                            <Text style={styles.barNumber}>{v}</Text>
                        </View>
                    );
                })}
            </View>

            {/* Visualization */}
            {phase !== "" && (
                <ScrollView horizontal showsHorizontalScrollIndicator style={styles.scroll}>
                    <View style={styles.stepContainer}>
                        {steps[currentStep].map((num, idx) => (
                            <View key={idx} style={{ alignItems: "center", marginHorizontal: 5 }}>
                                {num !== "|" ? (
                                    <>
                                        <View
                                            style={{
                                                height: (num / Math.max(...array)) * MAX_BAR_HEIGHT || 20,
                                                width: 30,
                                                backgroundColor: "#FFD60A",
                                                borderRadius: 5,
                                                marginBottom: 5,
                                            }}
                                        />
                                        <Text>{num}</Text>
                                    </>
                                ) : (
                                    <Text style={{ fontSize: 24, marginHorizontal: 5 }}>|</Text>
                                )}
                            </View>
                        ))}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default MergeSortPage;

// Only updated styles and minor layout tweaks
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F2F2F7", paddingTop: 60, alignItems: "center" },
    header: { width: "100%", flexDirection: "row", alignItems: "center", marginBottom: 20, paddingHorizontal: 20 },
    backButton: { padding: 10, marginRight: 10 },
    backText: { color: "#34C759", fontSize: 16 },
    headerTitle: { fontSize: 24, fontWeight: "bold", color: "#1C1C1E" },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        width: "80%",
        borderRadius: 8,
        marginBottom: 10,
        textAlign: "center",
    },
    buttonRow: { flexDirection: "row", alignItems: "center", marginVertical: 10, flexWrap: "wrap", justifyContent: "center" },
    phaseButton: {
        backgroundColor: "#34C759",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginHorizontal: 5,
        marginVertical: 5,
    },
    phaseButtonText: { color: "white", fontWeight: "bold", textAlign: "center" },
    navButton: {
        backgroundColor: "#0A84FF",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    navButtonText: { color: "white", fontWeight: "bold" },
    stepText: { fontSize: 16, fontWeight: "bold", marginHorizontal: 10 },
    barContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        height: MAX_BAR_HEIGHT,
        backgroundColor: "#E5E5EA",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 10,
        justifyContent: "center",
        flexWrap: "wrap",
    },
    barNumber: { fontSize: 12, marginTop: 4, textAlign: "center" },
    scroll: { marginTop: 20, paddingHorizontal: 10 },
    stepContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        paddingVertical: 10,
        flexWrap: "wrap",
        justifyContent: "center",
    },
});

