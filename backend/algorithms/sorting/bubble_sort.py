from typing import List, Dict, Generator

def frame_from_array(arr: List[int], highlight: List[int], frame_id: int) -> Dict:
    return {
        "type": "frame",
        "frame_id": frame_id,
        "array": arr.copy(),
        "highlight": highlight,
    }

def bubble_sort(array: List[int]) -> Generator[Dict, None, None]:
    arr = array.copy()
    n = len(arr)
    frame_id = 0
    yield frame_from_array(arr, [], frame_id)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            frame_id += 1
            yield frame_from_array(arr, [j, j+1], frame_id)
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
                frame_id += 1
                yield frame_from_array(arr, [j, j+1], frame_id)
        if not swapped:
            break
    frame_id += 1
    yield frame_from_array(arr, [], frame_id)
