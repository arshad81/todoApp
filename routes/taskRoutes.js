import express from "express";
import { Todo } from "../model/todoSchema.js";

const taskRouter = express.Router();

taskRouter.post("/todos", async (req, res) => {
  const { title } = req.body;
  console.log(title);
  try {
    const newTodo = await Todo.create({ title: title, completed: false });
    res.status(201).json(newTodo);
    console.log(title);
  } catch (error) {
    console.log(error);
  }
});

taskRouter.get("/todos", async (req, res) => {
    try {
      const todos = await Todo.find({});
      res.json(todos);
    } catch (error) {
      console.log(error);
    }
})

taskRouter.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const { title,completed } = req.body;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id,{title:title,completed: completed},{new: true})
        res.json(updatedTodo)
    } catch (error) {
        console.log(error)
    }
})

taskRouter.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.findByIdAndDelete(id)
        res.json({ message: "Todo deleted successfully." })
    } catch (error) {
        console.log(error)
    }
})

taskRouter.delete("/todos", async (req,res) => {
  const {isComplete} = req.body
  try {
    await Todo.deleteMany({completed: true})
    res.json({ message: "All completed Todos deleted successfully." })

  } catch (error) {
    console.log(error)
  }
})

export default taskRouter;
