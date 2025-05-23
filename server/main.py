from fastapi import FastAPI
from typing import List
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#run the project
#uv run uvicorn main:app --reload

class RecipeInput(BaseModel):
    ingredients: List[str]


class TextInput(BaseModel):
    text:str


@app.get("/")
def read_root():
    return {"message": "Server Running"}



from toxic.test import predict_tweet
@app.post("/toxic")
def text_predictor(input:TextInput):
    data=predict_tweet(input.text)
    print(data)
    return {"success":True,'isToxic': data,'message': input.text}