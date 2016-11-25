angular.module('todoController', [])

    .controller('mainController', function($scope, $http, Todos) {
        $scope.formData = {};


        // GET =====================================================================
                // when landing on the page, get all todos and show them
                // use the service to get all the todos
        Todos.get()
                .success(function(data) {
                        $scope.todos = data;
                });

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createTodo = function() {

           // validate the formData to make sure that something is there
           // if form is empty, nothing will happen
           // people can't just hold enter to keep adding the same to-do anymore
           if (!$.isEmptyObject($scope.formData)) {

               // call the create function from our service (returns a promise object)
               Todos.create($scope.formData)

                   // if successful creation, call our get function to get all the new todos
                   .success(function(data) {
                       $scope.formData = {}; // clear the form so our user is ready to enter another
                       $scope.todos = data; // assign our new list of todos
                   });
           }
        };

        // UPDATE ==================================================================
        $scope.changedoneTodo = function(id) {
          Todos.changeDone(id)
          // if successful creation, call our get function to get all the new todos
          .success(function(data) {
              $scope.todos = data; // assign our new list of todos
          });
          var done_field = $('#' + id + '-done');
          if (done_field.innerHTML == 'false') {
              done_field.innerHTML = 'done';
          } else {
            console.log(id)
              done_field.innerHTML = 'pending';
          }
        };

         // DELETE ==================================================================
         // delete a todo after checking it
         $scope.deleteTodo = function(id) {
             Todos.delete(id)
                 // if successful creation, call our get function to get all the new todos
                 .success(function(data) {
                     $scope.todos = data; // assign our new list of todos
                 });
         };
     });
