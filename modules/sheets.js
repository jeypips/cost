angular.module('app-module',['bootstrap-modal','bootstrap-growl','block-ui','ui.bootstrap',,'module-access']).factory('app', function($compile,$window,$timeout,$http,bootstrapModal,growl,bui,fileUpload,access,imageLoad) {
	
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
			
			if (!access.has(scope,scope.profile.groups,scope.module.id,scope.module.privileges.edit)) return;
			
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
						
						growl.show('btn btn-default',{from: 'top', amount: 55},'Sheet Information successfully added.');
							
						}	else{
							growl.show('btn btn-default',{from: 'top', amount: 55},'Sheet Information successfully updated.');
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
					growl.show('btn btn-default',{from: 'top', amount: 55},'Sheet Information successfully revised.');										
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
			
			if (!access.has(scope,scope.profile.groups,scope.module.id,scope.module.privileges.add)) return;
			
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
					
					imageLoad.go(scope,response.data.id);
					
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
		
		var photo = article.picture;
		
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
		
		doc.text(10, 30, 'DESCRIPTION: '+article.description.name);
		doc.text(10, 38, 'DESIGN NAME: '+article.design_name);
		doc.text(10, 46, 'DATE: '+article.date);
		doc.text(10, 54, 'PATTERN DATE: '+article.pattern_date);
		doc.text(10, 62, 'CUSTOMER: '+article.customer);
		doc.text(10, 70, 'DESIRED SIZE (cm): '+article.desired_size);
		doc.text(10, 78, 'FULL WIDTH of');
		doc.text(10, 83, 'Desired Size (cm): '+article.full_width_desired_size);
		
		doc.text(73, 30, 'COLOR #: '+article.color);
		
		doc.text(73, 38, 'RAW SIZE (cm): '+article.raw_size);
		doc.text(73, 46, 'ESTIMATE: '+article.estimate);
		
		doc.text(73, 54, 'Final Raw Size (if');
		doc.text(75, 57.5, 'w/ revisions): '+article.final_raw_size);
		
		doc.text(73, 63, 'FULL WIDTH of');
		doc.text(75, 67.5, 'Fabric (cm): '+article.full_width_fabric);
		
		doc.text(73, 75, 'FINISHED SIZE (cm): '+article.finished_size);
		doc.text(73, 83, 'SHRINKAGE %: '+article.shrinkage);
		
		doc.setFontSize(12)
		doc.setFont('times');
		doc.setFontType('normal');
		doc.text(195, 350, 'page 1');
		
		doc.setFontSize(15)
		doc.setFont('times');
		doc.setFontType('normal');
		doc.text(80, 350, 'PROCESS BY: '+article.process_by.fullname);
		
		doc.setFontSize(15)
		doc.setFont('times');
		doc.setFontType('bold');
		doc.text(40, 20, ''+article.article_no+' / '+article.article_no_revision);
		
		doc.setFontSize(10)
		doc.setFont('times');
		doc.setFontType('normal');
		doc.text(130, 10, 'DESIGN SKETCH & SPECIAL INSTRUCTION/S');
		
		doc.setDrawColor(0,0,0);
		doc.rect(125, 15, 83, 75); // filled square with red borders
		
		doc.setFontSize(11);
		doc.setFont('times');
		doc.setFontType('normal');
		doc.text(10, 98, 'FABRIC CONSUMPTION');
		
		angular.forEach(article.datas, function(data,i) {
			
			// console.log(i);
			var header = ["#","DESCRIPTION","QUALITY","QTY","DIMENSION(cm)","FABRIC","LANDED COST","COST (USD)"];
			
			var rows = [
				{"4": "W x L","5": "Consumption (m²)","6": "m² (USD)"},
			
			];	
			
			var top_th = 100;
			var title_th = 98;
			
			angular.forEach(article.datas.fabrics, function(fab,key) {
				
				var row = [];
				row.push(key+1);
				row.push(fab.description.name);
				row.push(fab.quality);
				row.push(fab.qty);
				row.push(fab.dimension);
				row.push(fab.fabric_m);
				row.push(fab.landed_cost);
				row.push(fab.cost);
				
				rows.push(row);
				
				if(key==0) {
					top_th+=35;
					title_th+=35;
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
			
			// doc.addPage();
			
			doc.setFontSize(11);
			doc.setFont('times');
			doc.setFontType('normal');
			doc.text(10, title_th, 'THREADS CONSUMPTION');
			
			var header_th = ["#","DESCRIPTION","COMBINATION","INITIAL WT. - NET WT.","TOTAL","LANDED","COST (USD)"];
			
			var rows_th = [
				{"2": "QUALITY - COLOR","3": "(In grams) - (In grams)","4": "WEIGHT (g)","5": "COST (USD)"},
			
			];	
			
			var top_ac = 172;
			var title_ac = 170;
			
			if(top_th==145){
				
				top_ac+=10;
				title_ac+=10;
				
			}else if (top_th==155){
				
				top_ac+=20;
				title_ac+=20;
				
			}else if (top_th==165){
				
				top_ac+=30;
				title_ac+=30;
				
			}else if (top_th==175){
				
				top_ac+=40;
				title_ac+=40;
		
			}else if (top_th==185){
				
				top_ac+=50;
				title_ac+=50;
		
			}else if (top_th==195){
				
				top_ac+=60;
				title_ac+=60;
		
			}else if (top_th==205){
				
				top_ac+=70;
				title_ac+=70;
		
			}else if (top_th==215){
				
				top_ac+=80;
				title_ac+=80;
		
			}else if (top_th==225){
				
				top_ac+=90;
				title_ac+=90;
		
			}else if (top_th==235){
				
				top_ac+=100;
				title_ac+=100;
		
			}else if (top_th==245){
				
				top_ac+=110;
				title_ac+=110;
		
			}else if (top_th==255){
				
				top_ac+=120;
				title_ac+=120;
		
			}else if (top_th==265){
				
				top_ac+=130;
				title_ac+=130;
		
			}else if (top_th==275){
				
				top_ac+=140;
				title_ac+=140;
		
			};
			
			
			
			angular.forEach(article.datas.threads, function(thread,t) {
				
				var row = [];
				row.push(t+1);
				row.push(thread.description.name);
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
			
			console.log(top_ac);
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
					columnWidth: 'wrap',
					
				},
				headerStyles: {
					halign: 'center',
					fillColor: [191, 191, 191],
					textColor: 50,
					fontSize: 9
				},
				bodyStyles: {
					halign: 'center',
					fillColor: [255, 255, 255],
					textColor: 50,
					fontSize: 9
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
			
			var rows_ac = [];	
			
			var top_labor = 169;
			var title_labor = 167;
			
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
					top_labor+=30;
					title_labor+=30;
				} else {
					top_labor+=15;
					title_labor+=15;
				};
				
			});
			
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
					columnWidth: 'wrap',
					
				},
				headerStyles: {
					halign: 'center',
					fillColor: [191, 191, 191],
					textColor: 50,
					fontSize: 9
				},
				bodyStyles: {
					halign: 'center',
					fillColor: [255, 255, 255],
					textColor: 50,
					fontSize: 9
				},
				alternateRowStyles: {
					fillColor: [255, 255, 255]
				}
			});
			
		});
		
		doc.addPage();	
		footer();
		
		doc.setFontSize(11);
			doc.setFont('times');
			doc.setFontType('normal');
			doc.text(10, 10, 'LABOR CONSUMPTION');
			
			var header_labor = ["DEPARTMENT","PROCESS","SPECIAL INSTRUCTION/S","OPERATOR","APPROVED TIME","TL","ACTUAL TIME"];
			
			var rows_labor = [
				{"5": "(min)","6": "Hour - Min - Sec"},
			
			];				
			
			angular.forEach(article.datas.labors, function(labor,l) {
				
				var row = [];
				row.push(labor.department.name);
				row.push(labor.process);
				row.push(labor.special_instruction);
				row.push(labor.operator);
				row.push(labor.approved_time);
				row.push(labor.tl_min);
				row.push(labor.time);
				
				rows_labor.push(row);
				
			});
			
			doc.autoTable(header_labor, rows_labor,{
				theme: 'striped',
				margin: {
					top: 12, 
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
					fontSize: 9
				},
				bodyStyles: {
					halign: 'center',
					fillColor: [255, 255, 255],
					textColor: 50,
					fontSize: 9
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
					scope.views.profilePicture = "img/avatar.png";					
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
			url: 'pictures/'+id+'.png',
			success: function (data) {

				scope.views.profilePicture = 'pictures/'+id+'.png';
				console.log('Image is png');

			},
			error: function (data) {

				scope.views.profilePicture = 'pictures/'+id+'.jpg';
				console.log('Image is jpg');

			}
		});				
		
	};	
	
});
