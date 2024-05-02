const app = angular.module('homeApp', []);

app.controller('homeController', function ($scope, $http) {
    $scope.role = JSON.parse(localStorage.getItem('user')).role;
    $scope.closed = false;
    $scope.modal = false;


    $scope.openModalProducts = () => {
        $scope.modal = true;
    }
    $scope.closeModalProducts = () => {
        $scope.modal = false;
    }

    $scope.logout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    $scope.submit = (name, description, price, imgUrl) => {
        $http.post("http://localhost:3000/api/v1/product", {
            name,
            description,
            price,
            imgUrl,
            closed: $scope.closed,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    };
});