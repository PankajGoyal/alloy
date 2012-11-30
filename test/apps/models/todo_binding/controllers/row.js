var moment = require('moment');
var todos = Alloy.Collections.todo;
var id;

// $model represents the current model accessible to this 
// controller from the markup's model-view binding. $model
// will be null if there is no binding in place. 

if ($model) {
	id = $model.get('id');
	if ($model.get('done')) {
		$.row.backgroundColor = '#eee';
		$.check.backgroundColor = '#eee';
		$.task.color = '#ccc';
		$.check.image = '/tick_64.png';
	} else {
		$.row.backgroundColor = '#fff';
		$.check.backgroundColor = '#fff';
		$.task.color = '#000';
		$.check.image = '/tick_gray_64.png';
	}
}

// toggle the "done" status of the IDed todo
function toggleStatus(e) {
	// finc the todo task by id
	var todo = todos.get(id);

	// set the current done and date_completed fields for the model
	todo.set({
    		"done": todo.get('done') ? 0 : 1,
    		"date_completed": moment().unix()
  	}).save(); // save to presistence

  	// update views from sql storage
  	todos.fetch();
}

// delete the IDed todo from the collection
function deleteTask(e) {
	// find the todo task by id
	var todo = todos.get(id);

	// remove the model from the collection
	todos.remove(todo);

	// destroy the model from persistence
	todo.destroy();

  	// update views from sql storage
  	todos.fetch();
}