from typing import List, Dict, Generator

def frame_from_array(arr: List[int], highlight: List[int], frame_id: int) -> Dict:
    return {
        "type": "frame",
        "frame_id": frame_id,
        "array": arr.copy(),
        "highlight": highlight,
    }

def merge_sort(arr: List[int]) -> Generator[Dict, None, None]:
    arr = arr.copy()
    frame_id = 0

    if len(arr) <= 1:
        yield frame_from_array(arr, [], frame_id)
        return

    mid = len(arr) // 2
    left = []
    right = []

    # Recursively sort left
    for frame in merge_sort(arr[:mid]):
        frame_id += 1
        yield frame

    left = arr[:mid]
    right = arr[mid:]

    # Recursively sort right
    for frame in merge_sort(arr[mid:]):
        frame_id += 1
        yield frame

    # Merge left and right
    i = j = k = 0
    merged = [0] * len(arr)
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            merged[k] = left[i]
            i += 1
        else:
            merged[k] = right[j]
            j += 1
        k += 1
        frame_id += 1
        yield frame_from_array(merged[:k] + left[i:] + right[j:], [k-1], frame_id)

    # Remaining elements
    while i < len(left):
        merged[k] = left[i]
        i += 1
        k += 1
        frame_id += 1
        yield frame_from_array(merged[:k] + left[i:] + right[j:], [k-1], frame_id)

    while j < len(right):
        merged[k] = right[j]
        j += 1
        k += 1
        frame_id += 1
        yield frame_from_array(merged[:k] + left[i:] + right[j:], [k-1], frame_id)
