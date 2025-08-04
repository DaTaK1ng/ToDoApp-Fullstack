const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

//Connect To MangoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//ToDoList in Db
const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Todo = mongoose.model('Todo', TodoSchema);


//APIs
//get Todo History
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Add A New Todo
app.post('/api/todos', async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      completed: req.body.completed || false
    });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Update A todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { 
        completed: req.body.completed,
        updatedAt: Date.now()
      },
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Server Start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});