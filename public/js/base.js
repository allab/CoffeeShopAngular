angular.module('base',['ngRoute','ngAnimate'])

				.config(function($routeProvider, $locationProvider, $httpProvider) {

					  $httpProvider.defaults.useXDomain = true;
					  delete $httpProvider.defaults.headers.common['X-Requested-With'];

						$routeProvider
						// route for the home page
						.when('/', {
							templateUrl : 'partials/start.html',
							controller  : 'startController'
						})

						// route for the about page
						.when('/pick', {
							templateUrl : 'partials/pick.html',
							controller  : 'pickController'
						})

						.when('/order', {
							templateUrl : 'partials/order.html',
							controller  : 'orderController'
						});
			  $locationProvider.html5Mode(true);
				})

        .controller('expandCollapseCtrl', function($scope){
          $scope.active=!$scope.active;
          $scope.activ1e=!$scope.active1;

        })

	      .controller('tableController',['$scope','$http', function($scope, $http) {
	              $http.get('./json/products.json')
	               .success(function (response) {
	                $scope.products = response.coffeeCups;
	                });
	      }])

				.controller('navigationController', function($scope){
								$scope.radioModel = 'Left';
									$scope.checkModel = {
									left: false,
									middle: true,
									right: false
								};
					});
