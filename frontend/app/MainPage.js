import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function MainPage() {
    // Separate states for each sort
    const [bubbleFrames, setBubbleFrames] = useState([]);
    const [mergeFrames, setMergeFrames] = useState([]);
    const [bubbleCurrent, setBubbleCurrent] = useState(0);
    const [mergeCurrent, setMergeCurrent] = useState(0);

    const navigation = useNavigation();

    const fetchSort = async (type, setFrames, setCurrent) => {
        setFrames([]);
        setCurrent(0);
        try {
            const res = await fetch(`http://192.168.1.169:8001/sort/${type}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ array: [5, 3, 8, 1, 2] }),
            });

            const data = await res.json();
            setFrames(data.frames || []);
        } catch (err) {
            console.error(`Fetch ${type} failed:`, err);
        }
    };

    // Animate Bubble Sort
    useEffect(() => {
        if (bubbleFrames.length && bubbleCurrent < bubbleFrames.length - 1) {
            const timer = setTimeout(() => setBubbleCurrent(bubbleCurrent + 1), 400);
            return () => clearTimeout(timer);
        }
    }, [bubbleFrames, bubbleCurrent]);

    // Animate Merge Sort
    useEffect(() => {
        if (mergeFrames.length && mergeCurrent < mergeFrames.length - 1) {
            const timer = setTimeout(() => setMergeCurrent(mergeCurrent + 1), 400);
            return () => clearTimeout(timer);
        }
    }, [mergeFrames, mergeCurrent]);

    const bubbleArr = bubbleFrames[bubbleCurrent]?.array || [];
    const bubbleHighlight = bubbleFrames[bubbleCurrent]?.highlight || [];
    const mergeArr = mergeFrames[mergeCurrent]?.array || [];
    const mergeHighlight = mergeFrames[mergeCurrent]?.highlight || [];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🧠 AlgoVision</Text>
      
            {/* Bubble Sort */}
            <View style={styles.section}>
                <Text style={styles.sortTitle}>Bubble Sort</Text>
                <Button
                    title="Star Bubble Sort"
                    color="#007AFF"
                    onPress={() => fetchSort("bubble", setBubbleFrames, setBubbleCurrent)}
                />
                <View style={styles.barContainer}>
                    {bubbleArr.map((v, i) => (
                        <View
                            key={i}
                            style={{
                                width: 30,
                                height: v * 25,
                                marginHorizontal: 4,
                                borderRadius: 6,
                                backgroundColor: bubbleHighlight.includes(i)
                                    ? "#FF3B30"
                                    : "#0A84FF",
                            }}
                        />
                    ))}
                </View>
            </View>
            <View style={styles.section}>
                <Button
                    title="Navigate to bubble sort page"
                    color="green"
                    onPress={() => navigation.navigate('BubbleSortPage')}
                />
            </View>

            {/* Merge Sort */}
            <View style={styles.section}>
                <Text style={styles.sortTitle}>Merge Sort</Text>
                <Button
                    title="Start Merge Sort"
                    color="#34C759"
                    onPress={() => fetchSort("merge", setMergeFrames, setMergeCurrent)}
                />
                <View style={styles.barContainer}>
                    {mergeArr.map((v, i) => (
                        <View
                            key={i}
                            style={{
                                width: 30,
                                height: v * 25,
                                marginHorizontal: 4,
                                borderRadius: 6,
                                backgroundColor: mergeHighlight.includes(i)
                                    ? "#FFD60A"
                                    : "#32D74B",
                            }}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1C1C1E",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
    },
    section: {
        alignItems: "center",
        marginBottom: 40,
    },
    sortTitle: {
        color: "white",
        fontSize: 20,
        marginBottom: 10,
    },
    barContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginTop: 20,
        height: 200,
        backgroundColor: "#2C2C2E",
        borderRadius: 10,
        paddingHorizontal: 10,
    },
});
