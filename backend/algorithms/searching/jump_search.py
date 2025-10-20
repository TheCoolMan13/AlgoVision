from typing import List, Dict, Generator

def frame_from_array(arr: List[int], highlight: List[int], frame_id: int) -> Dict:
    return {
        "type": "frame",
        "frame_id": frame_id,
        "array": arr.copy(),
        "highlight": highlight,
    }

def jump_search(arr: List[int], target: int) -> Generator[Dict, None, None]:
    import math

    arr = arr.copy()
    frame_id = 0
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0

    # Finding the block where the target is present
    while prev < n and arr[min(step, n) - 1] < target:
        # Highlight the current block
        frame_id += 1
        yield frame_from_array(arr, list(range(prev, min(step, n))), frame_id)

        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            break

    # Linear search within the found block
    for i in range(prev, min(step, n)):
        # Highlight the current element being checked
        frame_id += 1
        yield frame_from_array(arr, [i], frame_id)

        if arr[i] == target:
            # Highlight the found element
            frame_id += 1
            yield frame_from_array(arr, [i], frame_id)
            return

    # If not found, yield a final frame with no highlights
    frame_id += 1
    yield frame_from_array(arr, [], frame_id)