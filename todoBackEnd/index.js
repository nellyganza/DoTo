const express = require("express");
const cors = require('cors');
const pool = require("./db");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES

// create a todo
app.post("/todos", async(req, res)=>{
    try {
        const { description }  = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",[description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})


// get all todo

app.get("/todos", async(req, res)=>{
    try {
        const allTodos = await pool.query("select * FROM todo ");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get a todo

app.get("/todos/:id", async(req, res)=>{
    try {
        const todo_id  = req.params.id;
        const allTodos = await pool.query("select * FROM todo where todo_id = $1 ",[todo_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// update a todo

app.put("/todos/:id", async(req, res)=>{
    try {
        const todo_id  = req.params.id;
        const { description }  = req.body;
        const allTodos = await pool.query("UPDATE todo SET description=$1 where todo_id = $2 RETURNING *",[description,todo_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// delete a todo

app.delete("/todos/:id", async(req, res)=>{
    try {
        const todo_id  = req.params.id;
        const allTodos = await pool.query("DELETE FROM todo where todo_id = $1 RETURNING *",[todo_id]);
        res.json(allTodos.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})



app.listen(5000, ()=>{
    console.log("Server is running or port 5000 ....");
})