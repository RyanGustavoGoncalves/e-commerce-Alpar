const app = angular.module('homeApp', []);

app.controller('homeController', function ($scope, $http) {
    $scope.role = JSON.parse(localStorage.getItem('user')).role;
    $scope.modal = false;
    $scope.total = 0;
    $scope.products = [];


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
            imageUrl: imgUrl,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
            $scope.getAllProducts();
            $scope.closeModalProducts();
        }).catch((error) => {
            console.log(error);
        });
    };

    $scope.getAllProducts = () => {
        $http.get("http://localhost:3000/api/v1/product", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            $scope.products = response.data;
        }).catch((error) => {
            console.log(error);
        });
    }

    $scope.addItem = (price) => {
        $scope.total += price;
        console.log("add", $scope.total);
    }

    $scope.removeItem = (price) => {
        $scope.total -= price;
        console.log($scope.total);
    }

    $scope.addToCart = (id, price) => {

        console.log("Add to cart" + id);
        // $http.post("http://localhost:3000/api/v1/cart", {
        //     userId: JSON.parse(localStorage.getItem('user')).id,
        //     total: price,
        //     closed: false,
        // }, {
        //     headers: {
        //         'Authorization': 'Bearer ' + localStorage.getItem('token')
        //     }
        // }).then((response) => {
        //     console.log(response);
        // }).catch((error) => {
        //     console.log(error);
        // });

        $http.post("http://localhost:3000/api/v1/cartItem", {
            productId: id,
            cartId: 2,
            quantity: 1,
            price: price,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }


    $scope.getAllProducts();

});