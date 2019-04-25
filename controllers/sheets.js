var app = angular.module('sheets',['account-module','app-module']);

app.controller('sheetsCtrl',function($scope,app) {
	
	$scope.views = {};
	$scope.formHolder = {};

	app.data($scope);
	app.list($scope);
	
	$scope.app = app;
	
	$scope.views.profilePicture = 'pictures/default.jpg';
	
});