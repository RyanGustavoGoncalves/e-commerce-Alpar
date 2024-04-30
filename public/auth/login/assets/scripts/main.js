const app = angular.module('login', []);

app.controller('loginController', function ($scope, $http) {
    $scope.usernameOrEmail = "";
    $scope.password = "";

    $scope.submit = () => {
        console.log($scope.usernameOrEmail, $scope.password);
        $http.post("http://localhost:3000/api/login", {
            usernameOrEmail: $scope.usernameOrEmail,
            password: $scope.password,
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