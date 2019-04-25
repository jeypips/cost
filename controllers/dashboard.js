var app = angular.module('dashboard',['account-module','app-module']);

app.controller('dashboardCtrl',function($scope,app) {

	app.data($scope);
	
	$scope.app = app;
	
});