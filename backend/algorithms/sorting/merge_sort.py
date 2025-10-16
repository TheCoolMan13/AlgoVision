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

    def _merge_sort(a: List[int], start: int, end: int) -> List[int]:
        nonlocal frame_id
        if end - start <= 1:
            # Single element, yield as a frame
            frame_id += 1
            yield frame_from_array(a, list(range(start, end)), frame_id)
            return a[start:end]

        mid = (start + end) // 2

        # Yield frame showing current subarray being divided
        frame_id += 1
        yield frame_from_array(a, list(range(start, end)), frame_id)

        # Divide: recursively sort left and right
        left_gen = _merge_sort(a, start, mid)
        right_gen = _merge_sort(a, mid, end)

        left_sorted, right_sorted = [], []
        # Collect left sorted frames
        if isinstance(left_gen, Generator):
            for f in left_gen:
                yield f
            left_sorted = a[start:mid]
        else:
            left_sorted = left_gen

        # Collect right sorted frames
        if isinstance(right_gen, Generator):
            for f in right_gen:
                yield f
            right_sorted = a[mid:end]
        else:
            right_sorted = right_gen

        # Merge
        i = j = 0
        merged = []
        while i < len(left_sorted) and j < len(right_sorted):
            if left_sorted[i] < right_sorted[j]:
                merged.append(left_sorted[i])
                i += 1
            else:
                merged.append(right_sorted[j])
                j += 1

            # Write back to array
            for k in range(len(merged)):
                a[start + k] = merged[k]

            frame_id += 1
            yield frame_from_array(a, list(range(start, start + len(merged))), frame_id)

        # Remaining elements
        while i < len(left_sorted):
            merged.append(left_sorted[i])
            i += 1
            for k in range(len(merged)):
                a[start + k] = merged[k]
            frame_id += 1
            yield frame_from_array(a, list(range(start, start + len(merged))), frame_id)

        while j < len(right_sorted):
            merged.append(right_sorted[j])
            j += 1
            for k in range(len(merged)):
                a[start + k] = merged[k]
            frame_id += 1
            yield frame_from_array(a, list(range(start, start + len(merged))), frame_id)

        return merged

    yield from _merge_sort(arr, 0, len(arr))
