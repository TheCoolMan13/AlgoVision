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

const SearchingMainPage = () => {
    const navigation = useNavigation();

    const algorithms = [
        {
            name: "Linear Search",
            color: "#FF9500",
            image:
                "https://upload.wikimedia.org/wikipedia/commons/9/9b/Linear_search_example.gif",
            screen: "LinearSearchPage",
            description:
                "Linear Search checks each element in a list sequentially until the target element is found or the list ends.",
        },
        {
            name: "Binary Search",
            color: "#34C759",
            image:
                "https://upload.wikimedia.org/wikipedia/commons/8/83/Binary_Search_Depiction.svg",
            screen: "BinarySearchPage",
            description:
                "Binary Search repeatedly divides a sorted list in half to efficiently find the target element.",
        },
        {
            name: "Jump Search",
            color: "#007AFF",
            image:
                "https://upload.wikimedia.org/wikipedia/commons/7/7e/Jump_search_visualisation.gif",
            screen: "JumpSearchPage",
            description:
                "Jump Search works on sorted arrays by jumping ahead fixed steps, then performing a linear search within a smaller range.",
        },
        {
            name: "Interpolation Search",
            color: "#AF52DE",
            image:
                "https://upload.wikimedia.org/wikipedia/commons/9/98/Interpolation_search_example.gif",
            screen: "InterpolationSearchPage",
            description:
                "Interpolation Search estimates the position of the target based on its value relative to the array’s endpoints.",
        },
        {
            name: "Exponential Search",
            color: "#FF2D55",
            image:
                "https://upload.wikimedia.org/wikipedia/commons/f/f8/Exponential_search_example.gif",
            screen: "ExponentialSearchPage",
            description:
                "Exponential Search finds a range where the target may exist, then applies binary search within that range.",
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
                    <Text style={styles.headerTitle}>Searching Algorithms</Text>
                </View>

                <Text style={styles.infoText}>
                    Swipe horizontally through searching algorithms and explore how each one finds elements in data.
                </Text>

                {/* Horizontal scroll of algorithm cards */}
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

export default SearchingMainPage;

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
        height: 420,
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
        height: 140,
        borderRadius: 12,
        marginBottom: 10,
        backgroundColor: "#F2F2F7",
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
