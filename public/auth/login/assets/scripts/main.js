const app = angular.module('login', []);

app.controller('loginController', function ($scope, $http) {
    $scope.usernameOrEmail = "";
    $scope.password = "";

    $scope.submit = () => {
        $http.post("http://localhost:3000/api/v1/login", {
            usernameOrEmail: $scope.usernameOrEmail,
            password: $scope.password,
        })
            .then((res) => {
                console.log(res.data.message);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                window.location.href = "/";
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            });
    };
});
