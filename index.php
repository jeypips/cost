<?php include_once 'authentication.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="A fully featured admin theme which can be used to build CRM, CMS, etc.">
        <meta name="author" content="Coderthemes">

        <link rel="shortcut icon" href="assets/images/cs_logo.png">

        <title>Dashboard - Cost Sheet System</title>

        <!--Morris Chart CSS -->
		 <link rel="stylesheet" href="assets/plugins/morris/morris.css">

        <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/core.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/components.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/icons.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/pages.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/responsive.css" rel="stylesheet" type="text/css" />

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
		.company {
			width: 250px;			
		}
		.not-active {
			pointer-events: none;
			cursor: default;
		}
	</style>
    <body class="fixed-left" ng-app="dashboard" ng-controller="dashboardCtrl" account-profile>

        <!-- Begin page -->
        <div id="wrapper">

            <!-- Top Bar Start -->
            <div class="topbar">

                <!-- LOGO -->
                <div class="topbar-left">
                    <div class="text-center">
                        <a href="index.php" class="logo"><img class="img-circle" src="assets/images/cs_logo.png" alt="Logo"><span>Cost Sheet</span></a>
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

                            <ul class="nav navbar-nav navbar-right pull-right">
                                <li class="hidden-xs">
                                    <a href="#" id="btn-fullscreen" class="waves-effect waves-light"><i class="icon-size-fullscreen"></i></a>
                                </li>
                                <li class="dropdown">
                                    <a href="" class="dropdown-toggle profile" data-toggle="dropdown" aria-expanded="true"><img src="{{profile.picture}}" alt="user-img" class="img-circle"> </a>
                                    <ul class="dropdown-menu">
                                        <li><a href="#"><i class="ti-settings m-r-5"></i> Settings</a></li>
                                        <li><a href="javascript:;" logout-account><i class="ti-power-off m-r-5"></i> Logout</a></li>
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
                    <!--- Divider -->
                    <div id="sidebar-menu">
                        <ul>
                        	<li class="text-muted menu-title">Navigation</li>
							<li class="has_sub">
                                <li><a href="index.php" class="waves-effect active"><i class="ti-home"></i><span> Dashboard </span></a></li>
                            </li>
							<li class="has_sub">
                                <a href="#" class="waves-effect"><i class="ti-settings"></i> <span> Maintenance </span> </a>
                                <ul class="list-unstyled" style="display: none;">
                                    <li><a href="accounts.php" class="waves-effect">Accounts</a></li>
                                    <li><a href="groups.php" class="waves-effect">Groups</a></li>
                                </ul>
                            </li>
						</ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
            <!-- Left Sidebar End -->


            <div class="content-page">
                <!-- Start content -->
                <div class="content">
                    <div class="container">

                        <!-- Page-Title -->
                        <div class="row">
                            <div class="col-sm-12">
                                <h4 class="page-title">Dashboard</h4>
                            </div>
                        </div>
						
						<div class="row">
							<div class="col-sm-12">
								<div class="card-box">
									<div class="row">
										<div class="col-md-8">
											<h4>Welcome to Cost Sheet System!</h4>
										</div>
										<div class="col-md-4">
											<img src="assets/images/logo_company.png" class="company pull-right" alt="Logo">
										</div>
									</div>
								</div>
							</div>
						</div><!-- row -->
                    </div> <!-- container -->
                </div> <!-- content -->

                <footer class="footer text-right">
                   Copyright &copy; <?php echo date("Y"); ?>
                </footer>

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
        <script src="assets/plugins/peity/jquery.peity.min.js"></script>

        <!-- jQuery  -->
        <script src="assets/plugins/waypoints/lib/jquery.waypoints.js"></script>
        <script src="assets/plugins/counterup/jquery.counterup.min.js"></script>

        <script src="assets/plugins/morris/morris.min.js"></script>
        <script src="assets/plugins/raphael/raphael-min.js"></script>
        <script src="assets/plugins/jquery-knob/jquery.knob.js"></script>
        <script src="assets/pages/jquery.dashboard.js"></script>
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
		<script src="angular/modules/post/window-open-post.js"></script>	
		<script src="modules/dashboard.js"></script>

		<!-- controller -->
		<script src="controllers/dashboard.js"></script>

    </body>
</html>