var app = angular.module('description',['account-module','app-module']);

app.controller('descriptionCtrl',function($scope,app) {
	
	$scope.views = {};
	$scope.formHolder = {};

	app.data($scope);
	app.list($scope);
	
	$scope.app = app;
	
});