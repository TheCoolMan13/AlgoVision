import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SortingMainPage = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
              <View style={styles.header}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                <Text style={styles.backText}>⬅ Back</Text>
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Bubble Sort</Text>
                        </View>
            <Text style={styles.title}>Sorting Algorithms</Text>
            <Text style={styles.infoText}>
                Explore how sorting algorithms organize data step by step.
                Select one to begin visualization.
            </Text>

            {/* Bubble Sort */}
            <View style={styles.section}>
                <Text style={styles.sortTitle}>Bubble Sort</Text>
                <Text style={styles.sortInfo}>
                    Bubble Sort repeatedly swaps adjacent elements if they are in the wrong order.
                    It is simple but not very efficient for large arrays.
                </Text>
                <TouchableOpacity
                    style={[styles.sortButton, { backgroundColor: "#007AFF" }]}
                    onPress={() => navigation.navigate("BubbleSortPage")}
                >
                    <Text style={styles.sortButtonText}>Go to Bubble Sort</Text>
                </TouchableOpacity>
            </View>

            {/* Merge Sort */}
            <View style={styles.section}>
                <Text style={styles.sortTitle}>Merge Sort</Text>
                <Text style={styles.sortInfo}>
                    Merge Sort divides the array into halves, sorts them recursively, and then merges
                    them back together. It is much faster for large arrays.
                </Text>
                <TouchableOpacity
                    style={[styles.sortButton, { backgroundColor: "#34C759" }]}
                    onPress={() => navigation.navigate("MergeSortPage")}
                >
                    <Text style={styles.sortButtonText}>Go to Merge Sort</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SortingMainPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F7",
        paddingTop: 60,
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
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1C1C1E",
        marginBottom: 20,
        textAlign: "center",
    },
    infoText: {
        fontSize: 16,
        color: "#3C3C4399",
        textAlign: "center",
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    section: {
        width: "90%",
        alignItems: "center",
        marginBottom: 40,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    sortTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#1C1C1E",
    },
    sortInfo: {
        fontSize: 14,
        color: "#3C3C4399",
        textAlign: "center",
        marginBottom: 20,
    },
    sortButton: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    sortButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
