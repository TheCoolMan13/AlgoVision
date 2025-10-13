import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function App() {
    const [sorted, setSorted] = useState([]);

    const sortArray = async () => {
        try {
            const res = await fetch("http://192.168.1.169:8000/sort", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ array: [5, 3, 8, 1, 2] }),
            });
            const data = await res.json();
            setSorted(data.sorted);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title="Sort Array" onPress={sortArray} />
            <Text>Sorted Array: {sorted.join(", ")}</Text>
        </View>
    );
}
