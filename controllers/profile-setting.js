var app = angular.module('profileSetting',['account-module','app-module']);

app.controller('profileSettingCtrl',function($scope,app) {
	
	$scope.formHolder = {};
	
	app.data($scope);
	$scope.app = app;
	
});
