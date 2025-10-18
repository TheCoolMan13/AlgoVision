from typing import List,Dict,Generator

def frame_from_array(arr: List[int], highlight: List[int], frame_id: int) -> Dict:
    return {
        "type": "frame",
        "frame_id": frame_id,
        "array": arr.copy(),
        "highlight": highlight,
    }

def linear_search(arr: List[int], target: int) -> Generator[Dict, None, None]:
    arr = arr.copy()
    frame_id = 0

    for index, value in enumerate(arr):
        # Highlight the current index being checked
        frame_id += 1
        yield frame_from_array(arr, [index], frame_id)

        if value == target:
            # Highlight the found element
            frame_id += 1
            yield frame_from_array(arr, [index], frame_id)
            return

    # If not found, yield a final frame with no highlights
    frame_id += 1
    yield frame_from_array(arr, [], frame_id)
