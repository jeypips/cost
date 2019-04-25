angular.module('app-module',['bootstrap-modal','bootstrap-growl','block-ui']).factory('app', function($compile,$window,$timeout,$http,bootstrapModal,growl,bui) {
	
	function app() {
		
		var self = this;
		
		self.data = function(scope) { // initialize data			
			
			scope.formHolder = {};
			
			scope.controls = {
				ok: {
					btn: false,
					label: 'Save'
				},
				cancel: {
					btn: false,
					label: 'Cancel'
				},
			};
			
			scope.description = {};
			scope.description.id = 0;
			
			scope.descriptions = []; // list
			
		};
		
		function mode(scope,row) {
			
			if (row == null) {
				scope.controls.ok.label = 'Save';
				scope.controls.ok.btn = false;
				scope.controls.cancel.label = 'Cancel';
				scope.controls.cancel.btn = false;
			} else {
				scope.controls.ok.label = 'Update';
				scope.controls.ok.btn = true;
				scope.controls.cancel.label = 'Close';
				scope.controls.cancel.btn = false;				
			}
			
		};	

		self.list = function(scope) {
			
			bui.show();
			
			scope.description = {};
			scope.description.id = 0;
			
			$http({
			  method: 'POST',
			  url: 'handlers/descriptions/list.php',
			}).then(function mySucces(response) {
				
				scope.descriptions = response.data;
				
				bui.hide();
				
			}, function myError(response) {
				 
				bui.hide();
				
			});
			//

			$('#content').load('lists/descriptions.html', function() {
				$timeout(function() { $compile($('#content')[0])(scope); },100);								
				// instantiate datable
				$timeout(function() {
					$('#description_table').DataTable({
						"ordering": false
					});	
				},200);
				
			});
		};
		
		function validate(scope) {
			
			var controls = scope.formHolder.description.$$controls;
			
			angular.forEach(controls,function(elem,i) {
				
				if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
									
			});

			return scope.formHolder.description.$invalid;
			
		};
		
		self.cancel = function(scope) {
			
			self.list(scope);
			
		};
		
		self.edit = function(scope) {
			
			scope.controls.ok.btn = !scope.controls.ok.btn;
			
		};
		
		self.save = function(scope) {
			
			if (validate(scope)){ 
			growl.show('btn btn-danger',{from: 'top', amount: 55},'Please complete required fields.');
			return;
			};
			
			$http({
			  method: 'POST',
			  url: 'handlers/descriptions/save.php',
			  data: {description: scope.description}
			  
			}).then(function mySucces(response) {
				
				if (scope.description.id == 0) {
					scope.description.id = response.data;
					
					growl.show('btn btn-default',{from: 'top', amount: 55},'Description Information successfully added.');
						
					}	else{
						growl.show('btn btn-default',{from: 'top', amount: 55},'Description Information successfully updated.');
					};
					
					mode(scope,scope.description)
					self.list(scope);

			}, function myError(response) {
				 
			  // error
				
			});			
			
		};	
		 
		self.description = function(scope,row) {
			
			var title = 'Add Description';
			
			scope.description = {};
			scope.description.id = 0;
			
			mode(scope,row);
			
			if (row != null) {
				
				title = 'Edit Description';
				
				if (scope.$id > 2) scope = scope.$parent;				
				$http({
				  method: 'POST',
				  url: 'handlers/descriptions/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.description);
					
				}, function myError(response) {
					 
				  // error
					
				});		
				
			};
			
			var onOk = function() {
				
				self.save(scope);
	
			};
			
			bootstrapModal.box(scope,title,'dialogs/description.html',onOk);
			
		};
		
		self.delete = function(scope,row) {
			
			var onOk = function() {
				
				if (scope.$id > 2) scope = scope.$parent;			
				
				$http({
				  method: 'POST',
				  url: 'handlers/descriptions/delete.php',
				  data: {id: [row.id]}
				}).then(function mySucces(response) {

					self.list(scope);
					
					growl.show('btn btn-danger',{from: 'top', amount: 55},'Description Information successfully deleted.');
					
				}, function myError(response) {
					 
				  // error
					
				});

			};

			bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
			
		};
		
		
	};
	
	return new app();
	
});