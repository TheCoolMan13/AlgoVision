const API_URL = "http://localhost:8001"; // or localhost:8001 if testing locally

export const linearSearch = async (array, target) => {
    try {
        const response = await fetch(`${API_URL}/search/linear`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ array, target }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result; // contains found index + steps if backend returns that
    }
    catch (error) {
        console.error("Linear Search request failed:", error);
        throw error;
    }
};