angular.module('factories',[])

          .factory('nameList', function() {
            var nameList = {
              firstName : '',
              email : ''
            }

          return {
              getFirstName: function () {
                  return nameList.firstName;
              },
              setFirstName: function (firstName) {
                  nameList.firstName = firstName;
              },
              getEmail: function () {
                  return nameList.email;
              },
              setEmail: function (email) {
                  nameList.email = email;
              }
          };
          })

      .factory('orderFactory', ['$http',function($http) {
              return {
                get : function() {
                  return $http.get('/products');
                },

                create : function(productData) {
                  return $http.post('/products', productData)
                    .success(function(response) {
                    console.log("success", response);

                    }).
                    error(function(response) {
                    console.log("error", response);
                    });

                },

                delete : function(id) {
                  return $http.delete('/products/' + id);
                }
              }
        }])


   .controller('orderController', ['$scope','$http','orderFactory','nameList', function($scope, $http, orderFactory,nameList) {

     var orderArr = new Array();

        orderFactory.get()
          .success(function(data) {
            var i=0;
            while(i<data.length)
                    {

                    if(data[i].customerName === nameList.getFirstName())
                       {
                        orderArr.push(data[i]);
                      }
                      i++;
                  } //while

            $scope.orderedProducts = orderArr;
        });

          $scope.getTotal = function(){
            var sum = 0;
            var i=0;
            while(i<orderArr.length){
              sum += orderArr[i].productPrice;
              i++;
            }
            return sum;
            }

  }])


    .controller('pickController',['$scope', 'nameList', function($scope, nameList) {
         $scope.firstName = nameList.getFirstName();
         $scope.email = nameList.getEmail();

    }])



        .controller('startController',[ '$scope', 'nameList', function($scope, nameList) {
            	  $scope.firstName = '';
            		$scope.cEmail = '';


            				$scope.$watch('cEmail', function (nValue, oValue) {
            						if (nValue !== oValue) nameList.setEmail(nValue);
            				});

            			  $scope.$watch('firstName', function (newValue, oldValue) {
            			      if (newValue !== oldValue) nameList.setFirstName(newValue);
            			  });
            	}])


      .controller('mainController', ['$scope','$http','orderFactory','nameList', function($scope, $http, orderFactory,nameList) {
            $scope.numberSelected=0;

            orderFactory.get()
              .success(function(data) {
                products = data;
                });

              $scope.createProduct = function(model) {
                $scope.numberSelected++;
                model.customerName = nameList.getFirstName();
                model.customerEmail = nameList.getEmail();
                if (model.name != undefined) {
                  orderFactory.create(model)

               .success(function(data) {
              //		model = {}; // clear the form so our user is ready to enter another
                    products = data; // assign our new list of products
                  });
              }
            };

            $scope.deleteProduct = function(id) {
              orderFactory.delete(id)
                .success(function(data) {
                  model = {};
                  products = data; // assign our new list of products
                });
            };
        }]);
