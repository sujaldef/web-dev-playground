
from fastapi import FastAPI, HTTPException #Imports and Setup
from fastapi.middleware.cors import CORSMiddleware #Handles Cross-Origin Resource Sharing
from pydantic import BaseModel
import google.generativeai as genai
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv #Loads environment variables 
import os
from passlib.context import CryptContext  # for password hashing


load_dotenv()


client = MongoClient(os.getenv("MONGO_URI"))
db = client["chatbot_db"]
users_collection = db["users"]
chats_collection = db["chat_history"]


genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PromptRequest(BaseModel):
    prompt: str
    user_id: str

class AuthRequest(BaseModel):
    user_id: str
    password: str


@app.post("/api/login")
def login_user(data: AuthRequest):
    user = users_collection.find_one({"user_id": data.user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not pwd_context.verify(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid password")
    return {"success": True, "message": "Login successful"}

@app.post("/api/register")
def register_user(data: AuthRequest):
    if users_collection.find_one({"user_id": data.user_id}):
        raise HTTPException(status_code=400, detail="User already exists")
    hashed_password = pwd_context.hash(data.password)
    users_collection.insert_one({
        "user_id": data.user_id,
        "password": hashed_password
    })
    return {"message": "User registered successfully"}

@app.post("/api/gemini")
async def generate_response(request: PromptRequest):
    model = genai.GenerativeModel('models/gemini-1.5-flash')
    try:
        response = model.generate_content(request.prompt)
        output = response.text

       
        chats_collection.insert_one({
            "user_id": request.user_id,
            "prompt": request.prompt,
            "response": output,
            "timestamp": datetime.utcnow()
        })

        return {"response": output}
    except Exception as e:
        return {"response": f"Error: {str(e)}"}

@app.get("/api/chats/{user_id}")
async def get_chat_history(user_id: str):
    chats = list(chats_collection.find({"user_id": user_id}, {"_id": 0}))
    return {"history": chats}
