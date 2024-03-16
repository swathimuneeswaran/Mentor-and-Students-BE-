import {client} from "./index.js"


async function addStudent(newStudent)
{
    return await client.db("student_assign").collection("student").insertOne(newStudent)
}

async function addMentor(newMentor)
{
    return await client.db("student_assign").collection("mentor").insertOne(newMentor)
}

async function assigningStudent(id, assignStudent) {
    return await client.db("student_assign").collection("mentor").updateOne({ mentor_id:id }, { $set: assignStudent });
}

// async function studentChange(id, updatedStudent) { // Changed to accept id directly
//     return await client.db("student_assign").collection("student").updateOne({ id: id }, { $set: {  }); // Updated updateOne query
// }

async function getMentorById(id) {
    return await client.db("student_assign").collection("mentor").findOne({mentor_id:id});
}

async function updateStudent(id, update) {
    return await client.db("student_assign").collection("student").updateOne({ student_id:id }, { $set: update });
}

async function changeMentor(id, updated) {
    return await client.db("student_assign").collection("student").updateOne({ student_id:id }, { $set: updated });
}

async function previousMentor(age) {
    try {
        const ment = await client.db("student_assign").collection("student").findOne( {age:age});
        return ment;
    } catch (error) {
        console.error("Database Error:", error);
        throw error; // Propagate the error to the caller
    }
}

export {addStudent,addMentor,assigningStudent,getMentorById,updateStudent,changeMentor,previousMentor}