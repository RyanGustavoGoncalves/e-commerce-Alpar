const app = angular.module('register', []);

app.controller('registerController', function ($scope, $http) {
    $scope.username = "";
    $scope.email = "";
    $scope.password = "";

    $scope.submit = () => {
        $http.post("http://localhost:3000/api/register", {
            username: $scope.username,
            password: $scope.password,
            email: $scope.email,
        })
            .then((res) => {
                console.log(res.data);
                localStorage.setItem("user", JSON.stringify(res.data));
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            });
    };
});