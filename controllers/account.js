var app = angular.module('account',['account-module','app-module']);

app.controller('accountCtrl',function($scope,app) {
	
	$scope.views = {};
	$scope.formHolder = {};

	app.data($scope);
	app.list($scope);
	
	$scope.app = app;
	
});

app.filter('pagination', function() {
	  return function(input, currentPage, pageSize) {
	    if(angular.isArray(input)) {
	      var start = (currentPage-1)*pageSize;
	      var end = currentPage*pageSize;
	      return input.slice(start, end);
	    }
	  };
});
