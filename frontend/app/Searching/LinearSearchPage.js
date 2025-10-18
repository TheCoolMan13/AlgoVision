import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
    Animated,
    Dimensions,
    FlatList,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const LinearSearchPage = () => {
    const navigation = useNavigation();

    // user inputs
    const [arrayInput, setArrayInput] = useState("10, 5, 12, 3 , 7, 6,8, 2, 9, 1, 4, 11");
    const [target, setTarget] = useState("8");

    // visualization
    const [array, setArray] = useState([]);
    const [frames, setFrames] = useState([]);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [highlight, setHighlight] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [found, setFound] = useState(null); // null = not run yet, true/false after run

    // handle user input
    const handleStart = () => {
        const arr = arrayInput
            .split(",")
            .map(num => parseInt(num.trim()))
            .filter(num => !isNaN(num));

        if (arr.length === 0) return;
        setArray(arr);
        setFound(null);
        simulateLinearSearch(arr, parseInt(target));
    };

    // simulate backend generator
    const simulateLinearSearch = (arr, target) => {
        let tempFrames = [];
        let frameId = 0;

        for (let i = 0; i < arr.length; i++) {
            frameId++;
            tempFrames.push({ frame_id: frameId, highlight: [i], array: [...arr] });
            if (arr[i] === target) {
                frameId++;
                setFound(true);
                tempFrames.push({ frame_id: frameId, highlight: [i], array: [...arr] });
                break;
            }
        }
        frameId++;
        tempFrames.push({ frame_id: frameId, highlight: [] });
        setFrames(tempFrames);
        setCurrentFrame(0);
        setIsRunning(true);
    };

    useEffect(() => {
        if (!isRunning || frames.length === 0) return;

        if (currentFrame < frames.length) {
            const frame = frames[currentFrame];
            setHighlight(frame.highlight);
            const timeout = setTimeout(() => setCurrentFrame(prev => prev + 1), 900);
            return () => clearTimeout(timeout);
        } else {
            setIsRunning(false);
        }
    }, [currentFrame, isRunning]);

    // compute item width so the visualization fits on screen when possible
    const computeItemWidth = (n) => {
        const containerPadding = 32; // matches visual container padding
        const available = Math.min(SCREEN_WIDTH * 0.95, 760) - containerPadding; // keep centered on large screens
        const gap = 12; // space between items
        const ideal = Math.floor((available - (n - 1) * gap) / n);
        const minWidth = 44;
        const maxWidth = 84;
        return Math.max(minWidth, Math.min(maxWidth, ideal));
    };

    const itemWidth = computeItemWidth(array.length || 1);

    return (
        <View style={styles.root}>
            <StatusBar barStyle="dark-content" backgroundColor="#F6F8FB" />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.backText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Linear Search</Text>
                </View>

                {/* INFO CARD */}
                <View style={styles.card}>
                    <Text style={styles.subtitle}>🧠 Algorithm Overview</Text>
                    <Text style={styles.description}>
                        Linear Search is one of the simplest searching algorithms.
                        It checks every element in the array sequentially until the target
                        value is found or the end of the array is reached.
                    </Text>
                    <View style={styles.divider} />
                    <Text style={styles.tip}>
                        Best for small arrays. For large datasets, use more efficient methods
                        like Binary Search.
                    </Text>
                </View>

                {/* INPUT SECTION */}
                <View style={styles.inputSection}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter array (e.g. 10, 5, 8, 12, 3)"
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
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={handleStart}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Start Visualization</Text>
                    </TouchableOpacity>
                </View>

                {/* VISUALIZATION */}
                <View style={styles.visualContainer}>
                    <FlatList
                        horizontal
                        data={array}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={[styles.arrayContainer, { paddingHorizontal: 16 }]}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <Animated.View
                                style={[
                                    styles.arrayBox,
                                    { width: itemWidth },
                                    highlight.includes(index) && styles.highlightBox,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.arrayText,
                                        highlight.includes(index) && styles.highlightText
                                    ]}
                                    numberOfLines={1}
                                >
                                    {item}
                                </Text>
                            </Animated.View>
                        )}
                    />
                </View>

                {/* STATUS */}
                {isRunning ? (
                    <Text style={styles.statusText}>🔍 Searching...</Text>
                ) : (
                    frames.length > 0 && (
                            <Text style={styles.statusText}>
                                {found === true ? "✅ Element found!" : found === false ? "❌ Target not found" : ""}
                            </Text>
                    )
                )}
            </ScrollView>
        </View>
    );
};

export default LinearSearchPage;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F6F8FB",
    },
    scrollContent: {
        paddingTop: 50,
        paddingBottom: 80,
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: "#E7EBF0",
        borderRadius: 12,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        elevation: 1,
    },
    backText: {
        color: "#007AFF",
        fontSize: 20,
        fontWeight: "600",
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#202124",
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 18,
        width: "90%",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 25,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1F1F1F",
        marginBottom: 8,
    },
    description: {
        fontSize: 15,
        color: "#444",
        lineHeight: 22,
    },
    divider: {
        height: 1,
        backgroundColor: "#E5E5E5",
        marginVertical: 10,
    },
    tip: {
        fontSize: 14,
        color: "#666",
        fontStyle: "italic",
    },
    inputSection: {
        width: "90%",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 18,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        marginBottom: 25,
    },
    input: {
        backgroundColor: "#F1F3F4",
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        fontSize: 16,
        color: "#202124",
    },
    primaryButton: {
        backgroundColor: "#1A73E8",
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 6,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    visualContainer: {
        width: "90%",
        alignItems: "center",
        marginVertical: 20,
    },
    arrayContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    arrayBox: {
        backgroundColor: "#E8EAED",
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 8,
        marginHorizontal: 6,
        elevation: 2,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 44,
        maxWidth: 84,
    },
    arrayText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#202124",
    },
    highlightBox: {
        backgroundColor: "#34A853",
        transform: [{ scale: 1.05 }],
    },
    highlightText: {
        color: "#FFFFFF",
    },
    statusText: {
        fontSize: 18,
        fontWeight: "500",
        color: "#202124",
        marginTop: 10,
    },
});
