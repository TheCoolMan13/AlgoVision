from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For testing, allows all origins
    allow_methods=["*"],
    allow_headers=["*"],
)

class ArrayRequest(BaseModel):
    array: list[int]

@app.post("/sort")
def sort_array(req: ArrayRequest):
    arr = sorted(req.array)
    return {"sorted": arr}
