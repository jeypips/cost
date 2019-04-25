<?php include_once 'authentication.php'; ?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="A fully featured admin theme which can be used to build CRM, CMS, etc.">
		<meta name="author" content="Coderthemes">

		<link rel="shortcut icon" href="assets/images/logo.png">

		<title>Profile - Cost Sheet System</title>
		
		<!-- DataTables -->
        <link href="assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />

		<link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/core.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/components.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/icons.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/pages.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/responsive.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/switch.css" rel="stylesheet" type="text/css" />

        <!-- HTML5 Shiv and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->

        <script src="assets/js/modernizr.min.js"></script>

	</head>
	<style type="text/css">
		.img-circle {
			width: 50px;			
		}
		.not-active {
			pointer-events: none;
			cursor: default;
		}
	</style>
	<body class="fixed-left" ng-app="profileSetting" ng-controller="profileSettingCtrl" account-profile>

		<!-- Begin page -->
		<div id="wrapper">

            <!-- Top Bar Start -->
            <div class="topbar">

                <!-- LOGO -->
                <div class="topbar-left">
                    <div class="text-center">
                        <a href="index.php" class="logo"><img class="img-circle" src="assets/images/logo.png" alt="Logo"><span>Cost Sheet</span></a>
                    </div>
                </div>

                <!-- Button mobile view to collapse sidebar menu -->
                <div class="navbar navbar-default" role="navigation">
                    <div class="container">
                        <div class="">
                            <div class="pull-left">
                                <button class="button-menu-mobile open-left">
                                    <i class="ion-navicon"></i>
                                </button>
                                <span class="clearfix"></span>
                            </div>
							<!-- <div class="navbar-left app-search pull-left hidden-xs">
			                     <h5 class="portlet-title" style="color:white;">{{profile.fullname}}</h5>
			                </div>-->
							<ul class="nav navbar-nav navbar-right pull-right">
                                <li class="hidden-xs">
                                    <a href="#" id="btn-fullscreen" class="waves-effect waves-light"><i class="icon-size-fullscreen"></i></a>
                                </li>
                                <li class="dropdown">
                                    <a href="" class="dropdown-toggle profile" data-toggle="dropdown" aria-expanded="true"><img src="{{profile.picture}}" alt="user-img" class="img-circle"> </a>
                                    <ul class="dropdown-menu">
                                        <li><a href="#"><i class="md md-face-unlock"></i> Profile</a></li>
                                        <li><a href="javascript:;" logout-account><i class="md md-settings-power"></i> Logout</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <!--/.nav-collapse -->
                    </div>
                </div>
            </div>
            <!-- Top Bar End -->


            <!-- ========== Left Sidebar Start ========== -->

            <div class="left side-menu">
                <div class="sidebar-inner slimscrollleft">
					<div class="user-details">
                        <div class="pull-left">
                            <img src="{{profile.picture}}" alt="" class="thumb-md img-circle">
                        </div>
                        <div class="user-info">
                            <div class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><small>{{profile.fullname}}</small> <span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li><a href="javascript:void(0)"><i class="md md-face-unlock"></i> Profile<div class="ripple-wrapper"></div></a></li>
                                    <li><a href="javascript:void(0)" logout-account><i class="md md-settings-power"></i> Logout</a></li>
                                </ul>
                            </div>
                            <p class="text-muted m-0">{{profile.desc.description}}</p>
                        </div>
                    </div>
                    <!--- Divider -->
                    <div id="sidebar-menu">
                        <ul>
                        	<li class="text-muted menu-title">Navigation</li>
							<li class="has_sub">
                                <li><a href="index.php" class="waves-effect"><i class="ti-home"></i><span> Dashboard </span></a></li>
                            </li>
							<li class="has_sub">
                                <li><a href="sheets.php" class="waves-effect"><i class="ti-files"></i><span> Sheets </span></a></li>
                            </li>
							<li class="has_sub">
                                <a href="#" class="waves-effect"><i class="ti-settings"></i> <span> Maintenance </span> </a>
                                <ul class="list-unstyled" style="display: none;">
                                    <li><a href="accounts.php">Accounts</a></li>
                                    <li><a href="groups.php" class="waves-effect">Groups</a></li>
									<li><a href="departments.php" class="waves-effect">Departments</a></li>
                                    <li><a href="descriptions.php" class="waves-effect">Descriptions</a></li>
                                </ul>
                            </li>
						</ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
			<!-- Left Sidebar End -->

			<!-- ============================================================== -->
			<!-- Start right Content here -->
			<!-- ============================================================== -->
			<div class="content-page">
				<!-- Start content -->
				<div class="content">
					<div class="container">
						<div class="row">
							<h4 class="page-title">&nbsp;&nbsp;Profile Setting</h4>
							<div class="col-md-10">
								<ol class="breadcrumb">
									<li>
										<a href="index.php">Cost Sheet</a>
									</li>
									<li class="active">
										Profile Setting
									</li>
								</ol>
							</div>
						</div>
						<div class="col-md-6">
							<div class="panel panel-border panel-primary">
								<div class="panel-heading">
									<h4><i class="icon-people"></i> List
										<button class="btn btn-white pull-right" ng-click="app.editInfo(this)"><i class="fa" ng-class="{'fa-edit': settings.btns.info.edit, 'fa-ban': !settings.btns.info.edit}"></i></button>
									</h4>
								</div>
								<hr>
								<div class="panel-body">
									<form class="form-horizontal form-label-left input_mask" name="formHolder.info" novalidate autocomplete=off>
									  <div class="col-md-12 col-sm-12 col-xs-12 form-group">
										<label>Username</label>
										<input type="text" class="form-control" ng-model="settings.info.username" ng-class="{'has-error': formHolder.info.username.$invalid || settings.info.not_unique || settings.info.alert.show}" ng-disabled="settings.btns.info.edit" required>
										<span class="text-danger" ng-show="formHolder.info.username.$invalid">Username is required</span>
										<span class="text-danger" ng-show="settings.info.not_unique">Username already exists</span>
										<span class="text-danger" ng-show="settings.info.alert.show">{{settings.info.alert.message}}</span>
									  </div>
									</form>
									<div class="row col-lg-12">
										<button class="btn btn-default pull-right" ng-disabled="settings.btns.info.edit" ng-click="app.info.update(this)">Update</button>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="panel panel-border panel-primary">
								<div class="panel-heading">
									<h4><i class="icon-people"></i> Account Security
										<button class="btn btn-white pull-right" ng-click="app.editSecurity(this)"><i class="fa" ng-class="{'fa-edit': settings.btns.info.edit, 'fa-ban': !settings.btns.info.edit}"></i></button>
									</h4>
								</div>
								<hr>
								<div class="panel-body">
									<form class="form-horizontal form-label-left input_mask"  name="formHolder.security" novalidate autocomplete=off>
										<div class="col-md-12">
											<div class="col-md-12">
												<div class="form-group">
													<label>Old Password</label><i class="fa pull-right" ng-model="app.passwordCheckbox" ng-click="app.hideShowPassword()" ng-class="{'fa-eye': app.inputType == 'password', 'fa-eye-slash': app.inputType == 'text'}"></i></button>
													<input type="{{app.inputType}}" class="form-control" ng-class="{'border-danger': settings.security.alert.opw.required || settings.security.alert.opw.show}" name="opw" ng-model="settings.security.opw" ng-disabled="settings.btns.security.edit" required>
													<span class="text-danger" ng-show="settings.security.alert.opw.required">Old password is required</span>
													<span class="text-danger" ng-show="settings.security.alert.opw.show">{{settings.security.alert.opw.message}}</span>													
												</div>
											</div>
											<div class="col-md-12">
												<div class="form-group">
													<label>New Password</label>
													<input type="{{app.inputType}}" class="form-control" ng-class="{'has-error': (formHolder.security.password.$invalid && formHolder.security.password.$touched) || settings.security.alert.password.show}" name="password" ng-model="settings.security.password" ng-disabled="settings.btns.security.edit" required>
													<span class="text-danger" ng-show="(formHolder.security.password.$invalid && formHolder.security.password.$touched)">New password is required</span>												
												</div>
											</div>
											<div class="col-md-12">
												<div class="form-group">
													<label>Re-Type New Password</label>
													<input type="{{form.inputType}}" class="form-control" ng-class="{'has-error': (formHolder.security.rpw.$invalid && formHolder.security.rpw.$touched) || settings.security.alert.password.show}" name="rpw" ng-model="settings.security.rpw" ng-disabled="settings.btns.security.edit" required>
													<span class="text-danger" ng-show="(formHolder.security.rpw.$invalid && formHolder.security.rpw.$touched)">Re-type new password</span>													
													<span class="text-danger" ng-show="settings.security.alert.password.show">{{settings.security.alert.password.message}}</span>													
												</div>
											</div>
										</div>
									</form>
									<div class="col-lg-12">
										<button class="btn btn-default pull-right" ng-disabled="settings.btns.security.edit" ng-click="app.security.update(this)">Update</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
        </div>
        <!-- END wrapper -->

        <script>
            var resizefunc = [];
        </script>

        <!-- jQuery  -->
        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/js/bootstrap.min.js"></script>
        <script src="assets/js/detect.js"></script>
        <script src="assets/js/fastclick.js"></script>
        <script src="assets/js/jquery.slimscroll.js"></script>
        <script src="assets/js/jquery.blockUI.js"></script>
        <script src="assets/js/waves.js"></script>
        <script src="assets/js/wow.min.js"></script>
        <script src="assets/js/jquery.nicescroll.js"></script>
        <script src="assets/js/jquery.scrollTo.min.js"></script>
		<script src="assets/plugins/datatables/jquery.dataTables.min.js"></script>
        <script src="assets/plugins/datatables/dataTables.bootstrap.js"></script>
		
        <script src="assets/js/jquery.core.js"></script>
        <script src="assets/js/jquery.app.js"></script>
		
		<!-- dependencies -->
		<link rel="stylesheet" href="angular/modules/bootbox/bs4-fix.css">	
		<script src="angular/modules/bootbox/bootbox.min.js"></script>
		<script src="angular/modules/growl/jquery.bootstrap-growl.min.js"></script>
		<script src="angular/modules/blockui/jquery.blockUI.js"></script>

		<!-- angular -->	
		<script src="angular/angular.min.js"></script>
		<script src="angular/angular-route.min.js"></script>
		<script src="angular/angular-sanitize.min.js"></script>	
		<script src="angular/ui-bootstrap-tpls-3.0.2.min.js"></script>

		<!-- modules -->
		<script src="angular/modules/bootbox/bootstrap-modal.js"></script>
		<script src="angular/modules/growl/growl.js"></script>
		<script src="angular/modules/blockui/blockui.js"></script>
		<script src="angular/modules/account/account.js"></script>
		<script src="angular/modules/validation/validate.js"></script>
		<script src="angular/modules/post/window-open-post.js"></script>	
		<script src="modules/profile-setting.js"></script>

		<!-- controller -->
		<script src="controllers/profile-setting.js"></script>
	
	</body>
</html>