from fastapi import FastAPI
from app.routes import process
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="FlickMaker", version="1.0.0")

# origins = ["http://localhost:5173/"]

# app.add_middleware(CORSMiddleware, allow_origins=origins,
#                    allow_credentials=True, allow_methods=[""], allow_headers=[""])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (for dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(process.router)


@app.get("/")
def root():
    return {"message": "FlickMaker Running"}
