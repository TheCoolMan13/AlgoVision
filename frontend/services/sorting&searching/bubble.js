const API_URL = "http://localhost:8001"; // or localhost:8001 if testing locally

export const bubbleSort = async (array) => {
    try {
        const response = await fetch(`${API_URL}/sort/bubble`, {
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
        return result; // contains sorted array + steps if backend returns that
    } catch (error) {
        console.error("Bubble Sort request failed:", error);
        throw error;
    }
};
