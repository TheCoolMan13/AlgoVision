from algorithms.sorting.bubble_sort import bubble_sort
import json
import time

if __name__ == "__main__":
    arr = [5, 3, 8, 1, 2]
    for frame in bubble_sort(arr):
        print(json.dumps(frame))
        time.sleep(0.15)
