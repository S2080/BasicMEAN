/**
 *  We have to create a module, create a controller, and define functions to handle todos. 
 * Then we can apply to view.
 */

var scotchToDo = angular.module('scotchToDo', []);

function mainController($scope,$http) {
    $scope.formData = {};

    $http.get('/api/todos/').success(function(data) {
        $scope.todos = data;
        console.log(data);
    }).error(function(data) {
        console.log('Error: ' + JSON.stringify(data));
    }); 

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        {{$scope.formData}}

        console.log('Form Data' + JSON.stringify($scope.formData));
        if($scope.formData && $scope.formData.text) {
            $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
        
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}