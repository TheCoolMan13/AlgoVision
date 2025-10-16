const API_URL = "http://192.168.1.169:8001"; // same as above

export const mergeSort = async (array) => {
    try {
        const response = await fetch(`${API_URL}/sort/merge`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ array }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Merge Sort request failed:", error);
        throw error;
    }
};
