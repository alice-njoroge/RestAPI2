const express = require('express');
const app = express();
app.use(express.json());

const todos = [
    {
        id: 1,
        name: "clean utensils"
    }, {
        id: 2,
        name: "go to the market"
    },
    {
        id: 3,
        name: "go to the market"
    }
]
app.get('/todos', function (request, response) {
    console.log("todos", todos);
    response.send(todos);
});
app.get('/todos/:id', function (request, response) {
    console.log("todos", request.params);
    const id = request.params.id;
    const todo = todos.find(function (todo){
      return  todo.id === parseInt(id);
    })
    if (!todo){
        return response.status(404).send({message: 'todo not found'});
    }
    response.send(todo);
});
app.post('/todos', function (request, response) {
   const body = request.body;
   todos.push(body);
   return response.send("okay");
});

app.put('/todos/:id',function (req, res){
    const id = parseInt(req.params.id);
    let todoIndex = todos.findIndex(function (todo){
        return todo.id === id;
    });
    if (todoIndex < 0){
        return res.status(404).send({message: 'todo not found'});
    }
    let name = req.body.name;
    console.log("name", name);
    todos[todoIndex].name = name;

    return res.send("done!");
});
app.delete('/todos/:id', function (req,res){
    const id = parseInt(req.params.id);
    let item = todos.findIndex(function (todo){
        return todo.id === id;
    });
    todos.splice(item, 1);
    return res.send("okay")
});

app.listen(8000, function () {
    console.log("application running");
})

