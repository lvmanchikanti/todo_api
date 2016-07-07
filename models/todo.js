var uuid = require('uuid')
//Constructor function
//how do i build this object?
function Todo(description, id){
  this.id =  id || uuid.v4();
  this.description = description;
  this.isComplete = false;
}

//one type of design pattern to create functionality to an object
Todo.prototype.updateComplete = function(value){
  if(value.toLowerCase() === 'true'){
    this.isComplete = true;
  } else {
    this.isComplete = false;
  }
};

// var todo1 = new Todo('read my book');
// var todo2 = new Todo('practice programming');
// var todo3 = new Todo('go running');
// console.log(todo1,todo2,todo3);

//typically at the bottom
module.exports = Todo;
