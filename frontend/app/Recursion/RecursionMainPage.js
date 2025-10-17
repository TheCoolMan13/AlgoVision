import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const RecursionMainPage = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
              <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Text style={styles.backText}>⬅ Back</Text>
                        </TouchableOpacity>
                    </View>
            <Text style={styles.title}>Sorting Algorithms</Text>
        </View>
    );
};
export default RecursionMainPage;
const styles = StyleSheet.create({
    backButton: {
        padding: 10,
        marginRight: 10,
    },
    backText: {
        color: "#007AFF",
        fontSize: 16,
    },
    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
        backgroundColor: "#F2F2F7",
        paddingTop: 60,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1C1C1E",
        marginBottom: 20,
        textAlign: "center",
    },
});