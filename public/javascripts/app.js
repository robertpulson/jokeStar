var comedyApp = angular.module('comedyApp', ['ngResource']);

comedyApp.controller('comedyController', function($scope, $resource) {

  var searchResource = $resource('http://api.icndb.com/jokes/random')

  searchResource.get(function (data) {
    $scope.randomJoke = data.value.joke;
  });

});
