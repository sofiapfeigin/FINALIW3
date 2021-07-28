let app = angular.module('iw3', [])


	.constant('URL_API_BASE', 'http://localhost:8080/api/final/')
	.constant('URL_BASE', 'http://localhost:8080/')
	.constant('URL_WS', '/api/final/ws')


app.controller('verOrdenes', function($scope, $http) {

	//Verifico si el usuario está logueado, y si no está logueado lo redirecciono a la página de login
	if (localStorage.getItem("logged") != "true")
		window.location.replace("/login.html");


	//Obtengo el token del usuario
	var token = localStorage.getItem("token");

	$scope.cerrarSesion = function() {
		localStorage.setItem("logged", "false");
		localStorage.setItem("token", "");
		window.location.replace("/login.html");

	}

	$scope.inicio = function() {
		window.location.replace("/index.html");

	}
	$scope.Orden = {};
	$scope.Ordenes = [];
	$scope.Data = [];
	$scope.Filtro = { valor: '' };
	var req = {
		method: 'GET',
		url: 'http://localhost:8080/api/final/ordenes',
		headers: {
			'Content-Type': 'application/json',
			'xauthtoken': token
		},
	};

	$http(req).then(
		function(resp) {
			if (resp.status === 200) {
				$scope.Ordenes = resp.data;
				$scope.total = $scope.Ordenes.length;

				console.log($scope.Ordenes.lenght);
			} else {
				console.log(req);
				alert("No se pueden obtener las ordenes");
			}
		},
		function(respErr) {

			alert("No se pueden obtener las ordenes");
		}
	);

	$scope.ordenarporOrdenAscendente = function() {
		console.log($scope.Ordenes);
		$scope.Ordenes.sort(function(a, b) { return (a.numeroOrden-b.numeroOrden ); });

	}
	$scope.ordenarporOrdenDescendente = function() {
		console.log($scope.Ordenes);
		$scope.Ordenes.sort(function(a, b) { return (b.numeroOrden-a.numeroOrden ); });

	}
	
		$scope.ordenarporEstadoAscendente = function() {
		console.log($scope.Ordenes);
		$scope.Ordenes.sort(function(a, b) { return (a.estado-b.estado ); });

	}
	$scope.ordenarporEstadoDescendiente = function() {
		console.log($scope.Ordenes);
		$scope.Ordenes.sort(function(a, b) { return (b.estado-a.estado ); });

	}


	$scope.verConciliacion = function(i) {

		if ($scope.pesajeInicial = $scope.Ordenes[i].estado != "4") {
			$('#dialogo1').modal('hide');
			alert("Solo se puede ver la conciliacion para ordenes en estado 4");
		}
		else {
			$('#dialogo1').modal('show');
			$scope.pesajeInicial = $scope.Ordenes[i].pesajeInicial;
			$scope.pesajeFinal = $scope.Ordenes[i].pesajeFinal;
			$scope.masa = $scope.Ordenes[i].ultimaMasaAcumulada;
			$scope.masa = $scope.Ordenes[i].ultimaMasaAcumulada;
			$scope.masa = $scope.Ordenes[i].ultimaMasaAcumulada;
			$scope.promedioTemp = $scope.Ordenes[i].promedioTemperatura;
			$scope.promedioCaudal = $scope.Ordenes[i].promedioCaudal;
		}


	}
});
