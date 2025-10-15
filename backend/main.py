from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from algorithms.sorting.bubble_sort import bubble_sort
from algorithms.sorting.merge_sort import merge_sort

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

@app.post("/sort/merge")
def sort_merge(req: SortRequest):
    frames = list(merge_sort(req.array))
    return {"frames": frames}

@app.post("/sort/bubble")
def sort_bubble(req: SortRequest):
    frames = list(bubble_sort(req.array))
    return {"frames": frames}
