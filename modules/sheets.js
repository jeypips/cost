angular.module('app-module',['bootstrap-modal','bootstrap-growl','block-ui','ui.bootstrap']).factory('app', function($compile,$window,$timeout,$http,bootstrapModal,growl,bui,fileUpload) {
	
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
			
			if (scope.controls.ok.label == 'Save') {
			
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
			
			} else { // Update
				
				$http({
				  method: 'POST',
				  url: 'handlers/sheets/save-update.php',
				  data: {article: scope.article}
				  
				}).then(function mySucces(response) {
					
					scope.article.id = response.data;					
					growl.show('btn btn-default',{from: 'top', amount: 55},'Account Information successfully revised.');										
					mode(scope,scope.article);						

				}, function myError(response) {
					 
				  // error
					
				});				
				
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
			
		var d = new Date();
		var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	
		var doc = new jsPDF({
			orientation: 'portrait',
			unit: 'pt',
			format: [612, 792]
		});	
		var doc = new jsPDF('p','mm','legal');
			
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
		
		
		doc.text(10, 30, 'DESCRIPTION');
		doc.text(10, 38, 'DESIGN NAME');
		doc.text(10, 46, 'DATE');
		doc.text(10, 54, 'PATTERN DATE');
		doc.text(10, 62, 'CUSTOMER');
		doc.text(10, 70, 'DESIRED SIZE (cm)');
		doc.text(10, 78, 'FULL WIDTH of ');
		doc.text(10, 83, 'Desired Size (cm) ');
		
		doc.text(73, 30, 'COLOR #');
		
		doc.text(73, 38, 'RAW SIZE (cm)');
		doc.text(73, 46, 'ESTIMATE');
		
		doc.text(73, 54, 'Final Raw Size (if');
		doc.text(73, 57.5, 'w/ revisions)');
		
		doc.text(73, 63, 'FULL WIDTH of');
		doc.text(73, 67.5, 'Fabric (cm)');
		
		doc.text(73, 75, 'FINISHED SIZE (cm)');
		doc.text(73, 83, 'SHRINKAGE %');
		
		doc.setFontSize(15)
		doc.setFont('times');
		doc.setFontType('bold');
		doc.text(40, 20, ''+article.article_no+' / '+article.article_no_revision);
		
		doc.setFontSize(11)
		doc.setFont('times');
		doc.setFontType('bold');
		//X-axis, Y-axis
		doc.text(35, 30, ''+article.description.name);
		doc.text(35, 38, ''+article.design_name);
		doc.text(35, 46, ''+article.date);
		doc.text(35, 54, ''+article.pattern_date);
		doc.text(35, 62, ''+article.customer);
		doc.text(35, 70, ''+article.desired_size);
		doc.text(35, 78, ''+article.full_width_desired_size);
		
		
		doc.setDrawColor(0,0,0);
		doc.rect(130, 10, 83, 75); // filled square with red borders
		
		doc.setFontSize(11)
		doc.setFont('times');
		doc.setFontType('normal');
		doc.text(10, 98, 'FABRIC CONSUMPTION');
		
		var header = ["#","DESCRIPTION","QUALITY","COLOR","QTY","DIMENSION(cm)","FABRIC","LANDED COST"];
		
		var header = [
			{title: "#", dataKey: "1"},
			{title: "DESCRIPTION", dataKey: "2"},
			{title: "QUALITY", dataKey: "3"},
			{title: "COLOR", dataKey: "4"},
			{title: "QTY", dataKey: "5"},
			{title: "DIMENSION(cm)", dataKey: "6"},
			{title: "FABRIC", dataKey: "7"},
			{title: "LANDED COST<br>asd", dataKey: "8"},
			{title: "COST (USD)", dataKey: "9"},
		];
		var rows = [
			{"6": "W x L","7": "Consumption (m²)","8": "m² (USD)"},
		
		];	
			
	
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
					columnWidth: 'wrap',
					
				},
				headerStyles: {
					halign: 'center',
					fillColor: [191, 191, 191],
					textColor: 50,
					fontSize: 8
				},
				bodyStyles: {
					halign: 'center',
					fillColor: [255, 255, 255],
					textColor: 50,
					fontSize: 8
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
}]).service('fileUpload', ['$http', function ($http) {
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
					scope.views.profilePicture = "img/avatar.png";					
				}
			});
		}

		function uploadComplete(evt) {
			/* This event is raised when the server send back a response */
			scope.$apply(function() {

				scope.views.profilePicture = 'pictures/'+scope.article.id+'.jpg';
				scope.views.showProPicUploadProgress = false;

			});			

			$('#proPic').val(null);
		}

	}
}]);
