angular.module("myPizza")
    .controller("myPizzaCtrl", function ($scope, $http) {
        $scope.name = "My Pizza";
        $scope.clients = [];

        var listClients = function () {
            $http.get('post.php').success(function (data, status) {
                console.log(data);
                console.log(status);
                $scope.clients = data;
            });
        };

        var addClients = function (client) {
            $http.post('post.php', client).success(function (data, status) {
                console.log(data);
                console.log(status);
                listClients();
            });
        };

        var destroyClients = function (client) {
            client.delete = true;
            $http.post('post.php', client).success(function (data, status) {
                console.log(data);
                console.log(status);
            });
        };

        listClients();

        $scope.add = function (client) {
            //$scope.clients.push(angular.copy(client));
            addClients(angular.copy(client));
            $scope.formClient.$setPristine();
            delete $scope.client;
        };
        $scope.edit = function (client) {
            $scope.client = client;
            $scope.editing = true;
        };
        $scope.save = function () {
            //client = angular.copy($scope.client);
            addClients(angular.copy($scope.client));
            $scope.formClient.$setPristine();
            delete $scope.client;
            $scope.editing = false;
        };
        $scope.destroy = function (client) {
            $scope.clients.splice($scope.clients.indexOf(client), 1);
            destroyClients(client);
        };
        $scope.orderBy = function (col) {
            $scope.order = col;
            $scope.reverse = !$scope.reverse;
        };
    });