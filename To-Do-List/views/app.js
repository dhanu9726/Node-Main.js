const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));

let todos = []; 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const { title, description, price, imageUrl } = req.body;
    const newTodo = { title, description, price, imageUrl, id: Date.now() };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
    todos = todos.filter(todo => todo.id !== parseInt(req.params.id));
    res.status(204).end();
});

app.put('/todos/:id', (req, res) => {
    const { title, description, price, imageUrl } = req.body;
    todos = todos.map(todo => todo.id === parseInt(req.params.id) ? { id: parseInt(req.params.id), title, description, price, imageUrl } : todo);
    res.json(todos.find(todo => todo.id === parseInt(req.params.id)));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
