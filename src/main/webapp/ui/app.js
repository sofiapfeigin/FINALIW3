let app = angular.module('iw3', [])


	.constant('URL_API_BASE', 'http://localhost:8080/api/final/')
	.constant('URL_BASE', 'http://localhost:8080/')
	.constant('URL_WS', '/api/final/ws')

app.controller('controllerPedidos', function ($scope) {


	//Valido cuando se presiona el botón para iniciar sesión
	//$rootScope.stomp = $stomp;

	//Verifico si el usuario está logueado, y si no está logueado lo redirecciono a la página de login
	//if ($localStorage.logged != true)
		//window.location.replace("/login.html");

	var orden, camion, chofer, cliente, producto, mes, dia, anio, hora, min, preset, bttn1, bttn2, cerrarOrden, pesajeInicial, password,
		masa, densidad, temp, caudal, bttn3, bttn4, pesajeFinal, conciliacion, groupSelect, progress;
	var inicio = 0;
	var timeout = 0;
	//Obtengo el token del usuario

	//let token = $localStorage.userdata.authtoken;
	var fecha = new Date();

	$scope.estado = 0;
	$scope.progreso = '0%'

	$scope.cerrarSesion = function () {
		//$localStorage.logged = false;
		window.location.replace("/login.html");
	}

	$scope.cambiarEstado1 = function () {

		orden = document.getElementById('orden');
		camion = document.getElementById('camion');
		chofer = document.getElementById('chofer');
		cliente = document.getElementById('cliente');
		producto = document.getElementById('producto');
		mes = document.getElementById('mes');
		dia = document.getElementById('dia');
		anio = document.getElementById('anio');
		hora = document.getElementById('hora');
		min = document.getElementById('min');
		preset = document.getElementById('preset');


		if (validar(orden.value) && validar(camion.value) && validar(chofer.value) && validar(cliente.value) &&
			validar(producto.value) && validar(preset.value) && validar(dia.value) && validar(mes.value) && validar(anio.value) && validar(hora.value)
			&& validar(min.value)) {
			if (validarFecha(dia.value, mes.value, anio.value, hora.value, min.value)) {
				orden.disabled = true;
				camion.disabled = true;
				chofer.disabled = true;
				cliente.disabled = true;
				producto.disabled = true;
				preset.disabled = true;
				dia.disabled = true;
				mes.disabled = true;
				anio.disabled = true;
				hora.disabled = true;
				min.disabled = true;
				bttn1 = document.getElementById('estado1');
				bttn1.disabled = true;
				pesajeInicial = document.getElementById('pesajeInicial');
				pesajeInicial.disabled = false;
				password = document.getElementById('password');
				password.disabled = false;
				bttn2 = document.getElementById('estado2');
				bttn2.disabled = false;
				groupSelect = document.getElementById('inputGroupSelect01');
				groupSelect.disabled = false;
				$scope.estado = 1;
				$scope.progreso = '25%'
				$('#bar').css('width', 25 + '%');
			}
			else
				window.alert("Los datos ingresados no son correctos");

		}
		else
			window.alert("Los datos ingresados no son correctos");


	}

	$scope.cambiarEstado2 = function () {

		pesajeInicial = document.getElementById('pesajeInicial');
		password = document.getElementById('password');

		if (validar(pesajeInicial.value) && validar(password.value)) {

			$scope.estado = 2;
			$scope.progreso = '50%'
			$('#bar').css('width', 50 + '%');

			pesajeInicial.disabled = true;
			password.disabled = true;
			bttn2 = document.getElementById('estado2');
			bttn2.disabled = true;
			groupSelect = document.getElementById('inputGroupSelect01');
			groupSelect.disabled = true;

			masa = document.getElementById('masa');
			masa.disabled = false;
			densidad = document.getElementById('densidad');
			densidad.disabled = false;
			temp = document.getElementById('temp');
			temp.disabled = false;
			caudal = document.getElementById('caudal');
			caudal.disabled = false;
			bttn3 = document.getElementById('estado3');
			bttn3.disabled = false;

			inicio = new Date().getTime();
			funcionando();


		}
		else
			window.alert("Los datos ingresados no son correctos");

	}
	$scope.cambiarEstado3 = function () {
		masa = document.getElementById('masa');
		densidad = document.getElementById('densidad');
		temp = document.getElementById('temp');
		caudal = document.getElementById('caudal');

		if (validar(masa.value) && validar(densidad.value) && validar(temp.value) && validar(caudal.value)) {

			if (temp.value > 60)
				window.confirm("La temperatura excedio los 60 grados");

			$('#bar').css('width', 75 + '%');
			$scope.progreso = '75%'
			$scope.estado = 3;

			masa.disabled = true;
			densidad.disabled = true;
			temp.disabled = true;
			caudal.disabled = true;
			bttn3 = document.getElementById('estado3');
			bttn3.disabled = true;

			pesajeFinal = document.getElementById('pesajeFinal');
			pesajeFinal.disabled = false;
			bttn4 = document.getElementById('estado4');
			bttn4.disabled = false;

			clearTimeout(timeout);
			timeout = 0;


		}
		else
			window.alert("Los datos ingresados no son correctos");



	}

	$scope.cambiarEstado4 = function () {

		pesajeFinal = document.getElementById('pesajeFinal');

		if (validar(pesajeFinal.value)) {

			$scope.estado = 4;
			$('#bar').css('width', 100 + '%');
			$scope.progreso = '100%'
			conciliacion = document.getElementById('conciliacion');
			conciliacion.style.display = 'inline';
			pesajeFinal.disabled = true;
			bttn4 = document.getElementById('estado4');
			bttn4.disabled = true;

			cerrarOrden = document.getElementById('cerrarOrden');
			cerrarOrden.style.display = 'inline';

		}
		else
			window.alert("Los datos ingresados no son correctos");

	}

});
function funcionando() {
	// obteneos la fecha actual
	var actual = new Date().getTime();

	// obtenemos la diferencia entre la fecha actual y la de inicio
	var diff = new Date(actual - inicio);

	// mostramos la diferencia entre la fecha actual y la inicial
	var result = LeadingZero(diff.getUTCHours()) + ":" + LeadingZero(diff.getUTCMinutes()) + ":" + LeadingZero(diff.getUTCSeconds());
	document.getElementById('crono').innerHTML = result;

	// Indicamos que se ejecute esta función nuevamente dentro de 1 segundo
	timeout = setTimeout("funcionando()", 1000);
}

/* Funcion que pone un 0 delante de un valor si es necesario */
function LeadingZero(Time) {
	return (Time < 10) ? "0" + Time : + Time;
}

function validar(num) {

	if (isNaN(num) || num < 0) {

		return false;

	}
	if (num.length == 0 || /^\s+$/.test(num)) {
		return false;
	}

	return true
}
function validarFecha(dia, mes, anio, hora, min) {
	var date = new Date();

	if ((mes < 1 || mes > 12) || (dia < 1 || dia > 31) || (hora < 8 || hora > 20) || (min < 0 || min > 59))
		return false;

	if (anio < date.getFullYear())
		return false;

	if (anio == date.getFullYear() && mes < ((date.getMonth()) + 1))
		return false;

	if (anio == date.getFullYear() && mes == ((date.getMonth()) + 1) && dia < date.getDate())
		return false;

	if (anio == date.getFullYear() && mes == ((date.getMonth()) + 1) && dia == date.getDate() && hora <= date.getHours())
		return false;

	return true;

}