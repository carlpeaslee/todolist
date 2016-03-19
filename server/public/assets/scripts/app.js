


$(document).ready( function() {
  loadTodos();
  $('form').on('submit', createTodo);
  $('.active').on('click', '.mark-deleted', editStatus);
  $('.active').on('click', '.mark-completed', editStatus);
  $('.inactive').on('click', '.mark-active', editStatus);
  $('.active').on('click', '.mark-important', editStatus);
  $('.active').on('click', '.mark-medium', editStatus);
  $('.active').on('click', '.mark-trivial', editStatus);

});



function createTodo(){
  event.preventDefault();
  var formArray = $('form').serializeArray();

  var todoData = {}
  $.each(formArray, function(index, element){
    todoData[element.name] = element.value;
  });

  $.ajax({
    type: 'POST',
    url: '/new',
    data: todoData,
    success: function() {
      console.log("todo submitted");
      loadTodos();
    }
  });
}

function loadTodos() {
  //make an ajax get call and get all the todo information
  $.ajax({
   type: 'GET',
   url: '/load',
   success: appendTodoList
 })
};

function appendTodoList(todoArray) {
  $('.priority-0').empty();
  $('.priority-1').empty();
  $('.priority-2').empty();
  $('.priority-3').empty();
  $('.priority-4').empty();
  todoArray.forEach(function(todo){
      switch (todo.status) {
        case 0:
          $('.priority-0').append('<div data-id="' + todo.id + '" class="status-0-done">' +
                              '<h3>' + todo.task + '</h3>' +
                              '<h3>' + todo.notes + '</h3>' +
                              '<button data-status="2" class="mark-active">Reactivate</button>' +
                              '</div>'
          );
          break;
        case 1:
          $('.priority-1').append('<div data-id="' + todo.id + '" class="status-1-important">' +
                              '<h3>' + todo.task + '</h3>' +
                              '<h3>' + todo.notes + '</h3>' +
                              '<button data-status="0" class="mark-completed">Completed</button>' +
                              '<button data-status="4" class="mark-deleted">Delete</button>' +
                              '<button data-status="2" class="mark-medium">Medium</button>' +
                              '<button data-status="3" class="mark-trivial">Trivial</button>' +
                              '</div>'
          );
          break;
        case 2:
          $('.priority-2').append('<div data-id="' + todo.id + '" class="status-2-medium">' +
                            '<h3>' + todo.task + '</h3>' +
                            '<h3>' + todo.notes + '</h3>' +
                            '<button data-status="0" class="mark-completed">Completed</button>' +
                            '<button data-status="4" class="mark-deleted">Delete</button>' +
                            '<button data-status="1" class="mark-medium">Important</button>' +
                            '<button data-status="3" class="mark-trivial">Trivial</button>' +
                            '</div>'
          );
          break;
        case 3:
          $('.priority-3').append('<div data-id="' + todo.id + '" class="status-3-trivial">' +
                            '<h3>' + todo.task + '</h3>' +
                            '<h3>' + todo.notes + '</h3>' +
                            '<button data-status="0" class="mark-completed">Completed</button>' +
                            '<button data-status="4" class="mark-deleted">Delete</button>' +
                            '<button data-status="1" class="mark-medium">Important</button>' +
                            '<button data-status="2" class="mark-trivial">Medium</button>' +
                            '</div>'
          );
          break;
        case 4:
          $('.priority-4').append('<div data-id="' + todo.id + '" class="status-4-deleted">' +
                            '<h3>' + todo.task + '</h3>' +
                            '<h3>' + todo.notes + '</h3>' +
                            '<button data-status="2" class="mark-active">Reactivate</button>' +
                            '</div>'
          );
          break;
      }
  });
}

function editStatus(){
  var updateData = {};
  updateData.id = $(this).parent().data('id');
  updateData.status = $(this).data('status');

  $.ajax({
    type: 'POST',
    url: '/update',
    data: updateData,
    success: function() {
      loadTodos();
    }
  });
}
