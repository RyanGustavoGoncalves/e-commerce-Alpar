const app = angular.module('homeApp', []);

app.controller('homeController', function ($scope, $http) {
    $scope.role = JSON.parse(localStorage.getItem('user')).role;
    $scope.name = "";
    $scope.description = "";
    $scope.price = "";
    $scope.imgUrl = "";
    $scope.closed = false;

    $scope.submitProduct = () => {
        $http.post("http://localhost:3000/api/v1/product", {
            Headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            },
            name: $scope.name,
            description: $scope.description,
            price: $scope.price,
            imgUrl: $scope.imgUrl,
            closed: $scope.closed,
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    };
});