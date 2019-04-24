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
			
			scope.article = {};
			scope.article.id = 0;
			
			scope.articles = []; // list
			
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
			
			scope.article = {};
			scope.article.id = 0;
			
			$http({
			  method: 'POST',
			  url: 'handlers/sheets/list.php',
			}).then(function mySucces(response) {
				
				scope.articles = response.data;
				
				bui.hide();
				
			}, function myError(response) {
				 
				bui.hide();
				
			});
			//

			$('#content').load('lists/sheets.html', function() {
				$timeout(function() { $compile($('#content')[0])(scope); },100);								
				// instantiate datable
				$timeout(function() {
					$('#sheet_table').DataTable({
						"ordering": false
					});	
				},200);
				
			});
		};
		
		function validate(scope) {
			
			var controls = scope.formHolder.article.$$controls;
			
			angular.forEach(controls,function(elem,i) {
				
				if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
									
			});

			return scope.formHolder.article.$invalid;
			
		};
		
		self.cancel = function(scope) {
			
			if(scope.article.description==null)
			{
					
				if (scope.article.id>0) {
					
					$http({
					  method: 'POST',
					  url: 'handlers/sheets/delete-no.php',
					  data: {id: scope.article.id}
					}).then(function mySucces(response) {

						self.list(scope);
						
					}, function myError(response) {
						 
					  // error
						
					});
					
				};
				
			} else{
					
				self.list(scope);
				
			};
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
			  url: 'handlers/sheets/save.php',
			  data: {article: scope.article}
			  
			}).then(function mySucces(response) {
				
				if (scope.article.id == 0) {
					scope.article.id = response.data;
					
					growl.show('btn btn-default',{from: 'top', amount: 55},'Account Information successfully added.');
						
					}	else{
						growl.show('btn btn-default',{from: 'top', amount: 55},'Account Information successfully updated.');
					};
					
					mode(scope,scope.article)
					

			}, function myError(response) {
				 
			  // error
				
			});			
			
		};
		
		function articleNo(scope) {
			
			$http({
			  method: 'GET',
			  url: 'handlers/sheets/article-no.php'
			}).then(function mySucces(response) {

				scope.article.id = response.data.id;
				scope.article.article_no = response.data.article_no;

			}, function myError(response) {
				
			});	
			
		};
	
		self.article = function(scope,row) {	
			
			bui.show();
			
			scope.article = {};
			scope.article.id = 0;
			
			mode(scope,row);
			
			$timeout(function() { if (scope.article.id==0) articleNo(scope); },100);
						
			$('#content').load('forms/sheet.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});
			
			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;
				
				$http({
				  method: 'POST',
				  url: 'handlers/sheets/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.article);
					
					bui.hide();
					
				}, function myError(response) {
					 
					 bui.hide();
					 
				});
				
			};
			
			$timeout(function() { bui.hide(); },100);
			
		}; 
		
		
		
		self.delete = function(scope,row) {
			
			var onOk = function() {
				
				if (scope.$id > 2) scope = scope.$parent;			
				
				$http({
				  method: 'POST',
				  url: 'handlers/sheets/delete.php',
				  data: {id: [row.id]}
				}).then(function mySucces(response) {

					self.list(scope);
					
					growl.show('btn btn-danger',{from: 'top', amount: 55},'Account Information successfully deleted.');
					
				}, function myError(response) {
					 
				  // error
					
				});

			};

			bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
			
		};
		
	};
	
	return new app();
	
});