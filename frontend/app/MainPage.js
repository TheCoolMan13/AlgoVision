import { useNavigation } from "@react-navigation/native";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 30;

export default function MainPage() {
    const navigation = useNavigation();

    // 🔹 Default image (used when a category doesn't have its own)
    const defaultImage = require("../assets/default.png");

    const categories = [
        {
            title: "Sorting Algorithms",
            image: require("../assets/sorting.png"),
            navigateTo: "SortingMainPage",
        },
        {
            title: "Data Structure Visuals",
            image: require("../assets/datastructure.png"),
            navigateTo: "DataStructureVisualsMainPage",
        },
        {
            title: "Graph & Pathfinding",
            image: require("../assets/graph.png"),
            navigateTo: "GraphnPathfindingMainPage",
        },
        {
            title: "Searching Algorithms",
            // intentionally missing image to test default
            navigateTo: "SearchingMainPage",
        },
        {
            title: "Recursion Algorithms",
            image: require("../assets/recursion.png"),
            navigateTo: "RecursionMainPage",
        },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
            <Text style={styles.title}>🧠 AlgoVision</Text>
            <Text style={styles.infoText}>
                Welcome to AlgoVision! Explore algorithm visualizations designed to help you
                understand how data structures and logic interact in real time.
            </Text>

            <View style={styles.grid}>
                {categories.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.card}
                        onPress={() => navigation.navigate(item.navigateTo)}
                        activeOpacity={0.85}
                    >
                        <Image
                            source={item.image ? item.image : defaultImage}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <Text style={styles.cardTitle}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F7",
        paddingTop: 60,
        
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
        marginBottom: 30,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 15,
        marginBottom: 40,
    },
    card: {
        width: CARD_WIDTH,
        backgroundColor: "#E5E5EA",
        borderRadius: 12,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 3,
    },
    image: {
        width: 70,
        height: 70,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1C1C1E",
        textAlign: "center",
    },
});
