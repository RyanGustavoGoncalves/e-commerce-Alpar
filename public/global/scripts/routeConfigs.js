const security = angular.module('security', []);

security.controller('securityController', function ($scope, $http) {

    $scope.userLocalStorageID = JSON.parse(localStorage.getItem('user'));
    $scope.userLocalStorageToken = JSON.parse(localStorage.getItem('token'));

    console.log($scope.userLocalStorageToken);
    $http.get(`http://localhost:3000/api/v1/get/${$scope.userLocalStorageID.id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${$scope.userLocalStorageToken}`
        }
    })
        .then((res) => {
            $scope.user = res.data;
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        });
});