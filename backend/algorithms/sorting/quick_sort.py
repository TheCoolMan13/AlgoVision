from typing import List, Dict, Generator

def frame_from_array(arr: List[int], highlight: List[int], frame_id: int) -> Dict:
    return {
        "type": "frame",
        "frame_id": frame_id,
        "array": arr.copy(),
        "highlight": highlight,
    }

def quick_sort(arr: List[int]) -> Generator[Dict, None, None]:
    arr = arr.copy()
    frame_id = 0

    def _quick_sort(a: List[int], low: int, high: int):
        nonlocal frame_id
        if low < high:
            pivot_index = partition(a, low, high)

            # Yield frame showing current subarray being processed
            frame_id += 1
            yield frame_from_array(a, list(range(low, high + 1)), frame_id)

            # Recursively sort elements before and after partition
            yield from _quick_sort(a, low, pivot_index - 1)
            yield from _quick_sort(a, pivot_index + 1, high)

    def partition(a: List[int], low: int, high: int) -> int:
        pivot = a[high]
        i = low - 1
        for j in range(low, high):
            if a[j] <= pivot:
                i += 1
                a[i], a[j] = a[j], a[i]
        a[i + 1], a[high] = a[high], a[i + 1]
        return i + 1

    yield from _quick_sort(arr, 0, len(arr) - 1)

    # Final frame showing the sorted array
    frame_id += 1
    yield frame_from_array(arr, [], frame_id)