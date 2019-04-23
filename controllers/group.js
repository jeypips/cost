var app = angular.module('group',['account-module','app-module']);

app.controller('groupCtrl',function($scope,app) {
	
	$scope.views = {};
	$scope.formHolder = {};

	app.data($scope);
	app.list($scope);
	
	$scope.app = app;
	
});