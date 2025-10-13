from algorithms.sorting.bubble_sort import bubble_sort

def test_bubble_final_sorted():
    arr = [3,2,1]
    frames = list(bubble_sort(arr))
    assert frames[-1]["array"] == [1,2,3]
