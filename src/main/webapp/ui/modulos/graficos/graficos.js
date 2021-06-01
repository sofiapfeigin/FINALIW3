var moduloGraficos=angular.module('graficos',[]);

moduloGraficos.controller('GraficosController',
	function($scope, $log, wsService, graphService) {
	
		$scope.title='Demostración de gráficos por WebSockets';
		
		$scope.graphOptions = {
				demo : {
					options : {},
					data : {}
				}
			};

			$scope.procesaDatosGraph = function(datos) {
				var labels = [];
				var data = [];
				datos.forEach(function(o, i) {
					labels.push(o.label);
					data.push(o.value);
				});
				$scope.graphOptions.demo.data = {
					data : data,
					labels : labels
				}
			};
			$scope.iniciaWS = function() {
				$log.log("iniciandoWS");
				wsService.initStompClient('/iw3/data', function(payload,
						headers, res) {
					$log.log(payload);
					if (payload.type == 'GRAPH_DATA') {
						$scope.procesaDatosGraph(payload.payload);
					}
					if (payload.type == 'NOTIFICA') {
						$scope.notificar(payload.payload.label,payload.payload.value);
					}
					$scope.$apply();
				});
			}

			$scope.requestRefresh = function() {
				graphService.requestPushData();
			};
		
	
		$scope.iniciaWS()
		
		
		$scope.$on("$destroy", function() {
				wsService.stopStompClient();
			});
			
	} 
); //End GraficosController






//***************** Services ***************************
moduloGraficos.factory('graphService',
		['$http','$q','URL_API_BASE',
		function($http, $q, URL_API_BASE) {
			return {
				requestPushData: function() {
					$http.get(URL_API_BASE+"graph/push");
				}
		} 
	}
]); //End graphService