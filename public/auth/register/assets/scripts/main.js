const app = angular.module('register', []);

app.controller('registerController', function ($scope, $http) {
    $scope.username = "";
    $scope.email = "";
    $scope.password = "";
    
    $scope.submit = () => {
        console.log($scope.username, $scope.email, $scope.password);
        $http.post("http://localhost:3000/api/v1/register", {
            username: $scope.username,
            password: $scope.password,
            email: $scope.email,
        })
        .then((res) => {
                window.location.href = "/auth/login";
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            });
    };
});