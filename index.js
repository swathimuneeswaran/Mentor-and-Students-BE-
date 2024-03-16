import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import { MongoClient } from "mongodb"
import { studentAndMentorRoute } from "./routes/stu_men.js"
dotenv.config()
const PORT=process.env.PORT
const app=express()

const MONGO_URL=process.env.MONGO_URL

async function createConnection()
{
    try {
        const client = new MongoClient(MONGO_URL);
        await client.connect();
        console.log("mongo connected");
        return client;
      } catch (error) {
        console.log(`Error is ${error}`);
      }
    
}

export const client = await createConnection();

app.use(express.json())
app.use(cors())

app.get("/",async(req,res)=>
{
    res.send("<h2>MENTOR AND STUDENTS ASSIGNING☺</h2>")
})


app.use("/student-and-mentor",studentAndMentorRoute)

app.listen(PORT,()=>console.log("port is running on",PORT))