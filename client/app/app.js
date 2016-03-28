angular.module('coffee', ['ngRoute', 'coffee.auth', 'coffee.storeAuth'])
.config(function($routeProvider, $httpProvider){
  $routeProvider
    .when('/signin',{
      templateUrl: 'app/auth/users/signin.html',
      controller: 'AuthController',
    })
    .when('/',{
      templateUrl: 'app/auth/users/signin.html',
      controller: 'AuthController',
    })
    .when('/signup',{
      templateUrl: 'app/auth/users/signup.html',
      controller: 'AuthController',
    })
    .when('/store/signin',{
      templateUrl: 'app/auth/stores/storeSignin.html',
      controller: 'storeAuthController',
    })
    .when('/store/signup',{
      templateUrl: 'app/auth/stores/storeSignup.html',
      controller: 'storeAuthController',
    })
//     .when('/usersignout',{
//       templateUrl: 'app/auth/users/signin.html',
//       controller: 'AuthController',
//     })
//     .when('/storesignout',{
//       templateUrl: 'app/auth/store/signin.html',
//       controller: 'storeAuthController',
//     })
//     $httpProvider.interceptors.push('AttachTokens');
})
