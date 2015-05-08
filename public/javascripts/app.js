var comedyApp = angular.module('comedyApp', ['ngResource', 'ui.router']);

comedyApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        jokePromise: ['jokes', function(jokes) {
          return jokes.getAll();
        }]
      },
      onEnter: function($state, auth) {
        if(auth.isLoggedIn() === false) {
          $state.go('login')
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: '/login.html',
      controller: 'AuthCtrl',
      onEnter: function($state, auth) {
        if(auth.isLoggedIn()) {
          $state.go('home')
        }
      }
    })
    .state('register', {
      url: '/register',
      templateUrl: '/register.html',
      controller: 'AuthCtrl',
      onEnter: function($state, auth) {
        if(auth.isLoggedIn()) {
          $state.go('home')
        }
      }
    })

  $urlRouterProvider.otherwise('login');  
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

comedyApp.factory('jokes', function($http) {

  var object = { jokes: [] };

  object.create = function(joke) {
    return $http.post('/jokes', joke).success(function(data) {
      object.jokes.unshift(data);
    });
  };

  object.addstar = function(joke) {
    return $http.put('/jokes/' + joke._id + '/addstar')
      .success(function(data) {
        joke.stars += 1;
      });
  };

  object.getAll = function() {
    return $http.get('/jokes').success(function(data) {
      angular.copy(data, object.jokes);
    });
  };

  return object;
});

comedyApp.controller('MainCtrl', function($scope, $resource, jokes) {

  $scope.addJoke = function() {
    if(!$scope.text || $scope.text === '') { return; }
    jokes.create({ text: $scope.text });
    $scope.text = '';
  };

  $scope.addstar =  function(joke) {
    jokes.addstar(joke);
  };

  $scope.jokes = jokes.jokes.reverse();
  $scope.randomJoke = $scope.jokes[Math.floor(Math.random() * $scope.jokes.length)];

});

comedyApp.controller('NavCtrl', function($scope, auth, $state) {

  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;

  $scope.logOut = function() {
    auth.logOut();
    $state.go('login');
  };
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
