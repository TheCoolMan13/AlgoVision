from typing import List, Dict, Generator
def frame_from_array(arr: List[int], highlight: List[int], frame_id: int) -> Dict:
    return {
        "type": "frame",
        "frame_id": frame_id,
        "array": arr.copy(),
        "highlight": highlight,
    }

def interpolation_search(arr: List[int], target: int) -> Generator[Dict, None, None]:
    arr = arr.copy()
    frame_id = 0
    low = 0
    high = len(arr) - 1

    while low <= high and target >= arr[low] and target <= arr[high]:
        if arr[high] == arr[low]:
            if arr[low] == target:
                frame_id += 1
                yield frame_from_array(arr, [low], frame_id)
            break

        # Probing the position with keeping uniform distribution in mind.
        pos = low + ((target - arr[low]) * (high - low) // (arr[high] - arr[low]))

        # Highlight the current position being checked
        frame_id += 1
        yield frame_from_array(arr, [pos], frame_id)

        if arr[pos] == target:
            # Highlight the found element
            frame_id += 1
            yield frame_from_array(arr, [pos], frame_id)
            return
        if arr[pos] < target:
            low = pos + 1
        else:
            high = pos - 1

    # If not found, yield a final frame with no highlights
    frame_id += 1
    yield frame_from_array(arr, [], frame_id)
