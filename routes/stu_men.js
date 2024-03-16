import express from "express"
import { addStudent,addMentor ,assigningStudent,getMentorById,updateStudent,changeMentor,previousMentor} from "../helper.js";
import {client} from "../index.js"
const router=express.Router()



router.post("/student",async(req,res)=>
{
    const newStudent=req.body;
    console.log(newStudent);
    const result=await addStudent(newStudent)
    res.send(result);
})

router.get("/student",async(req,res)=>
{
    const cursor = await client.db("student_assign").collection("student").find();
  const use = await cursor.toArray();
  res.send(use);
})


router.post("/mentor",async(req,res)=>
{
    const newMentor=req.body;
    console.log(newMentor);
    const result=await addMentor(newMentor)
    res.send(result);
})

router.get("/mentor",async(req,res)=>
{
    const cursor = await client.db("student_assign").collection("mentor").find();
  const use = await cursor.toArray();
  res.send(use);
})

router.put("/:id",async(req,res)=>
{
    const {id}=req.params;
    const assignStudent=req.body;
    console.log(id)
    console.log(assignStudent);
    
    const result=await assigningStudent(id,assignStudent)
    res.send(result);
})
router.get("/:id",async(req,res)=>
{
    const {id}=req.params;
    const result=await getMentorById(id)
    console.log(result)
    res.send(result);
})


router.get("/update-student/:id",async(req,res)=>
{
    const {id}=req.params;
    const result = await client.db("student_assign").collection("mentor").findOne({ assigned_students: id }, { mentor_id: 1, assigned_students: 1 });
    // console.log(findStudent);
    if(result)
    {
        const ment_id=result.mentor_id
        console.log(ment_id)
        const update={"updated_mentor_id":ment_id}
        console.log(update)
        console.log(id)
        const change=updateStudent(id,update)
        res.send(change)
    }
    // res.send(result)
})


router.get("/change-mentor/:id",async(req,res)=>
{
    const {id}=req.params;
    const result = await client.db("student_assign").collection("student").findOne({ student_id: id })
    // console.log(findStudent);
    if(result)
    {
        // console.log(ment_id)
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        const randomNumber = getRandomNumber(1, 5);
        // console.log(randomNumber);
        const updated={"changed_mentor_id":randomNumber}
        // console.log(update)
        // console.log(id)
        const change=changeMentor(id,updated)
        res.send(change)
    }
    // res.send(result)
})

router.get('/previousmentor', async (req, res) => {
    try {
        const { age }  = req.query;
        console.log("Previous Mentor ID:", age);
         console.log(req.query)
        const result = await previousMentor(age);
        console.log("Result:", result); // Log the result from the database
        if (result) {
            res.send(result);
        } else {
            res.status(404).send("Mentor not found");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

export const studentAndMentorRoute=router