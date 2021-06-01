angular.module('iw3',
	[ 'ngRoute', 'ngSanitize', 'ngAnimate', 'ngTouch', 'ui.bootstrap',
	  'ngStorage', 'oitozero.ngSweetAlert'])
	  
	  	  
.constant('URL_API_BASE', 'http://localhost:8080/api/final/')
.constant('URL_BASE', 'http://localhost:8080/')


.run(['$rootScope','$uibModal','coreService','$location','$log','$localStorage',
	function($rootScope, $uibModal, coreService, $location, $log,$localStorage) {

	$rootScope.openLoginForm = function(size) {
		if (!$rootScope.loginOpen) {
			//$rootScope.cleanLoginData();
			$rootScope.loginOpen = true;
			$uibModal.open({
				animation : true,
				backdrop : 'static',
				keyboard : false,
				templateUrl : 'ui/views/login.html',
				controller : 'LoginController',
				size : size,
				resolve : {
					user : function() {
						return $rootScope.user;
					}
				}
			});
		}
	};

	coreService.authInfo();
	
} 
]);