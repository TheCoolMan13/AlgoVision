import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const BinarySearchPage = () => {
    const navigation = useNavigation();

    // User inputs
    const [arrayInput, setArrayInput] = useState("1,3,5,7,9,11,13,15,17,19, 21,23,25");
    const [target, setTarget] = useState("7");

    // Visualization
    const [array, setArray] = useState([]);
    const [frames, setFrames] = useState([]);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [found, setFound] = useState(null);
    const [highlight, setHighlight] = useState([]);
    const [explanation, setExplanation] = useState("");

    // Start visualization
    const handleStart = () => {
        const arr = arrayInput
            .split(",")
            .map(n => parseInt(n.trim()))
            .filter(n => !isNaN(n));
        if (!arr.length) return;

        setArray(arr);
        setFound(null);
        simulateBinarySearch(arr, parseInt(target));
    };

    // Generate frames for Binary Search
    const simulateBinarySearch = (arr, target) => {
        const tempFrames = [];
        let left = 0;
        let right = arr.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            tempFrames.push({
                array: [...arr],
                left,
                mid,
                right,
                explanation: `Checking index ${mid}: ${arr[mid]}`
            });

            if (arr[mid] === target) {
                tempFrames.push({
                    array: [...arr],
                    left,
                    mid,
                    right,
                    explanation: `✅ Target found at index ${mid}`
                });
                setFound(true);
                break;
            } else if (arr[mid] < target) {
                tempFrames.push({
                    array: [...arr],
                    left: mid + 1,
                    mid,
                    right,
                    explanation: `${arr[mid]} < ${target}, moving right`
                });
                left = mid + 1;
            } else {
                tempFrames.push({
                    array: [...arr],
                    left,
                    mid,
                    right: mid - 1,
                    explanation: `${arr[mid]} > ${target}, moving left`
                });
                right = mid - 1;
            }
        }

        if (left > right) {
            tempFrames.push({
                array: [...arr],
                left: -1,
                mid: -1,
                right: -1,
                explanation: `❌ Target not found in array`
            });
            setFound(false);
        }

        setFrames(tempFrames);
        setCurrentFrame(0);
        setIsRunning(true);
    };

    // Animate frames
    useEffect(() => {
        if (!isRunning || frames.length === 0) return;

        if (currentFrame < frames.length) {
            const frame = frames[currentFrame];
            setHighlight([frame.left, frame.mid, frame.right].filter(idx => idx >= 0));
            setExplanation(frame.explanation);
            const timeout = setTimeout(() => setCurrentFrame(prev => prev + 1), 1200);
            return () => clearTimeout(timeout);
        } else {
            setIsRunning(false);
        }
    }, [currentFrame, isRunning]);

    // Compute item width to avoid overlap
    const computeItemWidth = (n) => {
        const containerPadding = 32;
        const available = Math.min(SCREEN_WIDTH * 0.95, 760) - containerPadding;
        const gap = 12;
        const ideal = Math.floor((available - (n - 1) * gap) / n);
        const minWidth = 50;
        const maxWidth = 100;
        return Math.max(minWidth, Math.min(maxWidth, ideal));
    };

    const itemWidth = computeItemWidth(array.length || 1);

    const frame = frames[currentFrame] || {};
    const left = frame.left ?? -1;
    const mid = frame.mid ?? -1;
    const right = frame.right ?? -1;

    return (
        <View style={styles.root}>
            <StatusBar barStyle="dark-content" backgroundColor="#F6F8FB" />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Binary Search</Text>
                </View>

                {/* Info Card */}
                <View style={styles.card}>
                    <Text style={styles.subtitle}>🧠 Algorithm Overview</Text>
                    <Text style={styles.description}>
                        Binary Search is an efficient algorithm for finding an item from a sorted array.
                        It repeatedly divides the search interval in half until the target value is found or the interval is empty.
                    </Text>
                    <View style={styles.divider} />
                    <Text style={styles.tip}>
                        Best for large sorted arrays. Time complexity: O(log n).
                    </Text>
                </View>

                {/* Input */}
                <View style={styles.inputSection}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter sorted array (e.g., 1, 3, 5, 7)"
                        value={arrayInput}
                        onChangeText={setArrayInput}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Target value"
                        value={target}
                        onChangeText={setTarget}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.primaryButton} onPress={handleStart}>
                        <Text style={styles.buttonText}>Start Visualization</Text>
                    </TouchableOpacity>
                </View>

                {/* Array Visualization */}
                <View style={styles.visualContainer}>
                    <View style={styles.arrayContainer}>
                        {array.map((num, idx) => {
                            let backgroundColor = "#E8EAED";
                            if (idx === left) backgroundColor = "#FFD700";
                            if (idx === mid) backgroundColor = "#34A853";
                            if (idx === right) backgroundColor = "#EA4335";

                            return (
                                <View key={idx} style={[styles.arrayBox, { width: itemWidth, backgroundColor }]}>
                                    {/* Arrow labels */}
                                    <Text style={styles.arrow}>
                                        {idx === left ? "⬆L" : idx === mid ? "⬆M" : idx === right ? "⬆R" : ""}
                                    </Text>
                                    <Text style={styles.arrayText}>{num}</Text>
                                    <Text style={styles.indexText}>{idx}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* Explanation */}
                <View style={styles.explanationBox}>
                    <Text style={styles.explanationText}>
                        {explanation || "Press Start to begin"}
                    </Text>
                </View>

                {/* Status */}
                {isRunning ? (
                    <Text style={styles.statusText}>🔍 Searching...</Text>
                ) : frames.length > 0 ? (
                    <Text style={styles.statusText}>
                        {found === true ? "✅ Element found!" : found === false ? "❌ Target not found" : ""}
                    </Text>
                ) : null}
            </ScrollView>
        </View>
    );
};

export default BinarySearchPage;

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: "#F6F8FB" },
    scrollContent: { paddingTop: 50, paddingBottom: 80, alignItems: "center" },
    header: { flexDirection: "row", alignItems: "center", width: "90%", marginBottom: 20 },
    backButton: { width: 40, height: 40, justifyContent: "center", alignItems: "center", marginRight: 12 },
    backText: { fontSize: 20, fontWeight: "600", color: "#007AFF" },
    headerTitle: { fontSize: 26, fontWeight: "bold", color: "#202124" },
    card: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 18, width: "90%", shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, elevation: 3, marginBottom: 25 },
    subtitle: { fontSize: 18, fontWeight: "700", color: "#1F1F1F", marginBottom: 8 },
    description: { fontSize: 15, color: "#444", lineHeight: 22 },
    divider: { height: 1, backgroundColor: "#E5E5E5", marginVertical: 10 },
    tip: { fontSize: 14, color: "#666", fontStyle: "italic" },
    inputSection: { width: "90%", backgroundColor: "#FFFFFF", borderRadius: 20, padding: 18, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, elevation: 2, marginBottom: 25 },
    input: { backgroundColor: "#F1F3F4", borderRadius: 12, padding: 12, marginBottom: 10, fontSize: 16 },
    primaryButton: { backgroundColor: "#1A73E8", borderRadius: 12, paddingVertical: 14, alignItems: "center", marginTop: 6 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
    visualContainer: { width: "90%", alignItems: "center", marginVertical: 20 },
    arrayContainer: { flexDirection: "row", justifyContent: "center", alignItems: "flex-end", flexWrap: "nowrap" },
    arrayBox: { borderRadius: 14, paddingVertical: 16, paddingHorizontal: 8, marginHorizontal: 6, alignItems: "center", justifyContent: "center", minWidth: 50, maxWidth: 100 },
    arrayText: { fontSize: 18, fontWeight: "700", color: "#202124" },
    indexText: { fontSize: 12, color: "#555", marginTop: 4 },
    arrow: { fontSize: 14, fontWeight: "700", color: "#202124", marginBottom: 4 },
    explanationBox: { width: "90%", padding: 14, borderRadius: 14, backgroundColor: "#fff", shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6, elevation: 2, marginBottom: 10 },
    explanationText: { fontSize: 16, color: "#202124" },
    statusText: { fontSize: 18, fontWeight: "500", color: "#202124", marginTop: 10 },
});
