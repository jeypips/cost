var app = angular.module('department',['account-module','app-module']);

app.controller('departmentCtrl',function($scope,app) {
	
	$scope.views = {};
	$scope.formHolder = {};

	app.data($scope);
	app.list($scope);
	
	$scope.app = app;
	
});