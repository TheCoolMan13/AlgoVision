from typing import List, Dict, Generator

def frame_from_array(arr: List[int], highlight: List[int], frame_id: int) -> Dict:
    return {
        "type": "frame",
        "frame_id": frame_id,
        "array": arr.copy(),
        "highlight": highlight,
    }
 
def binary_search(arr: List[int], target: int) -> Generator[Dict, None, None]:
    arr = arr.copy()
    frame_id = 0
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        # Highlight the current left, mid, right indices
        frame_id += 1
        yield frame_from_array(arr, [left, mid, right], frame_id)

        if arr[mid] == target:
            # Highlight the found element
            frame_id += 1
            yield frame_from_array(arr, [mid], frame_id)
            return
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    # If not found, yield a final frame with no highlights
    frame_id += 1
    yield frame_from_array(arr, [], frame_id)
