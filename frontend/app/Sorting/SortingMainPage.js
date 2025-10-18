import { useNavigation } from "@react-navigation/native";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const SortingMainPage = () => {
    const navigation = useNavigation();

    const algorithms = [
        {
            name: "Bubble Sort",
            color: "#007AFF",
            image:
                "https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif",
            screen: "BubbleSortPage",
            description:
                "Bubble Sort repeatedly swaps adjacent elements if they are in the wrong order. It’s simple but inefficient for large data sets.",
        },
        {
            name: "Merge Sort",
            color: "#34C759",
            image:
                "https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif",
            screen: "MergeSortPage",
            description:
                "Merge Sort splits data into halves, sorts them, and merges them back together. It’s much faster for large arrays.",
        },
        {
            name: "Quick Sort",
            color: "#FF9500",
            image:
                "https://upload.wikimedia.org/wikipedia/commons/6/6a/Sorting_quicksort_anim.gif",
            screen: "QuickSortPage",
            description:
                "Quick Sort picks a pivot and partitions the array around it using a divide-and-conquer approach.",
        },
        {
            name: "Heap Sort",
            color: "#AF52DE",
            image:
                "https://upload.wikimedia.org/wikipedia/commons/4/4d/Heapsort-example.gif",
            screen: "HeapSortPage",
            description:
                "Heap Sort uses a heap data structure to repeatedly extract the largest element and build a sorted array.",
        },
        {
            name: "Insertion Sort",
            color: "#FF2D55",
            image:
                "https://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif",
            screen: "InsertionSortPage",
            description:
                "Insertion Sort builds the sorted list one element at a time by inserting elements into their correct position.",
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backText}>⬅ Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Sorting Algorithms</Text>
                </View>

                <Text style={styles.infoText}>
                    Swipe horizontally through the sorting algorithms and explore how each one works.
                </Text>

                {/* Horizontal ScrollView for algorithm cards */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardScroll}>
                    {algorithms.map((algo, index) => (
                        <View key={index} style={styles.cardContainer}>
                            <View style={styles.card}>
                                <Image
                                    source={{ uri: algo.image }}
                                    style={styles.cardImage}
                                    resizeMode="contain"
                                />
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardTitle}>{algo.name}</Text>
                                    <Text style={styles.cardDescription}>{algo.description}</Text>
                                    <TouchableOpacity
                                        style={[styles.cardButton, { backgroundColor: algo.color }]}
                                        onPress={() => navigation.navigate(algo.screen)}
                                    >
                                        <Text style={styles.cardButtonText}>Go to {algo.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SortingMainPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F7",
    },
    scrollContainer: {
        paddingBottom: 50,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 20,
        marginBottom: 10,
    },
    backButton: {
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
    infoText: {
        fontSize: 16,
        color: "#3C3C4399",
        textAlign: "center",
        marginHorizontal: 20,
        marginBottom: 20,
    },
    cardScroll: {
        paddingLeft: 10,
    },
    cardContainer: {
        width: 270,
        height: 420, // Fixed height for uniformity
        marginRight: 16,
    },
    card: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 4,
        justifyContent: "space-between",
    },
    cardImage: {
        width: "100%",
        height: 140, // Uniform image height
        borderRadius: 12,
        marginBottom: 10,
    },
    cardContent: {
        flex: 1,
        justifyContent: "space-between",
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1C1C1E",
        marginBottom: 8,
        textAlign: "center",
    },
    cardDescription: {
        fontSize: 14,
        color: "#3C3C4399",
        textAlign: "center",
        marginBottom: 12,
        flexShrink: 1,
    },
    cardButton: {
        paddingVertical: 10,
        borderRadius: 25,
        alignItems: "center",
    },
    cardButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
    },
});
