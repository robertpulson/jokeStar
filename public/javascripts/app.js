var comedyApp = angular.module('comedyApp', ['ngResource', 'ui.router']);

comedyApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth) {
        if(auth.isLoggedIn()) {
          $state.go('home')
        }
      }]
    })
    .state('register', {
      url: '/register',
      templateUrl: '/register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth) {
        if(auth.isLoggedIn()) {
          $state.go('home')
        }
      }]
    })

  $urlRouterProvider.otherwise('home');  
});

comedyApp.factory('auth', function($http, $window) {
  var auth = {};

  auth.saveToken = function(token) {
    $window.localStorage['comedy-store-token'] = token;
  };

  auth.getToken = function() {
    return $window.localStorage['comedy-store-token'];
  };

  auth.isLoggedIn = function() {
    var token = auth.getToken();

    if(token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    };
  };

  auth.currentUser = function() {

    if(auth.isLoggedIn()) {
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.username;
    };
  };

  auth.register = function(user) {
    return $http.post('/register', user).success(function(data) {
      auth.saveToken(data.token);
    });
  };

  auth.logIn = function(user) {
    return $http.post('/login', user).success(function(data) {
      auth.saveToken(data.token);
    });
  };

  auth.logOut = function() {
    $window.localStorage.removeItem('comedy-store-token');
  };
  
  return auth;

});

comedyApp.controller('MainCtrl', function($scope, $resource) {

  var searchResource = $resource('http://api.icndb.com/jokes/random')

  searchResource.get(function (data) {
    $scope.randomJoke = data.value.joke;
  });
});

comedyApp.controller('NavCtrl', function($scope, auth) {

  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;
});

comedyApp.controller('AuthCtrl', function($scope, $state, auth) {

  $scope.user = {};

  $scope.register = function() {
    auth.register($scope.user).error(function(error) {
      $scope.error = error;
    }).then(function() {
      $state.go('home');
    });
  };

  $scope.logIn = function() {
    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function() {
      $state.go('home');
    });
  };

})
