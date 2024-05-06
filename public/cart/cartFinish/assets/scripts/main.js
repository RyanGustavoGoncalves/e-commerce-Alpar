const app = angular.module("cartFinish", []);

app.controller("cartFinishCtrl", function ($scope, $http) {
    $scope.cart = [];
    $scope.total = 0;
    $scope.totalItems = 0;

    $scope.getAllCartFinish = () => {
        $http.get(`http://localhost:3000/api/v1/cart/cartFinish/${JSON.parse(localStorage.getItem("user")).id}`, {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token"),
            }
        }).then((response) => {
            console.log(response);
            $scope.cart = response.data;
        });
    }

    $scope.getAllCartFinish();
});