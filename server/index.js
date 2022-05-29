const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// routes

// create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "insert into todo(description) values($1) returning*",
      [description]
    );
    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

// get all todo
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("select * from todo");
    res.status(200).json(allTodos.rows);
  } catch (error) {
    console.log(error);
  }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("select * from todo where todo_id=$1", [id]);
    res.status(200).json(todo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "update todo set description=$1 where todo_id=$2",
      [description, id]
    );
    res.status(200).json("Todo was updated!");
  } catch (error) {
    console.log(error);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deteleTodo = await pool.query("delete from todo where todo_id=$1", [
      id,
    ]);
    res.status(200).json("Todo was deleted!");
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running in port 5000");
});
