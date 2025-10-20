from typing import List, Dict, Generator

def frame_from_array(arr: List[int], highlight: List[int], frame_id: int) -> Dict:
    return {
        "type": "frame",
        "frame_id": frame_id,
        "array": arr.copy(),
        "highlight": highlight,
    }

def exponential_search(arr: List[int], target: int) -> Generator[Dict, None, None]:
    arr = arr.copy()
    frame_id = 0
    n = len(arr)

    if n == 0:
        frame_id += 1
        yield frame_from_array(arr, [], frame_id)
        return

    # If the target is at the first location
    frame_id += 1
    yield frame_from_array(arr, [0], frame_id)
    if arr[0] == target:
        return

    # Find range for binary search by repeated doubling
    index = 1
    while index < n and arr[index] <= target:
        # Highlight the current index being checked
        frame_id += 1
        yield frame_from_array(arr, [index], frame_id)

        index *= 2

    # Call binary search for the found range
    left = index // 2
    right = min(index, n - 1)

    # Binary search within the found range
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
    