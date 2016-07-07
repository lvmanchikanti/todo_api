var express = require('express');
var bodyParser = require('body-parser');
var lowdb = require('lowdb');
var uuid = require('uuid');
var server = express();

//importing models
var Todo = require('./models/todo.js');

var port = process.env.PORT || 8080;
var db = lowdb('db.json');

//Database Initialization
db.defaults({todos: []})
  .value(); //runs previous set of commands

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get('/todos', function(request,response){
  var read = db.get('todos')
                .value();
  response.send(read);
});

server.get('/todos/:id', function(request, response){
  var todo = db.get('todos')
              .find({id: request.params.id})
              .value();
  response.send(todo);
});

server.post('/todos', function(request, response){
  var todo = new Todo(request.body.description);
  var result = db.get('todos')
                  .push(todo)
                  .last()
                  .value();
  response.send(result);
});

server.put('/todos/:id', function(request, response){
  var todo = new Todo(request.body.description,request.params.id);
  todo.updateComplete(request.body.isComplete);
  var updatedTodo = db.get('todos')
                      .find({id: request.params.id})
                      .assign(todo)
                      .value();
  response.send(updatedTodo);
});

server.delete('/todos/:id', function(request, response){
  var todo = db.get('todos')
                .remove({id: request.params.id})
                .value();
  response.send(todo);
});

server.listen(port, function(){
  console.log('Now listening on port: ', port);
});
