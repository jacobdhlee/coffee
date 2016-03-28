angular.module('coffee.service',[])
.controller('Auth', function($http){
  var signin = function() {
    return $http({
      method: 'POST',
      url: '/signin',
      data: user
    })
    .then(function(resp){
      console.log('resp >>>>>>>>>>>>>>>>>>',resp);
      return resp;
    })
  }
  return {
    signin: signin,
  }
})