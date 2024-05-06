const app = angular.module('register', []);

app.controller('registerController', function ($scope, $http) {
    $scope.username = "";
    $scope.email = "";
    $scope.password = "";
    $scope.confirmEmail = "";
    $scope.confirmPassword = "";

    $scope.submit = () => {
        if ($scope.email !== $scope.confirmEmail) {
            alert("Confirmation email does not match.");
            return;
        }

        if ($scope.password !== $scope.confirmPassword) {
            alert("Confirmation password does not match.");
            return;
        }

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