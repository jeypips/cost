angular.module('app-module',['bootstrap-modal','bootstrap-growl','block-ui']).factory('app', function($compile,$window,$timeout,$http,bootstrapModal,growl,bui) {
	
	function app() {
		
		var self = this;
		
		self.data = function(scope) { // initialize data			
			
			$http({
				method: 'POST',
				url: 'api/suggestions/dashboard.php'
			}).then(function mySucces(response) {
				
				scope.dashboard = angular.copy(response.data);
				
			},function myError(response) {
				
			});
			
		};
		
	};
	
	return new app();
	
});