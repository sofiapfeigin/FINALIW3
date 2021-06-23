let moduloLogin=angular.module('iw3',['ngStorage', 'oitozero.ngSweetAlert'])


    .constant('URL_API_BASE', 'http://localhost:8080/api/v1/')
    .constant('URL_BASE', 'http://localhost:8080/')
    .constant('URL_WS', '/api/v1/ws')

moduloLogin.controller('loginController', function($scope, $localStorage, $http){

    //Si se llegó al login, me aseguro que se borren los datos del localstorage ya que no hay nadie logueado
    delete $localStorage.userdata;
    $localStorage.logged=false;

    //Valido cuando se presiona el botón para iniciar sesión
    $scope.validar = function (){
      if($scope.nombreUsuario.length>=4 && $scope.claveUsuario.length>=2){
         let user={name:$scope.nombreUsuario,password:$scope.claveUsuario};

          let req = {
              method: 'POST',
              url: 'http://localhost:8080/login-user?username='+user.name+'&password='+user.password,
              headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
          };

          let login = function () {
              $http(req).then(
                  function(resp){
                      if(resp.status===200) {
                          console.log(resp.data);
                          $localStorage.userdata=resp.data;
                          $localStorage.logged=true;
                          window.location.replace("http://localhost:8080/index2.html");
                      }else{
                          console.log("No se pudo loguear.");
                          alert("Los datos ingresados son incorrectos.");
                      }
                  },
                  function(respErr){
                      console.log("No se pudo loguear.");
                      alert("Los datos ingresados son incorrectos.");
                  }
              );
          };

          login();

          }
        };

});