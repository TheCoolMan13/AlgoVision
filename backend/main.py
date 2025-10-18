from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List


from algorithms.sorting.bubble_sort import bubble_sort
from algorithms.sorting.merge_sort import merge_sort



from algorithms.searching.linear_search import linear_search
from algorithms.searching.binary_search import binary_search


app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SortRequest(BaseModel):
    array: List[int]

#sorting endpoints

@app.post("/sort/merge")
def sort_merge(req: SortRequest):
    frames = list(merge_sort(req.array))
    return {"frames": frames}

@app.post("/sort/bubble")
def sort_bubble(req: SortRequest):
    frames = list(bubble_sort(req.array))
    return {"frames": frames}


#searching endpoints 

@app.post("/searching/linear_search")
def search_linear(req: SortRequest, target: int):
    frames = list(linear_search(req.array, target))
    return {"frames": frames}

@app.post("/searching/binary_search")
def search_binary(req: SortRequest, target: int):
    frames = list(binary_search(req.array, target))
    return {"frames": frames}


