from fastapi import FastAPI
from app.routes import process
from fastapi import Depends


app=FastAPI(title="FlickMaker",version="1.0.0")




app.include_router(process.router)




@app.get("/")
def root():
    return {"message": "FlickMaker Running"}
