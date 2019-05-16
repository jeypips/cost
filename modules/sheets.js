angular.module('app-module',['bootstrap-modal','bootstrap-growl','block-ui','ui.bootstrap',,'module-access']).factory('app', function($compile,$window,$timeout,$http,bootstrapModal,growl,bui,fileUpload,access,imageLoad,$q) {
	
	function app() {
		
		var self = this;
		
		self.data = function(scope) { // initialize data			
			
			scope.views = {};
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
			
			// info
			scope.article.alert = {};
			scope.article.alert.show = false;
			scope.article.alert.message = '';
			
			scope.article.not_unique = false;
			scope.article.not_unique_version = false;
			
			scope.article.fabrics = [];
			scope.article.fabrics_dels = [];
			scope.article.threads = [];
			scope.article.threads_dels = [];
			scope.article.accessories = [];
			scope.article.accessories_dels = [];
			scope.article.labors = [];
			scope.article.labors_dels = [];
			
			scope.articles = []; // list
			
			watchInfo(scope);
			watchVersion(scope);
			
		};
		
		function watchInfo(scope) {
			
			$timeout(function() {
			
				scope.$watch(function(scope) {
					
					return scope.article.article_no;
					
				},function(newValue, oldValue) {
					
					username_is_unique(scope).then(function(res) {
						
							if(scope.article.article_no==null){
								scope.article.not_unique = res;
							}else{
								scope.article.not_unique = false;
							};
							
						// console.log(scope.article.not_unique);
					}, function(res) {
						
					});

				});

			}, 1000);			
			
		};
		
		function username_is_unique(scope) {
			
			return $q(function(resolve,reject) {
				
				$http({
					method: 'POST',
					url: 'handlers/sheets/article_no_check.php',
					data: scope.article
				}).then(function mySuccess(response) {

					resolve(response.data.status);
		
				}, function myError(response) {

					reject(false);

				});					
				
			});
			
		};
		
		self.trylang = function(scope) {
			
			$timeout(function() {
			
				scope.$watch(function(scope) {
					
					return scope.article.article_no;
					
				},function(newValue, oldValue) {
					
					username_is_unique(scope).then(function(res) {
						
							scope.article.not_unique = res;
							
						// console.log(scope.article.not_unique);
					}, function(res) {
						
					});

				});

			}, 1000);
			
		};
		
		self.on_type = function(scope) {
			
			$timeout(function() {
			
				scope.$watch(function(scope) {
					
					return scope.article.article_no_revision;
					
				},function(newValue, oldValue) {
					
					version_unique(scope).then(function(res) {
						
							scope.article.not_unique_version = res;
							
						// console.log(scope.article.not_unique_version);
					}, function(res) {
						
					});

				});

			}, 1000);
			
		};
		
		function watchVersion(scope) {
			
			$timeout(function() {
			
				scope.$watch(function(scope) {
					
					return scope.article.article_no_revision;
					
				},function(newValue, oldValue) {
					
					version_unique(scope).then(function(res) {
						
							if(scope.article.article_no_revision==null){
								scope.article.not_unique_version = res;
							}else{
								scope.article.not_unique_version = false;
							};
							
							// scope.article.not_unique_version = res;
						// console.log(scope.article.not_unique_version);
					}, function(res) {
						
					});

				});

			}, 1000);			
			
		};
		
		function version_unique(scope) {
			
			return $q(function(resolve,reject) {
				
				$http({
					method: 'POST',
					url: 'handlers/sheets/version_no.php',
					data: scope.article
				}).then(function mySuccess(response) {

					resolve(response.data.status);
		
				}, function myError(response) {

					reject(false);

				});					
				
			});
			
		};
		
		self.uploadProfilePicture = function(scope) {
			
		   // scope.proPic = null;
		   var file = scope.views.proPic;
		   
		   if (file == undefined) return;
		   console.log(file);
		   
		   var pp = file['name'];
		   var en = pp.substring(pp.indexOf("."),pp.length);

		   var uploadUrl = "handlers/files.php?r=upload_profile_picture&id="+scope.article.id+"&en="+en;
		   fileUpload.uploadFileToUrl(file, uploadUrl, scope);
			
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
			
			// delete if revised but not modified
			$http({
			  method: 'POST',
			  url: 'handlers/sheets/delete-revisions.php',
			}).then(function mySucces(response) {			
				
				
			}, function myError(response) {
				 
				
			});			
			//
			
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
			
			self.list(scope);
			/* if(scope.article.description==null)
			{
					
				if (scope.article.id>0) {
					
					$http({
					  method: 'POST',
					  url: 'handlers/sheets/delete-no.php',
					  data: {id: scope.article.id}
					}).then(function mySucces(response) {

						window.location.reload(true);
						
					}, function myError(response) {
						 
					  // error
						
					});
					
				};
				
			} else{
					
				window.location.reload(true);
				
			}; */
		};
		
		self.edit = function(scope) {
			
			if (!access.has(scope,scope.profile.groups,scope.module.id,scope.module.privileges.edit)) return;
			
			scope.controls.ok.btn = !scope.controls.ok.btn;
			
		};
		
		self.save = function(scope) {
	
			if (validate(scope)){ 
				growl.show('btn btn-danger',{from: 'top', amount: 55},'Please complete required fields.');
				return;
			};
			
				console.log(scope.article.not_unique);
				
				if(scope.article.not_unique==false && scope.article.not_unique_version==false){
				if (scope.controls.ok.label == 'Save') {
			
					$http({
					  method: 'POST',
					  url: 'handlers/sheets/save.php',
					  data: {article: scope.article}
					  
					}).then(function mySucces(response) {
					
					if (scope.article.id == 0) {
						scope.article.id = response.data;
						
						growl.show('btn btn-default',{from: 'top', amount: 55},'Sheet Information successfully added.');
							
						}	else{
							growl.show('btn btn-default',{from: 'top', amount: 55},'Sheet Information successfully updated.');
						};
						// self.uploadProfilePicture(scope);
						mode(scope,scope.article)
						

				}, function myError(response) {
					 
				  // error
					
				});
			
				} else { // Update
					
					$http({
					  method: 'POST',
					  url: 'handlers/sheets/save-update.php',
					  data: {article: scope.article}
					  
					}).then(function mySucces(response) {
						
						growl.show('btn btn-default',{from: 'top', amount: 55},'Sheet Information successfully revised.');										
						mode(scope,scope.article);
						
					}, function myError(response) {
						 
					  // error
						
					});				
					
				};
				} else{
					
					growl.show('btn btn-danger',{from: 'top', amount: 55},'Article Number is already taken');	
					
				};

		};
		
		function articleNo(scope) {
			
			$http({
			  method: 'GET',
			  url: 'handlers/sheets/article-no.php'
			}).then(function mySucces(response) {

				scope.article.id = response.data.id;
				scope.article.article_no_revision = response.data.article_no_revision;

			}, function myError(response) {
				
			});	
			
		};
	
		self.article = function(scope,row) {
			
			if (!access.has(scope,scope.profile.groups,scope.module.id,scope.module.privileges.add)) return;
						
			bui.show();
			
			console.log(scope.article.not_unique_version);
			
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
					
					cloneArticle(scope,response.data);					
					
					bui.hide();
					
				}, function myError(response) {
					 
					 bui.hide();
					 
				});
				
			} else {
				
				// $timeout(function() { if (scope.article.id==0) articleNo(scope); },100);				
				
			};
			
			$timeout(function() { bui.hide(); },100);			
			
		}; 				
		
		function cloneArticle(scope,article) {
			
			$http({
			  method: 'POST',
			  url: 'handlers/sheets/clone.php',
			  data: {article: article}
			}).then(function mySucces(response) {
				
				angular.copy(response.data, scope.article);
				// scope.article.date = new Date(response.data.date);
				
				imageLoad.go(scope,response.data.id);					
				
			}, function myError(response) {

				 
			});				
			
		};
		
		self.descriptionSelect = function($item, scope) {
			
			scope.article.code = $item;
			scope.article.description = scope.article.code.name;

		};
		
		self.delete = function(scope,row) {
			
			if (!access.has(scope,scope.profile.groups,scope.module.id,scope.module.privileges.delete)) return;
			
			var onOk = function() {
				
				if (scope.$id > 2) scope = scope.$parent;			
				
				$http({
				  method: 'POST',
				  url: 'handlers/sheets/delete.php',
				  data: {id: [row.id]}
				}).then(function mySucces(response) {

					self.list(scope);
					
					growl.show('btn btn-danger',{from: 'top', amount: 55},'Cost sheet Information successfully deleted.');
					
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
					fabric_m: 'TBD',
					landed_cost: '',
					cost: 'TBD'
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
					total_weight: 'TBD',
					landed_cost: '',
					cost: 'TBD'
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
					cost: 'TBD'
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
					sec: '',
					multiplier: '',
					cost: 'TBD'
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
		
		self.print = function(scope,article) {
			
			$http({
			  method: 'POST',
			  url: 'handlers/print-sheet.php',
			  data: {id: article.id}
			}).then(function mySucces(response) {
				
				if (scope.article.id == 0) {
					
					growl.show('alert alert-danger alert-dismissible fade in',{from: 'top', amount: 55},'Please complete required fields below.');
				
				} else {
					
					print(scope,response.data);
				
				};
			}, function myError(response) {
				 
			  // error
				
			});
					
			
		}; 
		
		function print(scope,article) {
		
		var photo = article.picture;
		var green = 'data:image/jpeg;base64,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Umx0AAAAAAAAAAAAAAAAUnNsdFVudEYjUHhsQFIAAAAAAAAAAAAKdmVjdG9yRGF0YWJvb2wBAAAAAFBnUHNlbnVtAAAAAFBnUHMAAAAAUGdQQwAAAABMZWZ0VW50RiNSbHQAAAAAAAAAAAAAAABUb3AgVW50RiNSbHQAAAAAAAAAAAAAAABTY2wgVW50RiNQcmNAWQAAAAAAAAAAABBjcm9wV2hlblByaW50aW5nYm9vbAAAAAAOY3JvcFJlY3RCb3R0b21sb25nAAAAAAAAAAxjcm9wUmVjdExlZnRsb25nAAAAAAAAAA1jcm9wUmVjdFJpZ2h0bG9uZwAAAAAAAAALY3JvcFJlY3RUb3Bsb25nAAAAAAA4QklNA+0AAAAAABAASAAAAAEAAgBIAAAAAQACOEJJTQQmAAAAAAAOAAAAAAAAAAAAAD+AAAA4QklNBA0AAAAAAAQAAAAeOEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNJxAAAAAAAAoAAQAAAAAAAAACOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0EAAAAAAAAAgABOEJJTQQCAAAAAAAEAAAAADhCSU0EMAAAAAAAAgEBOEJJTQQtAAAAAAAGAAEAAAAEOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJAAAAAADhCSU0EHgAAAAAABAAAAAA4QklNBBoAAAAAAzcAAAAGAAAAAAAAAAAAAALQAAADwAAAAAEAMQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAADwAAAAtAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcA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cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgcGhvdG9zaG9wOkxlZ2FjeUlQVENEaWdlc3Q9IkVFRjk3OTk4NzI5NjkyNTVDRjQzOEExQzZDRkUxNzIzIiBwaG90b3Nob3A6SW5zdHJ1Y3Rpb25zPSJGQk1EMDEwMDBhYTMwMzAwMDBhYjFmMDAwMDJmNDYwMDAwZTI0NjAwMDA3YjQ3MDAwMDgzNWUwMDAwZjU5YjAwMDAxNmE0MDAwMGY2YTYwMDAwMGRhYjAwMDBlMDFjMDEwMCIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9ImMyIiB4bXBNTTpEb2N1bWVudElEPSI1QzhCNUNDMEQ4MDI4QkZDQTJFRjdBMzFBQ0E5RThDRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1NUJEMTMwRTlBNjhFOTExOEVDRjgyOTY3REQzNDNDMyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSI1QzhCNUNDMEQ4MDI4QkZDQTJFRjdBMzFBQ0E5RThDRiIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOS0wNC0yN1QwODo0NToxMSswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTktMDQtMjdUMTE6MTI6NTQrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTktMDQtMjdUMTE6MTI6NTQrMDg6MDAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpEQUM4M0MxMzk3NjhFOTExODNGQTk5RjM2MjAyNzdENiIgc3RFdnQ6d2hlbj0iMjAxOS0wNC0yN1QxMDo0OToyOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjU1QkQxMzBFOUE2OEU5MTE4RUNGODI5NjdERDM0M0MzIiBzdEV2dDp3aGVuPSIyMDE5LTA0LTI3VDExOjEyOjU0KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/iAhxJQ0NfUFJPRklMRQABAQAAAgxsY21zAhAAAG1udHJSR0IgWFlaIAfcAAEAGQADACkAOWFjc3BBUFBMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD21gABAAAAANMtbGNtcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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W6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psXGtUW6psNRLws3jJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrDJYrAsJ9gpTv8AXP8A/9oACAEDAAEFAK5cooxyIA1GLKNRiyjUYso1GLKNRiyjUYso1GLKNRiyjUYso1GLKNRiyjUYso1GLKNRiyjUYso1GLKNRiyjUYso1GLKNRiyjUYso1GLKNRiyjUYso1GLKNRiyjUYso1GLKNRiyjUYso1GLKNRiyjUYso1GLKNRiyjUYso1GLKNRiyjUYso1GLKNRiyjUYso1GLKNRiyjUYso1GLKNRiyjUYso1GLKNRiyjUYso1GLKNRiyjUYso1GLKNRiyjUYso1GLKNRiyjUYso1GLKNRiyjUYso1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f1/P+H38fEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEPi95y8dT+3y+sgh8XvOXjqf2+X1kEJD/AJIwYkf1/wA/x/VKkSfv9n4ff5fnIl/f1+Hx9fX1/n9/f8fVveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoFveE9CoCZ4u40alp5aH5R/PwklI/mT+PzKkSvn5+PiSjkfP39yPj/P6+vv8Aj/xHn//aAAgBAwIGPwCPPhf/AFF8/wBT+3/c/b/8kCX8/wBX9X9f+8iSfj+P7Jf/AK/X39/z9/Xx9cxwhFmHMcIRZhzHCEWYcxwhFmHMcIRZhzHCEWYcxwhFmHMcIRZhzHCEWYcxwhFmHMcIRZhzHCEWYcxwhFmHMcIRZhzHCEWYcxwhFmHMcIRZhzHCEWYcxwhFmHMcIRZhzHCEWYcxwhFmHMcIRZhzHCEW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';
		var grid = 'data:image/jpeg;base64,/9j/4QyERXhpZgAATU0AKgAAAAgADAEAAAMAAAABA8AAAAEBAAMAAAABAtAAAAECAAMAAAADAAAAngEGAAMAAAABAAIAAAESAAMAAAABAAEAAAEVAAMAAAABAAMAAAEaAAUAAAABAAAApAEbAAUAAAABAAAArAEoAAMAAAABAAIAAAExAAIAAAAeAAAAtAEyAAIAAAAUAAAA0odpAAQAAAABAAAA6AAAASAACAAIAAgACvyAAAAnEAAK/IAAACcQQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykAMjAxOTowNDoyNyAxMToxOTozMwAAAAAEkAAABwAAAAQwMjIxoAEAAwAAAAEAAQAAoAIABAAAAAEAAAPAoAMABAAAAAEAAALQAAAAAAAAAAYBAwADAAAAAQAGAAABGgAFAAAAAQAAAW4BGwAFAAAAAQAAAXYBKAADAAAAAQACAAACAQAEAAAAAQAAAX4CAgAEAAAAAQAACv4AAAAAAAAASAAAAAEAAABIAAAAAf/Y/+0ADEFkb2JlX0NNAAH/7gAOQWRvYmUAZIAAAAAB/9sAhAAMCAgICQgMCQkMEQsKCxEVDwwMDxUYExMVExMYEQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAQ0LCw0ODRAODhAUDg4OFBQODg4OFBEMDAwMDBERDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAB4AKADASIAAhEBAxEB/90ABAAK/8QBPwAAAQUBAQEBAQEAAAAAAAAAAwABAgQFBgcICQoLAQABBQEBAQEBAQAAAAAAAAABAAIDBAUGBwgJCgsQAAEEAQMCBAIFBwYIBQMMMwEAAhEDBCESMQVBUWETInGBMgYUkaGxQiMkFVLBYjM0coLRQwclklPw4fFjczUWorKDJkSTVGRFwqN0NhfSVeJl8rOEw9N14/NGJ5SkhbSVxNTk9KW1xdXl9VZmdoaWprbG1ub2N0dXZ3eHl6e3x9fn9xEAAgIBAgQEAwQFBgcHBgU1AQACEQMhMRIEQVFhcSITBTKBkRShsUIjwVLR8DMkYuFygpJDUxVjczTxJQYWorKDByY1wtJEk1SjF2RFVTZ0ZeLys4TD03Xj80aUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9ic3R1dnd4eXp7fH/9oADAMBAAIRAxEAPwDvOj9H6acCi59VN9z6i2zIZLg8PBZYd7w1zvUa791Wh0Lo4rdUMSsVvc1zmxoS0ODHf2d70/Q/R/ZGL6G8VemNgsgvj+X6fsV5MhCPCNBt2YceLHwR9EflHTuGg/oXR7GMrfiVllTS1gjgEl7m/wCe7cifsnpv2k5f2dn2hxJdZGpLm+m//OYdqtpI8Ef3R9i/24fuR6dP3flaDOh9IZU+luJWK7Nu9saHYd1c/wBTck/ofSH1MpdiVmuvdsbGg3ndZH9far6SXBH90fYr2se3BHtsGp+yem/aRl/Z2faGkFtkagtb6bP81g2obOhdHrY+tmJWGWtDXiOQCHtb/nt3K+klwR/dH2K9uH7kevT975mgehdHNbajiVmtjnOa2NAXBoe7+1sYpfsbpXrMv+y1+rVs9N8aj0wG1R/xe32q6klwR/dH2K9rH+5H7B0aLeidIZ6m3FrHrNLLIH0muIe5p/tNS/YfSPRFH2Wv0g82BkabyPTL/wDMarySXBH90fYr2sf7kfsDSd0XpTn1vdi1l1LWNrMfRbX/ADTW/wBRIdG6WLLbRjV+peHttdGrhZ/Pbv8AjFdSS4I/uj7Fe3D92P2NAdD6QKjT9kr9MvFhbGm4Asa7/Mck7oXR3hjXYlZFTdlYI4bJs2/573OV9JLgj+6PsV7WP9yP+KGl+xul+u/I+zV+tZv3vjU+oC23/Pa5yi3oXR21PpbiViuwtc9saEsn0/8AM3OV9JLgj+6PsV7WP9yP2Dru0H9C6PZWyp+JW5lQc2tpGgDjveB/Weq3Wuk9MOJl5b666bnMJdlFhcWmNu/az3u9v7q2FQ666pvSMt1zDZWKzuYHbCR/xkO2f5qE4x4ZaDbt2W5MeP25+mPynp+7HT5X/9D0fori7pOK41NpJrB9JjSxrfJrHy5qvKl0b1f2Xi+tYLrPTG6wP9TcfH1vd6n9ZXU2Hyx8gsx/JH+6FJJJJy9SSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlKl1n1/wBl5P2dnqXemdjNosk/8U4Oa/8AzVdVDrrBZ0jLYbG1B1ZBseSGj+tsDnJs/ll5FZl/m5/3T4dH/9H0boQqHR8QVOc6v0xtc9oa4j+Uxrn7f85X1Q6C9j+j4j2MbW01ghjCS0f1XPLn/wCc5X02Hyx8gsxfzcP7sfyUkkknL1JJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUqPXPR/ZGX6weavTO8VkB8fyC8OYrypdac9vSspzK23OFZitzPUa7ydV+emz+WXkVmX+bn/AHT+T//S9K6T9p/ZuP8AayXZGweoSWuJP9euWO/sq2qPQ2VV9IxGU2erWKxtsDSyR/xb/c1Xk2HyjyHisx/JH+6OvF/zlJJJJy9SSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlKl1kWHpeSKrRRZ6Z22uf6Yaf3vW/wauqh1wVHpGWLi5tfpncWAOdH8lry1v8A0k2fyy8isyfzc/7p/J//0/Ruhuqf0jEdSz06zWNrC7fA8PUIbvV9U+jnIPTMb7S0sv8ATHqNLQwg/wDFtDWsVxNh8sfILMf83D+6OnD/AM1SSSScvUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSodde1nR8t7mNta2sksfO0/1vTLX/8ASV9U+rjIPTMkYri2/wBM+m4ODCD/AMY8taxNn8svIrMv83P+6fHp2f/U9G6ExrOj4jGvba0VgB7J2n+r6gY//oq+qHQzUekYhpDm1+mNosILo/lOYGtV9Nh8sfILMX83D+7H8lJJJJy9SSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlKh1xlT+kZbbn+nWazueG74Hj6YLd6vqj1x9TOkZb7merWKzuZuLJH/GN9zE2fyy8isy/zc7/AHTv5P8A/9X0joxsPS8Y21Ch5rG6prPTDT+6Kf8ABq6qXRg9vSsVtlgueKwDa1/qB3m2389XU2Hyx8gsx/JH+6FJJJJy9SSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlKp1b7T+zcj7IC7I2H02gBxJ/qWbmOVtUOvMa/o+Wx721tdWQXuBLQP5QrDn/wCa1Nn8svIrMn83P+6f6v4v/9bu+mdW6Ph9Mw6n5IrBqBYLoa8iXMl7WbmfTa5qu/tnpfrvx/tNfrV797J1Hpgut/zGtcvmJJRR9zhFcNUO+zXx+9wRr2+Go/vfLWr9Nt670d1T7m5dZrrLWvdOgL59P/P2uSf13o9dbLX5dbWWhzq3E6ENOx5H9V6+ZEkf1v8AV28d139Ir/J3X9b5r/7x+n/2r077UcP7Qz7SCQap1kD1D/0Pchs650iyt9rMut1dQabHA6APOxk/1nr5kSR/Wf1evf8AwU/r/wCp+l+9/gf+hv027rnSGVMudl1iuzcGOnQlkep/mblM9Y6YMhuN9pr9d5aG1zqS8B9f+e1y+YUkv1n9Xp3/AMJX6/8A1fT97/D/APQX6bZ13o72vczLrLam7nkHhsivd/nua1I9d6OKxacuv03OLGunQuaGue3+y17F8yJIfrf6v4o/pFf5Pb+vu/Tv7Z6X6tdP2mv1Lgw1tnVws/mdv/GT7UzetdJcbQ3KrJoa59sH6LWHY9x/qucvmNJH9Z/V/FP6/wDqf85+nP230n0fX+1V+lv9LfOm+PU2f5nuSd1rpLTUHZVYN7Wvqk/Sa87GOH9ZzV8xpJfrP6v4q/X/AOr/AOc/Tv7Z6X6tlP2mv1KQ82NnVor/AJ7d/wAXHuUR13o5rNoy6/Ta4Mc6dA5wc5jf7TWPXzIkl+s/q/ij9f8A6vr+9/gv02/rvR2NY5+XWG2t3MJPLZNe7/Pa5qmOsdMOQ7G+01+uwuDq51BYC+z/ADGtXzCkl+s/q9O/+Eoe/wBfb6fvf4b9Nt650h9T7m5dZrr2h7p0BfPp/wCftVXrHVelW9Jtabha3Jrf6TK3Brn7TseKnOa/3b/5C+bkk2XucJvh2P8AL/FW5Pf9uV+38pv5t/r/AFH/2f/tFK5QaG90b3Nob3AgMy4wADhCSU0EBAAAAAAAhhwBWgADGyVHHAFaAAMbJUccAVoAAxslRxwCAAACAAAcAigAYkZCTUQwMTAwMGFhMzAzMDAwMGFiMWYwMDAwMmY0NjAwMDBlMjQ2MDAwMDdiNDcwMDAwODM1ZTAwMDBmNTliMDAwMDE2YTQwMDAwZjZhNjAwMDAwZGFiMDAwMGUwMWMwMTAwOEJJTQQlAAAAAAAQaJHl5CvERowhuxEQa1iH0DhCSU0EOgAAAAAA5QAAABAAAAABAAAAAAALcHJpbnRPdXRwdXQAAAAFAAAAAFBzdFNib29sAQAAAABJbnRlZW51bQAAAABJbnRlAAAAAENscm0AAAAPcHJpbnRTaXh0ZWVuQml0Ym9vbAAAAAALcHJpbnRlck5hbWVURVhUAAAAAQAAAAAAD3ByaW50UHJvb2ZTZXR1cE9iamMAAAAMAFAAcgBvAG8AZgAgAFMAZQB0AHUAcAAAAAAACnByb29mU2V0dXAAAAABAAAAAEJsdG5lbnVtAAAADGJ1aWx0aW5Qcm9vZgAAAAlwcm9vZkNNWUsAOEJJTQQ7AAAAAAItAAAAEAAAAAEAAAAAABJwcmludE91dHB1dE9wdGlvbnMAAAAXAAAAAENwdG5ib29sAAAAAABDbGJyYm9vbAAAAAAAUmdzTWJvb2wAAAAAAENybkNib29sAAAAAABDbnRDYm9vbAAAAAAATGJsc2Jvb2wAAAAAAE5ndHZib29sAAAAAABFbWxEYm9vbAAAAAAASW50cmJvb2wAAAAAAEJja2dPYmpjAAAAAQAAAAAAAFJHQkMAAAADAAAAAFJkICBkb3ViQG/gAAAAAAAAAAAAR3JuIGRvdWJAb+AAAAAAAAAAAABCbCAgZG91YkBv4AAAAAAAAAAAAEJyZFRVbnRGI1JsdAAAAAAAAAAAAAAAAEJsZCBVbnRGI1JsdAAAAAAAAAAAAAAAAFJzbHRVbnRGI1B4bEBSAAAAAAAAAAAACnZlY3RvckRhdGFib29sAQAAAABQZ1BzZW51bQAAAABQZ1BzAAAAAFBnUEMAAAAATGVmdFVudEYjUmx0AAAAAAAAAAAAAAAAVG9wIFVudEYjUmx0AAAAAAAAAAAAAAAAU2NsIFVudEYjUHJjQFkAAAAAAAAAAAAQY3JvcFdoZW5QcmludGluZ2Jvb2wAAAAADmNyb3BSZWN0Qm90dG9tbG9uZwAAAAAAAAAMY3JvcFJlY3RMZWZ0bG9uZwAAAAAAAAANY3JvcFJlY3RSaWdodGxvbmcAAAAAAAAAC2Nyb3BSZWN0VG9wbG9uZwAAAAAAOEJJTQPtAAAAAAAQAEgAAAABAAIASAAAAAEAAjhCSU0EJgAAAAAADgAAAAAAAAAAAAA/gAAAOEJJTQQNAAAAAAAEAAAAHjhCSU0EGQAAAAAABAAAAB44QklNA/MAAAAAAAkAAAAAAAAAAAEAOEJJTScQAAAAAAAKAAEAAAAAAAAAAjhCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAAAAAAAAAIAAThCSU0EAgAAAAAABAAAAAA4QklNBDAAAAAAAAIBAThCSU0ELQAAAAAABgABAAAABThCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAAM3AAAABgAAAAAAAAAAAAAC0AAAA8AAAAABADEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAA8AAAALQAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAEAAAAAAABudWxsAAAAAgAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAALQAAAAAFJnaHRsb25nAAADwAAAAAZzbGljZXNWbExzAAAAAU9iamMAAAABAAAAAAAFc2xpY2UAAAASAAAAB3NsaWNlSURsb25nAAAAAAAAAAdncm91cElEbG9uZwAAAAAAAAAGb3JpZ2luZW51bQAAAAxFU2xpY2VPcmlnaW4AAAANYXV0b0dlbmVyYXRlZAAAAABUeXBlZW51bQAAAApFU2xpY2VUeXBlAAAAAEltZyAAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAAC0AAAAABSZ2h0bG9uZwAAA8AAAAADdXJsVEVYVAAAAAEAAAAAAABudWxsVEVYVAAAAAEAAAAAAABNc2dlVEVYVAAAAAEAAAAAAAZhbHRUYWdURVhUAAAAAQAAAAAADmNlbGxUZXh0SXNIVE1MYm9vbAEAAAAIY2VsbFRleHRURVhUAAAAAQAAAAAACWhvcnpBbGlnbmVudW0AAAAPRVNsaWNlSG9yekFsaWduAAAAB2RlZmF1bHQAAAAJdmVydEFsaWduZW51bQAAAA9FU2xpY2VWZXJ0QWxpZ24AAAAHZGVmYXVsdAAAAAtiZ0NvbG9yVHlwZWVudW0AAAARRVNsaWNlQkdDb2xvclR5cGUAAAAATm9uZQAAAAl0b3BPdXRzZXRsb25nAAAAAAAAAApsZWZ0T3V0c2V0bG9uZwAAAAAAAAAMYm90dG9tT3V0c2V0bG9uZwAAAAAAAAALcmlnaHRPdXRzZXRsb25nAAAAAAA4QklNBCgAAAAAAAwAAAACP/AAAAAAAAA4QklNBBQAAAAAAAQAAAAFOEJJTQQMAAAAAAsaAAAAAQAAAKAAAAB4AAAB4AAA4QAAAAr+ABgAAf/Y/+0ADEFkb2JlX0NNAAH/7gAOQWRvYmUAZIAAAAAB/9sAhAAMCAgICQgMCQkMEQsKCxEVDwwMDxUYExMVExMYEQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAQ0LCw0ODRAODhAUDg4OFBQODg4OFBEMDAwMDBERDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAB4AKADASIAAhEBAxEB/90ABAAK/8QBPwAAAQUBAQEBAQEAAAAAAAAAAwABAgQFBgcICQoLAQABBQEBAQEBAQAAAAAAAAABAAIDBAUGBwgJCgsQAAEEAQMCBAIFBwYIBQMMMwEAAhEDBCESMQVBUWETInGBMgYUkaGxQiMkFVLBYjM0coLRQwclklPw4fFjczUWorKDJkSTVGRFwqN0NhfSVeJl8rOEw9N14/NGJ5SkhbSVxNTk9KW1xdXl9VZmdoaWprbG1ub2N0dXZ3eHl6e3x9fn9xEAAgIBAgQEAwQFBgcHBgU1AQACEQMhMRIEQVFhcSITBTKBkRShsUIjwVLR8DMkYuFygpJDUxVjczTxJQYWorKDByY1wtJEk1SjF2RFVTZ0ZeLys4TD03Xj80aUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9ic3R1dnd4eXp7fH/9oADAMBAAIRAxEAPwDvOj9H6acCi59VN9z6i2zIZLg8PBZYd7w1zvUa791Wh0Lo4rdUMSsVvc1zmxoS0ODHf2d70/Q/R/ZGL6G8VemNgsgvj+X6fsV5MhCPCNBt2YceLHwR9EflHTuGg/oXR7GMrfiVllTS1gjgEl7m/wCe7cifsnpv2k5f2dn2hxJdZGpLm+m//OYdqtpI8Ef3R9i/24fuR6dP3flaDOh9IZU+luJWK7Nu9saHYd1c/wBTck/ofSH1MpdiVmuvdsbGg3ndZH9far6SXBH90fYr2se3BHtsGp+yem/aRl/Z2faGkFtkagtb6bP81g2obOhdHrY+tmJWGWtDXiOQCHtb/nt3K+klwR/dH2K9uH7kevT975mgehdHNbajiVmtjnOa2NAXBoe7+1sYpfsbpXrMv+y1+rVs9N8aj0wG1R/xe32q6klwR/dH2K9rH+5H7B0aLeidIZ6m3FrHrNLLIH0muIe5p/tNS/YfSPRFH2Wv0g82BkabyPTL/wDMarySXBH90fYr2sf7kfsDSd0XpTn1vdi1l1LWNrMfRbX/ADTW/wBRIdG6WLLbRjV+peHttdGrhZ/Pbv8AjFdSS4I/uj7Fe3D92P2NAdD6QKjT9kr9MvFhbGm4Asa7/Mck7oXR3hjXYlZFTdlYI4bJs2/573OV9JLgj+6PsV7WP9yP+KGl+xul+u/I+zV+tZv3vjU+oC23/Pa5yi3oXR21PpbiViuwtc9saEsn0/8AM3OV9JLgj+6PsV7WP9yP2Dru0H9C6PZWyp+JW5lQc2tpGgDjveB/Weq3Wuk9MOJl5b666bnMJdlFhcWmNu/az3u9v7q2FQ666pvSMt1zDZWKzuYHbCR/xkO2f5qE4x4ZaDbt2W5MeP25+mPynp+7HT5X/9D0fori7pOK41NpJrB9JjSxrfJrHy5qvKl0b1f2Xi+tYLrPTG6wP9TcfH1vd6n9ZXU2Hyx8gsx/JH+6FJJJJy9SSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlKl1n1/wBl5P2dnqXemdjNosk/8U4Oa/8AzVdVDrrBZ0jLYbG1B1ZBseSGj+tsDnJs/ll5FZl/m5/3T4dH/9H0boQqHR8QVOc6v0xtc9oa4j+Uxrn7f85X1Q6C9j+j4j2MbW01ghjCS0f1XPLn/wCc5X02Hyx8gsxfzcP7sfyUkkknL1JJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUqPXPR/ZGX6weavTO8VkB8fyC8OYrypdac9vSspzK23OFZitzPUa7ydV+emz+WXkVmX+bn/AHT+T//S9K6T9p/ZuP8AayXZGweoSWuJP9euWO/sq2qPQ2VV9IxGU2erWKxtsDSyR/xb/c1Xk2HyjyHisx/JH+6OvF/zlJJJJy9SSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlKl1kWHpeSKrRRZ6Z22uf6Yaf3vW/wauqh1wVHpGWLi5tfpncWAOdH8lry1v8A0k2fyy8isyfzc/7p/J//0/Ruhuqf0jEdSz06zWNrC7fA8PUIbvV9U+jnIPTMb7S0sv8ATHqNLQwg/wDFtDWsVxNh8sfILMf83D+6OnD/AM1SSSScvUkkkkpSSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSodde1nR8t7mNta2sksfO0/1vTLX/8ASV9U+rjIPTMkYri2/wBM+m4ODCD/AMY8taxNn8svIrMv83P+6fHp2f/U9G6ExrOj4jGvba0VgB7J2n+r6gY//oq+qHQzUekYhpDm1+mNosILo/lOYGtV9Nh8sfILMX83D+7H8lJJJJy9SSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlKh1xlT+kZbbn+nWazueG74Hj6YLd6vqj1x9TOkZb7merWKzuZuLJH/GN9zE2fyy8isy/zc7/AHTv5P8A/9X0joxsPS8Y21Ch5rG6prPTDT+6Kf8ABq6qXRg9vSsVtlgueKwDa1/qB3m2389XU2Hyx8gsx/JH+6FJJJJy9SSSSSlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSSSSlKp1b7T+zcj7IC7I2H02gBxJ/qWbmOVtUOvMa/o+Wx721tdWQXuBLQP5QrDn/wCa1Nn8svIrMn83P+6f6v4v/9bu+mdW6Ph9Mw6n5IrBqBYLoa8iXMl7WbmfTa5qu/tnpfrvx/tNfrV797J1Hpgut/zGtcvmJJRR9zhFcNUO+zXx+9wRr2+Go/vfLWr9Nt670d1T7m5dZrrLWvdOgL59P/P2uSf13o9dbLX5dbWWhzq3E6ENOx5H9V6+ZEkf1v8AV28d139Ir/J3X9b5r/7x+n/2r077UcP7Qz7SCQap1kD1D/0Pchs650iyt9rMut1dQabHA6APOxk/1nr5kSR/Wf1evf8AwU/r/wCp+l+9/gf+hv027rnSGVMudl1iuzcGOnQlkep/mblM9Y6YMhuN9pr9d5aG1zqS8B9f+e1y+YUkv1n9Xp3/AMJX6/8A1fT97/D/APQX6bZ13o72vczLrLam7nkHhsivd/nua1I9d6OKxacuv03OLGunQuaGue3+y17F8yJIfrf6v4o/pFf5Pb+vu/Tv7Z6X6tdP2mv1Lgw1tnVws/mdv/GT7UzetdJcbQ3KrJoa59sH6LWHY9x/qucvmNJH9Z/V/FP6/wDqf85+nP230n0fX+1V+lv9LfOm+PU2f5nuSd1rpLTUHZVYN7Wvqk/Sa87GOH9ZzV8xpJfrP6v4q/X/AOr/AOc/Tv7Z6X6tlP2mv1KQ82NnVor/AJ7d/wAXHuUR13o5rNoy6/Ta4Mc6dA5wc5jf7TWPXzIkl+s/q/ij9f8A6vr+9/gv02/rvR2NY5+XWG2t3MJPLZNe7/Pa5qmOsdMOQ7G+01+uwuDq51BYC+z/ADGtXzCkl+s/q9O/+Eoe/wBfb6fvf4b9Nt650h9T7m5dZrr2h7p0BfPp/wCftVXrHVelW9Jtabha3Jrf6TK3Brn7TseKnOa/3b/5C+bkk2XucJvh2P8AL/FW5Pf9uV+38pv5t/r/AFH/2ThCSU0EIQAAAAAAVQAAAAEBAAAADwBBAGQAbwBiAGUAIABQAGgAbwB0AG8AcwBoAG8AcAAAABMAQQBkAG8AYgBlACAAUABoAG8AdABvAHMAaABvAHAAIABDAFMANgAAAAEAOEJJTQQGAAAAAAAHAAgBAQABAQD/4Q6BaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiBwaG90b3Nob3A6TGVnYWN5SVBUQ0RpZ2VzdD0iRUVGOTc5OTg3Mjk2OTI1NUNGNDM4QTFDNkNGRTE3MjMiIHBob3Rvc2hvcDpJbnN0cnVjdGlvbnM9IkZCTUQwMTAwMGFhMzAzMDAwMGFiMWYwMDAwMmY0NjAwMDBlMjQ2MDAwMDdiNDcwMDAwODM1ZTAwMDBmNTliMDAwMDE2YTQwMDAwZjZhNjAwMDAwZGFiMDAwMGUwMWMwMTAwIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0iYzIiIHhtcE1NOkRvY3VtZW50SUQ9IjVDOEI1Q0MwRDgwMjhCRkNBMkVGN0EzMUFDQTlFOENGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZDNjNGMzQ2OUI2OEU5MTE4QTkyOTNCMjI2NkEyQkYzIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9IjVDOEI1Q0MwRDgwMjhCRkNBMkVGN0EzMUFDQTlFOENGIiBkYzpmb3JtYXQ9ImltYWdlL2pwZWciIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA0LTI3VDA4OjQ1OjExKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNC0yN1QxMToxOTozMyswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wNC0yN1QxMToxOTozMyswODowMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOkRBQzgzQzEzOTc2OEU5MTE4M0ZBOTlGMzYyMDI3N0Q2IiBzdEV2dDp3aGVuPSIyMDE5LTA0LTI3VDEwOjQ5OjI4KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6RkM2M0YzNDY5QjY4RTkxMThBOTI5M0IyMjY2QTJCRjMiIHN0RXZ0OndoZW49IjIwMTktMDQtMjdUMTE6MTk6MzMrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+ICHElDQ19QUk9GSUxFAAEBAAACDGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKZGVzYwAAAPwAAABeY3BydAAAAVwAAAALd3RwdAAAAWgAAAAUYmtwdAAAAXwAAAAUclhZWgAAAZAAAAAUZ1hZWgAAAaQAAAAUYlhZWgAAAbgAAAAUclRSQwAAAcwAAABAZ1RSQwAAAcwAAABAYlRSQwAAAcwAAABAZGVzYwAAAAAAAAADYzIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdGV4dAAAAABGQgAAWFla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';
		
		var d = new Date();
		var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		
		var doc = new jsPDF({
			orientation: 'portrait',
			unit: 'pt',
			format: [612, 792]
		});	
		var doc = new jsPDF('p','mm','legal');
		
		// X-axis, Y-axis, width, height 
		doc.addImage(photo, 'PNG', 125, 15, 83, 75);
		doc.addImage(green, 'PNG', 34, 25, 37, 7);
		doc.addImage(green, 'PNG', 98, 25, 20, 7);
		doc.addImage(green, 'PNG', 98, 70, 20, 14);
		
		// doc.addImage(grid, 'PNG', 35, 33, 36, 7);
		// doc.addImage(grid, 'PNG', 21, 41, 36, 7);
		// doc.addImage(grid, 'PNG', 36, 49, 36, 7);
		
		doc.page=2;
		
		var footer = function(){
			doc.text(195,350, 'page ' + doc.page);
			doc.page ++;
		};
			
		doc.setFontSize(11)
		doc.setFont('times');
		doc.setFontType('bold');
		//X-axis, Y-axis
		doc.text(10, 10, 'TARA DESIGN (PHILS). INC COSTSHEET');
		
		doc.setFontSize(10)
		doc.setFont('times');
		doc.setFontType('normal');
		//X-axis, Y-axis
		doc.text(10, 20, 'ARTICLE NO.');
		
		doc.text(10, 30, 'DESCRIPTION: '+article.description);
		
		doc.text(10, 38, 'DESIGN NAME: '+article.design_name);
		doc.text(36, 38, '___________________');
		
		doc.text(10, 46, 'DATE: '+article.date);
		doc.text(21, 46, '____________________________');
		
		doc.text(10, 54, 'PATTERN DATE: '+article.pattern_date);
		doc.text(37, 54, '__________________');
		
		doc.text(10, 62, 'CUSTOMER: '+article.customer);
		doc.text(31, 62, '_____________________');
	
		doc.text(10, 70, 'DESIRED SIZE (cm): '+article.desired_size);
		doc.text(42, 70, '_______________');
		
		doc.text(10, 78, 'FULL WIDTH of');
		
		doc.text(10, 83, 'Desired Size (cm): '+article.full_width_desired_size);
		doc.text(37, 83, '______________');
		
		doc.text(73, 30, 'COLOR #: ');
		doc.text(100, 30, ''+article.color);
		
		doc.text(73, 38, 'RAW SIZE (cm): '+article.raw_size);
		doc.text(99, 38, '___________');
		
		doc.text(73, 46, 'ESTIMATE: '+article.estimate);
		doc.text(99, 46, '___________');
		
		doc.text(71, 54, 'Final Raw Size (if');
		doc.text(73, 57.5, 'w/ revisions): ');
		doc.text(100, 57.5, ''+article.final_raw_size);
		doc.text(99, 57.5, '___________');
		
		doc.text(71, 63, 'FULL WIDTH of');
		doc.text(73, 67.5, 'Fabric (cm): ');
		doc.text(100, 67.5, ''+article.full_width_fabric);
		doc.text(99, 67.5, '___________');
		
		doc.text(65, 75, 'FINISHED SIZE (cm):');
		doc.text(65, 83, 'SHRINKAGE %:');
		
		doc.text(100, 75, ''+article.finished_size);
		doc.text(100, 83, ''+article.shrinkage);
		
		doc.setFontSize(12)
		doc.setFont('times');
		doc.setFontType('normal');
		doc.text(195, 350, 'page 1');
		
		doc.setFontSize(11)
		doc.setFont('times');
		doc.setFontType('bold');
		doc.text(6, 350, 'PROCESS BY: '+article.process_by);
		doc.text(95, 350, 'Program/Pattern by: '+article.pattern_by.fullname);
		
		doc.setFontSize(15)
		doc.setFont('times');
		doc.setFontType('bold');
		doc.text(40, 20, ''+article.article_no+' / '+article.article_no_revision);
		
		doc.setFontSize(10)
		doc.setFont('times');
		doc.setFontType('normal');
		doc.text(130, 10, 'DESIGN SKETCH & SPECIAL INSTRUCTION/S');
		
		doc.setDrawColor(0,0,0);
		doc.rect(125, 15, 83, 75); // filled square with borders
		
		doc.setDrawColor(255,0,0);
		doc.rect(4, 344, 89, 9); // filled square with red borders
		doc.rect(94, 344, 89, 9); // filled square with red borders
		
		doc.setFontSize(11);
		doc.setFont('times');
		doc.setFontType('normal');
		
		doc.text(10, 98, 'FABRIC CONSUMPTION');
		
		angular.forEach(article.datas, function(data,i) {
	
			var header = ["#","DESCRIPTION","QUALITY","QTY","DIMENSION(cm)","FABRIC","LANDED COST","COST (USD)"];
			
		
			var rows = [
				{"4": "W x L","5": "Consumption (m²)","6": "m² (USD)"},
			];
			
			var top_th = 132;
			var title_th = 130 ;
			var fabric_total = 126;
			
			angular.forEach(article.datas.fabrics, function(fab,key) {
				
				var row = [];
				row.push(key+1);
				row.push(fab.description);
				row.push(fab.quality);
				row.push(fab.qty);
				row.push(fab.dimension);
				row.push(fab.fabric_m);
				row.push(fab.landed_cost);
				row.push(fab.cost);
				
				rows.push(row);
				
				if(key==0) {
					top_th+=10;
					title_th+=10;
				} else {
					top_th+=10;
					title_th+=10;
				};
				
			});
			
			doc.autoTable(header, rows,{
				theme: 'striped',
				margin: {
					top: 100, 
					left: 10 
				},
				tableWidth: 500,
				styles: {
					lineColor: [75, 75, 75],
					lineWidth: 0.50,
					cellPadding: 3,
					overflow: 'linebreak',
					columnWidth: 25,
					
				},
				headerStyles: {
					halign: 'center',
					fillColor: [191, 191, 191],
					textColor: 50,
					fontSize: 7
				},
				bodyStyles: {
					halign: 'center',
					fillColor: [255, 255, 255],
					textColor: 50,
					fontSize: 7
				},
				alternateRowStyles: {
					fillColor: [255, 255, 255]
				}
				
			});
			
			// doc.addPage();
			
			doc.setFontSize(11);
			doc.setFont('times');
			doc.setFontType('normal');
			doc.text(10, title_th, 'THREADS CONSUMPTION');
			
			var header_th = ["#","DESCRIPTION","COMBINATION","INITIAL WT. - NET WT.","TOTAL","LANDED","COST (USD)"];
			
			var rows_th = [
				{"2": "QUALITY - COLOR","3": "(In grams) - (In grams)","4": "WEIGHT (g)","5": "COST (USD)"},
			];	
			
			var top_ac = top_th+40;
			var fabric_total = top_th-6;
			var fabric_box = top_th-11;
			
			doc.setFontSize(11);
			doc.setFont('times');
			doc.setFontType('normal');
			
			doc.text(155, fabric_total, 'Fabric Total: '+article.grandtotal.total_fabric.total);
			
			doc.setDrawColor(0,0,0);
			doc.rect(154, fabric_box, 56, 8); // filled square with borders
			
			var title_ac = top_th+38;
			
			angular.forEach(article.datas.threads, function(thread,t) {
				
				var row = [];
				row.push(t+1);
				row.push(thread.description);
				row.push(thread.combination);
				row.push(thread.intial_net);
				row.push(thread.total_weight);
				row.push(thread.landed_cost);
				row.push(thread.cost);
				
				rows_th.push(row);
				
				if(t==0) {
					top_ac+=5;
					title_ac+=5;
				} else {
					top_ac+=10;
					title_ac+=10;
				};
				
			});
			
			doc.autoTable(header_th, rows_th,{
				theme: 'striped',
				margin: {
					top: top_th, 
					left: 10 
				},
				tableWidth: 500,
				styles: {
					lineColor: [75, 75, 75],
					lineWidth: 0.50,
					cellPadding: 3,
					overflow: 'linebreak',
					columnWidth: 28.5,
					
				},
				headerStyles: {
					halign: 'center',
					fillColor: [191, 191, 191],
					textColor: 50,
					fontSize: 7
				},
				bodyStyles: {
					halign: 'center',
					fillColor: [255, 255, 255],
					textColor: 50,
					fontSize: 7
				},
				alternateRowStyles: {
					fillColor: [255, 255, 255]
				}
			});
			
			doc.setFontSize(11);
			doc.setFont('times');
			doc.setFontType('normal');
			doc.text(10, title_ac, 'ACCESSORY CONSUMPTION');
			
			var header_ac = ["#","ITEM","COLOR","SIZE (with Unit)","CONSUMPTION(with Unit)","LANDED COST (USD)","COST (USD)"];
			
			var thread_total = title_ac-4;
			var accessory_total = title_ac+21;
			
			var thread_box = title_ac-9;
			var accessory_box = accessory_total-5;
	
			doc.setFontSize(11);
			doc.setFont('times');
			doc.setFontType('normal');
			
			doc.text(155, thread_total, 'Threads Total: '+article.grandtotal.total_thread.total);
			
			doc.setDrawColor(0,0,0);
			doc.rect(154, thread_box, 56, 8); // filled square with borders
			
			var labor_total = 180;
			
			var rows_ac = [];	
			
			angular.forEach(article.datas.accessories, function(acc,a) {
				
				var row = [];
				row.push(a+1);
				row.push(acc.item);
				row.push(acc.color);
				row.push(acc.size);
				row.push(acc.consumption);
				row.push(acc.landed_cost);
				row.push(acc.cost);
				
				rows_ac.push(row);
				
				if(a==0) {
					accessory_total+=10;
					accessory_box+=10;
				} else {
					accessory_total+=10;
					accessory_box+=10;
				};
				
			});
			
			doc.setFontSize(11);
			doc.setFont('times');
			doc.setFontType('normal');
			doc.text(155, accessory_total, 'Accessory Total: '+article.grandtotal.total_accessory.total);
			
			doc.setDrawColor(0,0,0);
			doc.rect(154, accessory_box, 56, 8); // filled square with borders
			
			doc.autoTable(header_ac, rows_ac,{
				theme: 'striped',
				margin: {
					top: top_ac, 
					left: 10 
				},
				tableWidth: 500,
				styles: {
					lineColor: [75, 75, 75],
					lineWidth: 0.50,
					cellPadding: 3,
					overflow: 'linebreak',
					columnWidth: 28.5,
					
				},
				headerStyles: {
					halign: 'center',
					fillColor: [191, 191, 191],
					textColor: 50,
					fontSize: 7
				},
				bodyStyles: {
					halign: 'center',
					fillColor: [255, 255, 255],
					textColor: 50,
					fontSize: 7
				},
				alternateRowStyles: {
					fillColor: [255, 255, 255]
				}
			});
			
		});
		
		doc.addPage();	
		footer();
		
		var top_labor = 10;
		var laborTotal = 45;
		var laborBox = 40;
		
		var grandtitle = 65;
		var grandtotal = 60;
					
		doc.setFontSize(11);
		doc.setFont('times');
		doc.setFontType('normal');
		doc.text(2, top_labor, 'LABOR CONSUMPTION');
		
		// var header_labor = ["DEPARTMENT","PROCESS","SPECIAL INSTRUCTION/S","OPERATOR","APPROVED TIME","TL","ACTUAL TIME"];
		
			var header_labor = [
				{title: "DEPARTMENT", dataKey: "1"},
				{title: "PROCESS", dataKey: "2"},
				{title: "SPECIAL INSTRUCTION/S", dataKey: "3"},
				{title: "OPERATOR", dataKey: "4"},
				{title: "APPROVED TIME", dataKey: "5"},
				{title: "ACTUAL TIME", dataKey: "6"},
				{title: "MULTIPLIER", dataKey: "7"},
				{title: "COST (USD)", dataKey: "8"},
			];
			
			var rows_labor = [
				{"5": "(min)","6": "Hour - Min - Sec"},
			
			];
						
			angular.forEach(article.datas.labors, function(labor,l) {
				
				var row = [];
				row.push(labor.department);
				row.push(labor.process);
				row.push(labor.special_instruction);
				row.push(labor.operator);
				row.push(labor.approved_time);
				row.push(labor.tl_min);
				row.push(labor.time);
				row.push(labor.multiplier);
				row.push(labor.cost);
				
				rows_labor.push(row);
				
				if(l==0) {
					laborTotal+=10;
					laborBox+=10;
					grandtitle+=10;
					grandtotal+=10;
				} else {
					laborTotal+=10;
					laborBox+=10;
					grandtitle+=10;
					grandtotal+=10;
				};
				
			});

			doc.setFontSize(11);
			doc.setFont('times');
			doc.setFontType('bold');
			doc.text(155, laborTotal, 'Labor Total: '+article.grandtotal.total_labor.total);
			doc.setDrawColor(0,0,0);
			doc.rect(154, laborBox, 56, 8); // filled square with borders
			
			doc.text(155, grandtitle, 'Grand Total Cost: '+article.grandtotal.final_total);
			doc.setDrawColor(0,0,0);
			doc.rect(154, grandtotal, 56, 8); // filled square with borders
				
			doc.autoTable(header_labor, rows_labor,{
				theme: 'striped',
				margin: {
					top: 12, 
					left: 2 
				},
				tableWidth: 500,
				styles: {
					lineColor: [75, 75, 75],
					lineWidth: 0.50,
					cellPadding: 3,
					overflow: 'linebreak',
					columnWidth: 21.5,
					
				},
				columnStyles: {
					1: {columnWidth: 22},
					3: {columnWidth: 60},
				},
				headerStyles: {
					halign: 'center',
					fillColor: [191, 191, 191],
					textColor: 50,
					fontSize: 7
				},
				bodyStyles: {
					halign: 'center',
					fillColor: [255, 255, 255],
					textColor: 50,
					fontSize: 7
				},
				alternateRowStyles: {
					fillColor: [255, 255, 255]
				}
			});
 
		/* //column 1
		doc.setFontSize(13)
		doc.setFont('default');
		doc.setFontType('normal');
		doc.setFont('times');
		doc.text(5, 55, 'Case No/s: ');
		doc.text(48, 61.5, months[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear());
		doc.text(5, 62, 'Date of this Report: ');
		doc.text(5, 72, 'Name:'); */

			var blob = doc.output('blob');
			window.open(URL.createObjectURL(blob));
		
		
		};
		
		
	};
	
	return new app();
	
}).directive('fileModel', ['$parse', function ($parse) {
	return {
	   restrict: 'A',
	   link: function(scope, element, attrs) {
		  var model = $parse(attrs.fileModel);
		  var modelSetter = model.assign;
		  
		  element.bind('change', function() {
			 scope.$apply(function(){
				modelSetter(scope, element[0].files[0]);
			 });
		  });

	   }
	};
}]).service('fileUpload', ['$http', function ($http,imageLoad) {
	
	this.uploadFileToUrl = function(file, uploadUrl, scope) {
		
	   var fd = new FormData();
	   fd.append('file', file);

        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.open("POST", uploadUrl);
        scope.progressVisible = true;
        xhr.send(fd);
	   
		// upload progress
		function uploadProgress(evt) {
			scope.views.showProPicUploadProgress = true;
			scope.$apply(function(){
				scope.views.progress = 0;			
				if (evt.lengthComputable) {
					scope.views.progress = Math.round(evt.loaded * 100 / evt.total);
				} else {
					scope.views.progress = 'unable to compute';
					scope.views.profilePicture = "pictures/default.png";					
				}
			});
		}

		function uploadComplete(evt) {
			/* This event is raised when the server send back a response */
			scope.$apply(function() {
				
				scope.views.profilePicture = 'pictures/'+scope.article.id+'.jpg';
				imageLoad.go(scope,scope.article.id);
				scope.views.showProPicUploadProgress = false;

			});			

			$('#proPic').val(null);
		}

	}
	
}]).service('imageLoad', function() {
	
	this.go = function(scope,id) {
		
		$.ajax({
			type: 'GET',
			url: 'pictures/'+id+'.jpg',
			success: function (data) {

				scope.views.profilePicture = 'pictures/'+id+'.jpg';
				console.log('Image is jpg');
				console.log(scope.views.profilePicture);

			},
			error: function (data) {

				scope.views.profilePicture = 'pictures/'+id+'.png';
				console.log('Image is png');

			}
		});				
		
	};	
	
});
