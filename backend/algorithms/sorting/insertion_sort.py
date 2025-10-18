from typing import List, Dict, Generator
def frame_from_array(arr: List[int], highlight: List[int], frame_id: int) -> Dict:
    return {
        "type": "frame",
        "frame_id": frame_id,
        "array": arr.copy(),
        "highlight": highlight,
    }
def insertion_sort(arr: List[int]) -> Generator[Dict, None, None]:
    arr = arr.copy()
    frame_id = 0
    n = len(arr)

    for i in range(1, n):
        key = arr[i]
        j = i - 1

        # Highlight the key element being compared
        frame_id += 1
        yield frame_from_array(arr, [i], frame_id)

        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1

            # Highlight the elements being shifted
            frame_id += 1
            yield frame_from_array(arr, [j + 1, j + 2], frame_id)

        arr[j + 1] = key

        # Highlight the position where the key is inserted
        frame_id += 1
        yield frame_from_array(arr, [j + 1], frame_id)

    # Final frame showing the sorted array
    frame_id += 1
    yield frame_from_array(arr, [], frame_id)