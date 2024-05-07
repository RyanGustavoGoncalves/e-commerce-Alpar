const app = angular.module('homeApp', []);

app.controller('homeController', function ($scope, $http) {
    $scope.role = JSON.parse(localStorage.getItem('user')).role;
    $scope.modal = false;
    $scope.cartItems = 0;
    $scope.quantity = 1;
    $scope.products = [];
    $scope.cartId;
    $scope.modalRender = 0;
    $scope.productIdUpdate = 0;
    $scope.searchTerm = '';
    $scope.name = "";
    $scope.description = "";
    $scope.price = "";
    $scope.imgUrl = "";

    if ($scope.role === 'user') {
        window.location.href = "/";
    }

    $scope.openModalProducts = (value, id) => {
        $scope.modalRender = value;
        $scope.productIdUpdate = id;
        if (value === 2) {
            $scope.getProduct(id);
        }
        $scope.modal = true;
    }

    $scope.closeModalProducts = () => {
        $scope.name = "";
        $scope.description = "";
        $scope.price = "";
        $scope.imgUrl = "";
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

    $scope.submitUpdateProduct = (name, description, price, imageUrl) => {
        $http.put(`http://localhost:3000/api/v1/product/${$scope.productIdUpdate}`, {
            name,
            description,
            price,
            imageUrl,
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
            $scope.getAllProducts();
            $scope.closeModalProducts();
        }).catch((error) => {
            console.log(error);
        });
    }

    $scope.removeProduct = () => {
        $http.delete(`http://localhost:3000/api/v1/product/${$scope.productIdUpdate}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
            $scope.getAllProducts();
            $scope.closeModalProducts();
        }).catch((error) => {
            console.log(error);
        });

    }

    $scope.getProduct = (id) => {
        $http.get(`http://localhost:3000/api/v1/product/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
            .then((response) => {
                console.log(response);
                $scope.name = response.data.name;
                $scope.description = response.data.description;
                $scope.price = response.data.price;
                $scope.imgUrl = response.data.imageUrl;
            })
            .catch((error) => {
                console.log(error);
            })
    }

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

    $scope.getAllProducts();
    $scope.searchProducts = () => {
        if (!$scope.searchTerm.trim()) {
            $scope.getAllProducts();
        } else {
            $scope.products = $scope.products.filter(product => {
                return product.name.toLowerCase().includes($scope.searchTerm.toLowerCase());
            });
        }
    };
});