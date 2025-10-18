from typing import List, Dict, Generator

def frame_from_array(arr: List[int], highlight: List[int], frame_id: int) -> Dict:
    return {
        "type": "frame",
        "frame_id": frame_id,
        "array": arr.copy(),
        "highlight": highlight,
    }

def heap_sort(arr: List[int]) -> Generator[Dict, None, None]:
    arr = arr.copy()
    frame_id = 0
    n = len(arr)

    def heapify(a: List[int], n: int, i: int):
        nonlocal frame_id
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and a[left] > a[largest]:
            largest = left

        if right < n and a[right] > a[largest]:
            largest = right

        if largest != i:
            a[i], a[largest] = a[largest], a[i]
            frame_id += 1
            yield frame_from_array(a, [i, largest], frame_id)
            yield from heapify(a, n, largest)

    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        yield from heapify(arr, n, i)

    # One by one extract elements from heap
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        frame_id += 1
        yield frame_from_array(arr, [0, i], frame_id)
        yield from heapify(arr, i, 0)

    # Final frame showing the sorted array
    frame_id += 1
    yield frame_from_array(arr, [], frame_id)