angular.module('app-module',['bootstrap-modal','bootstrap-growl','block-ui','ui.bootstrap']).factory('app', function($compile,$window,$timeout,$http,bootstrapModal,growl,bui) {
	
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
			
			scope.article.fabrics = [];
			scope.article.fabrics_dels = [];
			scope.article.threads = [];
			scope.article.threads_dels = [];
			scope.article.accessories = [];
			scope.article.accessories_dels = [];
			scope.article.labors = [];
			scope.article.labors_dels = [];
			
			scope.articles = []; // list
			
		};
		
		function departments(scope) {
			
			$http({
				method: 'POST',
				url: 'api/suggestions/departments.php'
			}).then(function mySucces(response) {
				
				scope.departments = response.data;
				
			},function myError(response) {
				
			});
			
		};
		
		function descriptions(scope) {
			
			$http({
				method: 'POST',
				url: 'api/suggestions/descriptions.php'
			}).then(function mySucces(response) {
				
				scope.descriptions = response.data;
				
			},function myError(response) {
				
			});
			
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
			
			scope.article.fabrics = [];
			scope.article.fabrics_dels = [];
			
			scope.article.threads = [];
			scope.article.threads_dels = [];
			
			scope.article.accessories = [];
			scope.article.accessories_dels = [];
			
			scope.article.labors = [];
			scope.article.labors_dels = [];
			
			$timeout(function() { descriptions(scope); },200);
			$timeout(function() { departments(scope); },200);
			
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
					scope.article.date = new Date(response.data.date);
					
					bui.hide();
					
				}, function myError(response) {
					 
					 bui.hide();
					 
				});
				
			};
			
			$timeout(function() { bui.hide(); },100);
			
		}; 
		
		self.descriptionSelect = function($item, scope) {
			
			scope.article.description = $item;
			
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
		
		self.fabric = {
			
			add: function(scope) {

				scope.article.fabrics.push({
					id: 0,
					articles_id: 0,
					description: '',
					quality: '',
					color: '',
					qty: '',
					dimension_w: '',
					dimension_l: '',
					fabric_m: '',
					landed_cost: '',
					cost: ''
				});

			},			
			
			delete: function(scope,row) {
				
				if (row.id > 0) {
					scope.article.fabrics_dels.push(row.id);
				};
				
				var fabrics = scope.article.fabrics;
				var index = scope.article.fabrics.indexOf(row);
				scope.article.fabrics = [];			
				
				angular.forEach(fabrics, function(d,i) {
					
					if (index != i) {
						
						delete d['$$hashKey'];
						scope.article.fabrics.push(d);
						
					};
					
				});

			}			
			
		};
		
		self.thread = {
			
			add: function(scope) {

				scope.article.threads.push({
					id: 0,
					articles_id: 0,
					description: '',
					quality: '',
					color: '',
					initial_wt: '',
					net_wt: '',
					total_weight: '',
					landed_cost: '',
					cost: ''
				});

			},			
			
			delete: function(scope,row) {
				
				if (row.id > 0) {
					scope.article.threads_dels.push(row.id);
				};
				
				var threads = scope.article.threads;
				var index = scope.article.threads.indexOf(row);
				scope.article.threads = [];			
				
				angular.forEach(threads, function(d,i) {
					
					if (index != i) {
						
						delete d['$$hashKey'];
						scope.article.threads.push(d);
						
					};
					
				});

			}			
			
		};
		
		self.accessory = {
			
			add: function(scope) {

				scope.article.accessories.push({
					id: 0,
					articles_id: 0,
					item: '',
					color: '',
					size: '',
					consumption: '',
					landed_cost: '',
					cost: ''
				});

			},			
			
			delete: function(scope,row) {
				
				if (row.id > 0) {
					scope.article.accessories_dels.push(row.id);
				};
				
				var accessories = scope.article.accessories;
				var index = scope.article.accessories.indexOf(row);
				scope.article.accessories = [];			
				
				angular.forEach(accessories, function(d,i) {
					
					if (index != i) {
						
						delete d['$$hashKey'];
						scope.article.accessories.push(d);
						
					};
					
				});

			}			
			
		};
		
		self.labor = {
			
			add: function(scope) {

				scope.article.labors.push({
					id: 0,
					articles_id: 0,
					department: '',
					process: '',
					special_instruction: '',
					operator: '',
					approved_time: '',
					tl_min: '',
					hour: '',
					min: '',
					sec: ''
				});

			},			
			
			delete: function(scope,row) {
				
				if (row.id > 0) {
					scope.article.labors_dels.push(row.id);
				};
				
				var labors = scope.article.labors;
				var index = scope.article.labors.indexOf(row);
				scope.article.labors = [];			
				
				angular.forEach(labors, function(d,i) {
					
					if (index != i) {
						
						delete d['$$hashKey'];
						scope.article.labors.push(d);
						
					};
					
				});

			}			
			
		};
		
	};
	
	return new app();
	
});