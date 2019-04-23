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
			
			scope.account = {};
			scope.account.id = 0;
			
			scope.accounts = []; // list
			
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
			
			scope.account = {};
			scope.account.id = 0;
			
			$http({
			  method: 'POST',
			  url: 'handlers/accounts/list.php',
			}).then(function mySucces(response) {
				
				scope.accounts = response.data;
				
				bui.hide();
				
			}, function myError(response) {
				 
				bui.hide();
				
			});
			//

			$('#content').load('lists/accounts.html', function() {
				$timeout(function() { $compile($('#content')[0])(scope); },100);								
				// instantiate datable
				$timeout(function() {
					$('#user_table').DataTable({
						"ordering": false
					});	
				},200);
				
			});
		};
		
		function validate(scope) {
			
			var controls = scope.formHolder.account.$$controls;
			
			angular.forEach(controls,function(elem,i) {
				
				if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
									
			});

			return scope.formHolder.account.$invalid;
			
		};
		
		self.cancel = function(scope) {
			
			self.list(scope);
			
		};
		
		self.edit = function(scope) {
			
			scope.controls.ok.btn = !scope.controls.ok.btn;
			
		};
		
		self.save = function(scope) {
			
			if (validate(scope)){ 
			growl.show('alert alert-danger alert-dismissible fade in',{from: 'top', amount: 55},'Please complete required fields.');
			return;
			};
			
			$http({
			  method: 'POST',
			  url: 'handlers/accounts/save.php',
			  data: {account: scope.account}
			  
			}).then(function mySucces(response) {
				
				if (scope.account.id == 0) {
					scope.account.id = response.data;
					
					growl.show('alert alert-success alert-dismissible fade in',{from: 'top', amount: 55},'Account Information successfully added.');
						
					}	else{
						growl.show('alert alert-success alert-dismissible fade in',{from: 'top', amount: 55},'Account Information successfully updated.');
					};
					
					mode(scope,scope.account)
					

			}, function myError(response) {
				 
			  // error
				
			});			
			
		};	
	
		self.account = function(scope,row) {	
			
			bui.show();
			
			scope.account = {};
			scope.account.id = 0;
			
			mode(scope,row);
			
			$('#content').load('forms/account.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});
			
			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;
				
				$http({
				  method: 'POST',
				  url: 'handlers/accounts/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.account);
					
					bui.hide();
					
				}, function myError(response) {
					 
					 bui.hide();
					 
				});
				
			};
			
		}; 
		
		
		
		self.delete = function(scope,row) {
			
			var onOk = function() {
				
				if (scope.$id > 2) scope = scope.$parent;			
				
				$http({
				  method: 'POST',
				  url: 'handlers/accounts/delete.php',
				  data: {id: [row.id]}
				}).then(function mySucces(response) {

					self.list(scope);
					
					growl.show('alert alert-danger alert-dismissible fade in',{from: 'top', amount: 55},'Account Information successfully deleted.');
					
				}, function myError(response) {
					 
				  // error
					
				});

			};

			bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
			
		};
		
		/* // show password
		self.inputType = 'password';
		  
		self.hideShowPassword = function(){
			if (self.inputType == 'password')
				self.inputType = 'text';
			else
				self.inputType = 'password';
	    }; */
		
	};
	
	return new app();
	
});